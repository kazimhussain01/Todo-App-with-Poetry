"use client"

import { ITask } from '@/interface'
import { FormEventHandler, useState } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { deleteTodo, editTodo } from '@/api/todo/route'

// InterFace for TaskProps
interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    // Adding useRouter for page Refresh
    const router = useRouter()

    // Adding useState Hooks for Update and Delete Values
    const [openModelEdit, setOpenModelEdit] = useState<boolean>(false)
    const [openModelDeleted, setOpenModelDeleted] = useState<boolean>(false)
    const [taskToEditName, setTaskToEditName] = useState<string>(task.name)
    const [taskToEditDes, setTaskToEditDes] = useState<string>(task.description)

    // adding handleSubmitEditTodo function for Edit Name and Desc
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            name: taskToEditName,
            description: taskToEditDes,
        })
        setOpenModelEdit(false)
        router.refresh()
    }

    // Adding handleDeletedTask function for Delete Todos
    const handleDeletedTask = async (id: string) => {
        await deleteTodo(id)
        setOpenModelDeleted(false)
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <td>{task.name}</td>
            <td className='w-[31rem]'>{task.description}</td>
            <td className="flex gap-3">

                {/* Edit Icon for Edit Values */}
                <FiEdit
                    onClick={() => setOpenModelEdit(true)}
                    className="text-blue-500 cursor-pointer" size={18} />

                {/* Model Open to Edit Values */}
                <Modal modalOpen={openModelEdit} setModalOpen={setOpenModelEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3
                            className="font-bold text-lg font-poppins">
                            Edit Task
                        </h3>
                        <div
                            className="modal-action flex flex-col px-2 items-center justify-center">

                            {/* Input for Edit Name */}
                            <input
                                value={taskToEditName}
                                onChange={(e) => setTaskToEditName(e.target.value)}
                                type="text"
                                placeholder="Type here Name"
                                className="input input-bordered w-full max-w-xs mb-5 font-poppins" />

                            {/* Input for Edit Desc */}
                            <input
                                value={taskToEditDes}
                                onChange={(e) => setTaskToEditDes(e.target.value)}
                                type="text"
                                placeholder="Type here Description"
                                className="input input-bordered w-full max-w-xs font-poppins" />

                            {/* Update Todo Button */}
                            <button type="submit" className="bg-violet-600 hover:bg-violet-500  rounded-md text-white font-bold mt-3 px-2 py-2 text-lg font-poppins">
                                Update Todo
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Delete Icon for Delete Values */}
                <FiTrash2
                    onClick={() => setOpenModelDeleted(true)}
                    className="text-red-500 cursor-pointer" size={18} />

                {/* Model Open to Delete Values */}
                <Modal modalOpen={openModelDeleted} setModalOpen={setOpenModelDeleted}>
                    <h3 className='text-lg font-poppins'>
                        Are you sure, you want to delete todo?
                    </h3>
                    <div className='modal-action'>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDeletedTask(task.id)}
                            className='bg-violet-600 hover:bg-violet-500  rounded-md text-white px-5 py-2 text-xl font-poppins font-semibold'
                        >
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task