from fastapi import FastAPI
from database import verificar_conexion
from routes.task import task_router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test-connection")
async def test_connection():
    is_connected = await verificar_conexion()
    if is_connected:
        return {"message": "Conexión exitosa a MongoDB Atlas"}
    else:
        return {"message": "Error al conectar a MongoDB Atlas"}


@app.get("/")
def welcome():
    return {"message": "Welcome to my FARM API!"}

app.include_router(task_router)



