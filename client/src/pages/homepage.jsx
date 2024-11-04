import { useEffect, useState } from "react"
import axios from "axios"
import { TaskList } from "../components/TaskList"

function Homepage() {
    const [tasks, setTasks] = useState([])

    // Utilizamos useEffect para realizar efectos secundarios en nuestro componente
    useEffect(() => {
        // Definimos una función asíncrona para obtener las tareas
        async function fetchTasks() {
            // Hacemos una petición GET a nuestra API
            console.log("API URL:", process.env.REACT_APP_API_URL);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/`)
            // Imprimimos los datos de la respuesta en la consola
            // Actualizamos el estado 'tasks' con los datos recibidos de la API
            setTasks(response.data)
        }
        // Llamamos a la función para obtener las tareas
        fetchTasks()
    }, []) // El array vacío como segundo argumento significa que este efecto 
            // solo se ejecutará una vez, al montar el componente


    return (
        <div>
            <TaskList tasks={tasks} />
        </div>
    )
}

export default Homepage