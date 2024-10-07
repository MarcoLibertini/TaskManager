# Esta sección define los modelos de datos para la aplicación de tareas.

# Importaciones necesarias
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

# Clase personalizada para manejar ObjectId de MongoDB
class PyObjectId(ObjectId):
    # Métodos para validar y convertir ObjectId
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, _):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return str(v)

# Modelo principal para las tareas
class Task(BaseModel):
    # Definición de los campos de la tarea
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: Optional[str] = None
    completed: bool = False

    # Configuración del modelo
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        from_attributes = True

    # Método para convertir datos de MongoDB a instancia de Task
    @classmethod
    def from_mongo(cls, data):
        if not data:
            return data
        id = data.pop('_id', None)
        return cls(**dict(data, id=id))

    # Método para convertir instancia de Task a formato compatible con MongoDB
    def to_mongo(self):
        return {
            key: (str(value) if key == '_id' else value)
            for key, value in self.model_dump(by_alias=True).items()
        }


class updateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        from_attributes = True
       
