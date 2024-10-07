from fastapi import APIRouter, HTTPException
from models import Task, updateTask
from database import update_task, delete_task, get_one_task_id, get_one_task_title, delete_all_task, get_all_task, create_task

task_router = APIRouter()

@task_router.get('/api/tasks')
async def get_tasks():
    try:
        tasks = await get_all_task()
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@task_router.post('/api/tasks', response_model=Task)
async def save_task(task: Task):
    # Verificamos si ya existe una tarea con el mismo título
    task_title = await get_one_task_title(task.title)
    if task_title:
        raise HTTPException(status_code=400, detail="La tarea ya existe")

    # Creamos un diccionario con los datos de la tarea, excluyendo el id
    task_dict = task.model_dump(exclude={"id"})
    
    # Creamos la tarea en la base de datos
    response = await create_task(task_dict)
    if response:
        # Convertimos la respuesta de MongoDB a un objeto Task
        return Task.from_mongo(response)
    raise HTTPException(status_code=400, detail="Error creando tarea")


@task_router.get('/api/tasks/{id}', response_model=Task)
async def get_task(id: str):
    task = await get_one_task_id(id)
    if task:
        return task
    raise HTTPException(status_code=404, detail=f"Tarea con el id {id} no encontrada")


@task_router.put('/api/tasks/{id}', response_model=Task)
async def put_task(id: str, task: updateTask):
    response = await update_task(id, task)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Tarea con el id {id} no encontrada")


@task_router.delete('/api/tasks/{id}')
async def remove_task(id: str):
    response = await delete_task(id)
    if response:
        return {"message": "Tarea eliminada correctamente"}
    raise HTTPException(status_code=404, detail=f"Tarea con el id {id} no encontrada")


@task_router.delete('/api/tasks')
async def remove_all_tasks():
    result = await delete_all_task()
    if result:
        return {"message": "Todas las tareas han sido eliminadas"}
    raise HTTPException(status_code=500, detail="Error al eliminar las tareas")

