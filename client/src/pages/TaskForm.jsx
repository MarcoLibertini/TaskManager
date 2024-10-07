import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"


// Esta función define el componente TaskForm
function TaskForm() {
    // Utilizamos useState para manejar el estado del título y la descripción
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const params = useParams()
    const navigate = useNavigate()
    

    // Esta función maneja el envío del formulario
    const handleSubmit = async (e) => {
        // Prevenimos el comportamiento por defecto del formulario
        e.preventDefault()
        
        try {
            if(!params.id) {
                // Hacemos una petición POST a la API para crear una nueva tarea
                const response = await axios.post('http://localhost:8000/api/tasks/', { 
                    title, 
                    description 
                })
                e.target.reset()
                navigate('/')
            } else {
               // Hacemos una petición put a la API para actualizar una tarea
                const response = await axios.put(`http://localhost:8000/api/tasks/${params.id}`, { 
                    title, 
                    description 
                })
                // Reseteamos el formulario después de enviar los datos
                e.target.reset()
                navigate('/')
            }
        } catch (error) {
            console.error("Error al procesar la tarea:", error)
            // Aquí puedes agregar más lógica para manejar el error, como mostrar un mensaje al usuario
        }

        
    }

    useEffect(() => {
        async function fetchTask() {
            if (params.id && params.id !== 'undefined') {
                try {
                    const response = await axios.get(`http://localhost:8000/api/tasks/${params.id}`)
                    setTitle(response.data.title)
                    setDescription(response.data.description)
                } catch (error) {
                    console.error("Error al obtener la tarea:", error)
                }
            }
            
        }
        fetchTask()
    }, [params.id])


    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-zinc-800 p-10 rounded-lg" onSubmit={handleSubmit}>
                <h1 className="text-center text-2xl font-bold text-white mb-5">
                    {params.id ? 'Update Task' : 'Create Task'}
                </h1>
                <input 
                type="text" 
                placeholder="Title" 
                className="bg-zinc-700 p-3 rounded-md block w-full mb-5"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                autoFocus
                />
                <textarea 
                type="text" 
                placeholder="Description" 
                className="bg-zinc-700 p-3 rounded-md block w-full mb-5"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                />
                
                <div className="flex justify-between">
                    <button 
                        className="bg-zinc-500 p-2 rounded-md text-green-500 hover:bg-zinc-600 transition-colors flex-1 mr-2" 
                        type="submit"
                    >
                        {params.id ? 'Update' : 'Create'}
                    </button>

                    {
                        params.id && (
                            <button
                        className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600 transition-colors flex-1 ml-2" 
                        type="button"
                        onClick={async () => {
                            try {
                                // Intenta eliminar la tarea usando el ID proporcionado en los parámetros
                                const response = await axios.delete(`http://localhost:8000/api/tasks/${params.id}`)
                                // Si la eliminación es exitosa, navega a la página principal
                                navigate('/')
                            } catch (error) {
                                // Si ocurre un error durante la eliminación, lo registra en la consola
                                console.error("Error al eliminar la tarea:", error)
                            }   
                                }}
                            >
                                Delete
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default TaskForm