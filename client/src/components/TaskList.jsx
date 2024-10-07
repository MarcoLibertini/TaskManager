import { TaskCard } from "./TaskCard"


export function TaskList({ tasks }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 
        justify-center w-full max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            {tasks.map((task) => (
                <TaskCard task={task} key={task._id} />
            ))}
        </div>
    )
}
