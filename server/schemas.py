from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    username: str = Field(min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)

class UserLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class RefreshRequest(BaseModel):
    refresh_token: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    avatar_url: str | None
    streak_days: int
    total_study_minutes: int
    level: int
    model_config = {"from_attributes": True}
