from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from auth import get_current_user
from database import get_db
from models import User, ChatMessage

router = APIRouter()

ACHIEVEMENTS = [
    {"id":"first-login","name":"新手起步","description":"首次登录 StudyPal"},
    {"id":"streak-7","name":"连续7天","description":"连续学习7天"},
    {"id":"streak-30","name":"学习勇士","description":"连续学习30天"},
    {"id":"level-2","name":"知识学徒","description":"达到等级2"},
    {"id":"level-3","name":"学习大师","description":"达到等级3"},
    {"id":"time-3000","name":"时光旅人","description":"累计学习3000分钟"},
]

def check(ach_id: str, u: User) -> bool:
    m = {"first-login":lambda u:True,"streak-7":lambda u:u.streak_days>=7,"streak-30":lambda u:u.streak_days>=30,"level-2":lambda u:u.level>=2,"level-3":lambda u:u.level>=3,"time-3000":lambda u:u.total_study_minutes>=3000}
    return m.get(ach_id, lambda u:False)(u)

@router.get("/analytics/daily")
def get_daily(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cutoff = datetime.now(timezone.utc) - timedelta(days=90)
    rows = db.query(func.date(ChatMessage.created_at).label("date"), func.count(ChatMessage.id).label("cnt")).filter(
        ChatMessage.user_id == current_user.id, ChatMessage.role == "assistant", ChatMessage.created_at >= cutoff
    ).group_by(func.date(ChatMessage.created_at)).order_by("date").all()
    date_map = {str(r.date): r.cnt * 5 for r in rows}
    today = datetime.now(timezone.utc).date()
    return [{"date": (today - timedelta(days=89 - i)).isoformat(), "minutes": date_map.get((today - timedelta(days=89 - i)).isoformat(), 0)} for i in range(90)]

@router.get("/analytics/achievements")
def get_achievements(current_user: User = Depends(get_current_user)):
    result = []
    for a in ACHIEVEMENTS:
        unlocked = check(a["id"], current_user)
        entry = {"id":a["id"],"name":a["name"],"description":a["description"],"unlocked":unlocked}
        if not unlocked:
            conds = {"first-login":"注册并登录 StudyPal","streak-7":f"连续学习7天（当前{current_user.streak_days}天）","streak-30":f"连续学习30天（当前{current_user.streak_days}天）","level-2":f"达到等级2（当前等级{current_user.level}）","level-3":f"达到等级3（当前等级{current_user.level}）","time-3000":f"累计学习3000分钟（当前{current_user.total_study_minutes}分钟）"}
            entry["condition"] = conds.get(a["id"], "")
        result.append(entry)
    return result
