from motor.motor_asyncio import AsyncIOMotorClient
from models import Task
from bson import ObjectId

from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URL = os.getenv("MONGODB_URL")



client = AsyncIOMotorClient(MONGODB_URL)
db = client.taskDatabase
collection = db.tasks


# Función para verificar la conexión
async def verificar_conexion():
    try:
        # Intenta ejecutar un comando simple
        await client.admin.command('ismaster')
        print("Conexión exitosa a MongoDB Atlas")
        return True
    except Exception as e:
        print(f"Error al conectar a MongoDB Atlas: {e}")
        return False



async def get_one_task_id(id):
    task = await collection.find_one({"_id": ObjectId(id)})
    return task

async def get_one_task_title(title):
    task = await collection.find_one({"title": title})
    return task

# Función asíncrona para obtener todas las tareas
async def get_all_task():
    # Inicializa una lista vacía para almacenar las tareas
    tasks = []
    # Crea un cursor para iterar sobre todos los documentos en la colección
    cursor = collection.find({})
    # Itera de forma asíncrona sobre cada documento en el cursor
    async for document in cursor: 
        # Convierte cada documento en un objeto Task y lo añade a la lista
        tasks.append(Task(**document))
    # Devuelve la lista completa de tareas
    return tasks

async def create_task(task):
    new_task = await collection.insert_one(task)
    created_task = await collection.find_one({"_id": new_task.inserted_id})
    return created_task


# Esta función asíncrona actualiza una tarea en la base de datos
async def update_task(id:str ,data):
    # Crea un diccionario con los campos no nulos del modelo de datos
    task = {key: value for key, value in data.model_dump().items() if value is not None}
    # Actualiza la tarea en la colección usando el ID proporcionado
    await collection.update_one({"_id": ObjectId(id)}, {"$set": task})
    # Busca y devuelve el documento actualizado
    document = await collection.find_one({"_id": ObjectId(id)})
    return document


async def delete_task(id:str):
    await collection.delete_one({"_id": ObjectId(id)})
    return True


async def delete_all_task():
    await collection.delete_many({})
    return True

async def get_task_by_title(title:str):
    task = await collection.find_one({"title": title})
    return task

