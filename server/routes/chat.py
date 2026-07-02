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

SYSTEM_PROMPT = """你叫 StudyPal，是一个友好、鼓励性的 AI 学习助手。
当前用户的学习数据：- 等级：Lv.{level} - 连续学习天数：{streak} 天 - 累计学习时长：{minutes} 分钟
请基于以上真实数据，为用户提供个性化、具体的学习建议。语气亲切、积极。用中文回复。"""

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
