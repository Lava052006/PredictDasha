from fastapi import FastAPI
from api.endpoints import router as api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API endpoints
app.include_router(api_router, prefix="/api")

# Minimal health check or redirect if needed
@app.get("/")
def read_root():
    return {"status": "Marketing Intelligence API is running"}