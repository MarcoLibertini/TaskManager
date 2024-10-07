import axios from 'axios'
const API = 'http://localhost:8000'
const endpoint = '/api/tasks/'

// Esta función asíncrona obtiene una tarea específica por su ID
export const getTask = async (id) => {
     // Realiza una petición GET a la API utilizando el ID proporcionado
     await axios.get(`${API}${endpoint}${id}`)
     // Nota: Actualmente no se está manejando la respuesta de la petición
}

// Esta función asíncrona crea una nueva tarea
export const createTask = async (task) => {
     // Realiza una petición POST a la API con los datos de la tarea
     await axios.post(`${API}${endpoint}`, task)
     // Nota: Actualmente no se está manejando la respuesta de la petición
}