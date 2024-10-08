import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <header className="bg-gray-800 p-4 flex flex-col items-center my-7 max-w-6xl mx-auto rounded-lg shadow-md">
            <div className="text-center">
                <Link to="/">
                    <h1 className="text-white text-2xl font-bold mb-4">Task Manager</h1>
                </Link>
            </div>
            <div className="mt-2">
                <Link to="/tasks/new" className="bg-zinc-500 p-2 rounded-lg text-white hover:bg-zinc-600 transition-colors inline-block">New Task</Link>
            </div>
        </header>
    )
}

export default Navbar