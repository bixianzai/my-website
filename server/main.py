from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import CORS_ORIGINS
from routes.auth import router as auth_router
from routes.users import router as users_router
from routes.chat import router as chat_router
from routes.analytics import router as analytics_router
from routes.goals import router as goals_router

app = FastAPI(title="StudyPal API", version="0.1.0")

app.add_middleware(CORSMiddleware, allow_origins=CORS_ORIGINS, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(chat_router, prefix="/api", tags=["chat"])
app.include_router(analytics_router, prefix="/api", tags=["analytics"])
app.include_router(goals_router, prefix="/api", tags=["goals"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
