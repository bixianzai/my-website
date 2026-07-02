import json, re
from fastapi import APIRouter, Depends
from openai import OpenAI
from sqlalchemy.orm import Session
from auth import get_current_user
from config import DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL, DEEPSEEK_MODEL
from database import get_db
from models import User, Goal

router = APIRouter()
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)

SYSTEM_PROMPT = """你是初一数学学习建议生成器。基于用户的学习数据，推荐最多5条初中一年级数学学习建议。

初一数学知识体系（循序渐进）：
- 基础阶段(easy)：有理数及其运算、整式的加减、绝对值与数轴
- 进阶阶段(medium)：一元一次方程、二元一次方程组、不等式
- 挑战阶段(hard)：几何图形初步、线段与角、应用题综合、压轴题思维

严格返回JSON数组格式，不要markdown代码块，不要任何其他文字：
[{"title":"...","type":"course|article|practice","difficulty":"easy|medium|hard","duration":分钟整数,"reason":"因为你..."}]
type字段: 视频教学用course, 知识讲解用article, 做题练习用practice
difficulty字段: 基础概念用easy, 进阶应用用medium, 综合挑战用hard —— 按知识体系循序渐进
duration字段: 预计完成分钟数(10-180的整数)
reason字段: 一句话个性化推荐理由，以"因为你"开头，提及用户的具体学习数据和为什么适合这个阶段
所有建议标题和理由必须围绕初一数学内容。
如果数据不足以生成建议，返回空数组[]。"""

VALID_TYPES = {"course", "article", "practice"}
VALID_DIFFICULTIES = {"easy", "medium", "hard"}

def parse_suggestions(raw: str) -> list[dict]:
    """Parse AI response, filtering invalid entries."""
    # Strip markdown code blocks if present
    cleaned = re.sub(r'```(?:json)?\s*', '', raw)
    cleaned = cleaned.strip()
    # Find the JSON array
    match = re.search(r'\[.*\]', cleaned, re.DOTALL)
    if not match:
        return []
    try:
        data = json.loads(match.group(0))
    except json.JSONDecodeError:
        return []
    if not isinstance(data, list):
        return []
    result = []
    for item in data:
        if not isinstance(item, dict):
            continue
        title = str(item.get("title", "")).strip()
        typ = str(item.get("type", "")).strip().lower()
        diff = str(item.get("difficulty", "")).strip().lower()
        dur = item.get("duration", 0)
        reason = str(item.get("reason", "")).strip()
        if not title or typ not in VALID_TYPES or diff not in VALID_DIFFICULTIES:
            continue
        if not isinstance(dur, (int, float)) or dur <= 0:
            continue
        result.append({
            "title": title,
            "type": typ,
            "difficulty": diff,
            "duration": int(dur),
            "reason": reason or f"因为你的学习情况"
        })
    return result[:5]


@router.post("/suggestions")
def get_suggestions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Gather user context
    goals = db.query(Goal).filter(Goal.user_id == current_user.id).order_by(Goal.sort_order.asc()).all()
    goal_text = "\n".join([f"- [{'✓' if g.completed else ' '}] {g.title}" for g in goals]) if goals else "还没有设定学习目标"

    user_prompt = f"""初一数学学习者画像：
- 等级：Lv.{current_user.level}
- 连续学习天数：{current_user.streak_days} 天
- 累计学习时长：{current_user.total_study_minutes} 分钟
- 目标完成率：{sum(1 for g in goals if g.completed)}/{len(goals) if goals else 0} 个

当前学习目标：
{goal_text}

请基于以上数据，生成最多5条初一数学学习建议。
根据用户的等级和累计时长判断所处阶段：
- Lv.1-2 且累计<500分钟 → 多推荐基础阶段内容（有理数、整式）
- Lv.2-3 且累计500-1500分钟 → 多推荐进阶阶段内容（方程、不等式）
- Lv.3+ 且累计>1500分钟 → 多推荐挑战阶段内容（几何、综合应用）
确保建议遵循初一数学知识体系的循序渐进路径。"""

    try:
        response = client.chat.completions.create(
            model=DEEPSEEK_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.8,
            max_tokens=1024
        )
        content = response.choices[0].message.content or ""
        suggestions = parse_suggestions(content)
        return {"suggestions": suggestions, "fallback": len(suggestions) == 0}
    except Exception:
        return {"suggestions": [], "fallback": True}
