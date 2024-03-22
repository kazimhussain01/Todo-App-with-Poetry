import { ITask } from "@/interface"
import Task from "./Task"

// InterFace for TodoListProps
interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* Table head */}
                <thead>
                    <tr className="font-poppins text-[16px] font-semibold">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map Function to show All Todo On the Front-end */}
                    {tasks.map(task => (
                        <Task key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList