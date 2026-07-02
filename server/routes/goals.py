from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import get_current_user
from database import get_db
from models import User, Goal

router = APIRouter()

@router.get("/goals")
def list_goals(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    goals = db.query(Goal).filter(Goal.user_id == current_user.id).order_by(Goal.sort_order.asc(), Goal.created_at.asc()).all()
    return [{"id":g.id,"title":g.title,"completed":bool(g.completed),"sort_order":g.sort_order,"created_at":g.created_at.isoformat()} for g in goals]

@router.post("/goals", status_code=201)
def create_goal(body: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    title = body.get("title","").strip()
    if not title: raise HTTPException(422, "Goal title is required")
    if len(title) > 256: raise HTTPException(422, "Goal title too long (max 256)")
    max_order = db.query(Goal.sort_order).filter(Goal.user_id == current_user.id).order_by(Goal.sort_order.desc()).first()
    next_order = (max_order[0] + 1) if max_order else 0
    g = Goal(user_id=current_user.id, title=title, completed=0, sort_order=next_order)
    db.add(g); db.commit(); db.refresh(g)
    return {"id":g.id,"title":g.title,"completed":bool(g.completed),"sort_order":g.sort_order,"created_at":g.created_at.isoformat()}

@router.put("/goals/{goal_id}")
def update_goal(goal_id: int, body: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    g = db.query(Goal).filter(Goal.id == goal_id).first()
    if not g or g.user_id != current_user.id: raise HTTPException(404, "Goal not found")
    if "title" in body:
        t = body["title"].strip()
        if not t: raise HTTPException(422, "Goal title is required")
        if len(t) > 256: raise HTTPException(422, "Goal title too long (max 256)")
        g.title = t
    if "completed" in body: g.completed = 1 if body["completed"] else 0
    if "sort_order" in body: g.sort_order = body["sort_order"]
    db.commit(); db.refresh(g)
    return {"id":g.id,"title":g.title,"completed":bool(g.completed),"sort_order":g.sort_order,"created_at":g.created_at.isoformat()}

@router.delete("/goals/{goal_id}", status_code=204)
def delete_goal(goal_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    g = db.query(Goal).filter(Goal.id == goal_id).first()
    if not g or g.user_id != current_user.id: raise HTTPException(404, "Goal not found")
    db.delete(g); db.commit()
    return None
