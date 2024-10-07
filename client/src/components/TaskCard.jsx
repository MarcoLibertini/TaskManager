import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

export function TaskCard({ task }) {
    const navigate = useNavigate()
    const [taskCompleted, setTaskCompleted] = useState(task.completed);
    return (
        <div className="bg-zinc-700 p-4 rounded-md shadow-md hover:bg-zinc-600 mb-4">
            <div onClick={() => navigate(`/tasks/${task._id}`)} className="hover:cursor-pointer">
                <h2 className="text-x4 font-bold text-green-500">{task.title}</h2>
                <p className="text-white">{task.description}</p>
            </div>
            <div className="flex justify-end mt-2">
                {/* Este botón cambia el estado de completado de la tarea */}
                <button 
                    // La clase del botón cambia dinámicamente según el estado de la tarea
                    className={`px-3 py-1 rounded-md ${taskCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}
                    // Cuando se hace clic en el botón, se ejecuta esta función asíncrona
                    onClick={async () => {
                        try {
                            // Se hace una petición PUT a la API para actualizar el estado de la tarea
                            const updatedTask = await axios.put(`http://localhost:8000/api/tasks/${task._id}`, {
                                ...task, // Se mantienen todas las propiedades existentes de la tarea
                                completed: !taskCompleted // Se invierte el estado de completado
                            });
                            // Se actualiza el estado local con el nuevo valor de 'completed'
                            setTaskCompleted(updatedTask.data.completed);
                        } catch (error) {
                            // Si ocurre un error, se muestra en la consola
                            console.error("Error al actualizar la tarea:", error);
                        }
                    }}
                >
                    {/* El texto del botón cambia según el estado de la tarea */}
                    {taskCompleted ? 'Completada' : 'Pendiente'}
                </button>
            </div>
        </div>
    )
}
