import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <header className="bg-gray-800 p-4 flex justify-between items-center my-7">
            <div className="container mx-auto">
                <Link to="/">
                    <h1 className="text-white text-2xl font-bold">Task Manager</h1>
                </Link>
                <Link to="/tasks/new" className="bg-zinc-500 p-2 rounded-lg text-white hover:bg-zinc-600 transition-colors mt-2 inline-block">Crear Tarea</Link>
            </div>
        </header>
    )
}

export default Navbar