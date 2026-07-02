import json
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from openai import OpenAI
from sqlalchemy.orm import Session
from auth import get_current_user
from config import DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL, DEEPSEEK_MODEL
from database import get_db
from models import User, ChatMessage

router = APIRouter()
client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)

SYSTEM_PROMPT = """你叫 StudyPal，是一个初一数学学习助手。你专注于帮助初中一年级学生掌握数学知识。

初一数学知识体系（循序渐进）：
1. 基础：有理数及其运算（正负数、绝对值、加减乘除）、整式的加减（单项式、多项式、合并同类项）
2. 进阶：一元一次方程（解法与应用）、二元一次方程组（代入法、加减法）、不等式与不等式组
3. 挑战：几何图形初步（点线面、线段、角的概念与计算）、应用题综合、压轴题思维训练

当前用户的学习数据：
- 等级：Lv.{level}
- 连续学习天数：{streak} 天
- 累计学习时长：{minutes} 分钟

你的教学原则：
1. 循序渐进：根据用户的等级和学习时长，推荐合适难度的问题和讲解
2. 启发式教学：不要直接给答案，引导学生自己思考
3. 鼓励为主：用积极的语言肯定学生的进步
4. 联系实际：尽量用生活中的例子解释数学概念
5. 讲练结合：讲解知识点后给出配套练习题

用中文回复。语气亲切、耐心，像一位数学家教老师。"""

@router.post("/chat")
async def chat(body: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user_message = body.get("message", "").strip()
    if not user_message:
        return StreamingResponse(iter([f"data: {json.dumps({'error': '消息不能为空'})}\n\n"]), media_type="text/event-stream")
    system_content = SYSTEM_PROMPT.format(level=current_user.level, streak=current_user.streak_days, minutes=current_user.total_study_minutes)
    db.add(ChatMessage(user_id=current_user.id, role="user", content=user_message)); db.commit()

    def generate():
        full = ""
        try:
            stream = client.chat.completions.create(model=DEEPSEEK_MODEL, messages=[{"role":"system","content":system_content},{"role":"user","content":user_message}], stream=True)
            for chunk in stream:
                delta = chunk.choices[0].delta
                if delta.content: full += delta.content; yield f"data: {json.dumps({'content': delta.content})}\n\n"
            db.add(ChatMessage(user_id=current_user.id, role="assistant", content=full)); db.commit()
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    return StreamingResponse(generate(), media_type="text/event-stream")

@router.get("/chat/history")
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    msgs = db.query(ChatMessage).filter(ChatMessage.user_id == current_user.id).order_by(ChatMessage.created_at.asc()).limit(50).all()
    return [{"id": m.id, "role": m.role, "content": m.content, "created_at": m.created_at.isoformat()} for m in msgs]
