"use client"

import { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { addTodo } from '@/api/todo/route'

const AddTask = () => {
  // using router for page refresh
  const router = useRouter();
  // using useState for Add new Values 
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')
  const [newTaskDes, setNewTaskDes] = useState<string>('')

  // handleSubmitNewTodo function for adding new task
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      name: newTaskValue,
      description: newTaskDes,
    })
    setNewTaskValue("")
    setNewTaskDes("")
    setModalOpen(false)
    router.refresh()
  }

  return (
    <div>
      {/* Add new Task Button */}
      <button
        onClick={() => setModalOpen(true)}
        className='btn w-full font-poppins text-xl bg-violet-700 hover:bg-violet-600 text-white'>
        Add New Task
        <AiOutlinePlus className='ml-1 size={18}' />
      </button>

      {/* Pop-up page for adding new Input name and description */}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3
            className="font-bold text-lg font-poppins -mb-3">
            Add new task
          </h3>
          <div className="modal-action flex flex-col px-2 items-center justify-center font-poppins">

            {/* for Input Name */}
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here Name"
              className="input input-bordered w-full max-w-xs mb-5" />

            {/* for Input Description */}
            <input
              value={newTaskDes}
              onChange={(e) => setNewTaskDes(e.target.value)}
              type="text"
              placeholder="Type here Description"
              className="input input-bordered w-full max-w-xs" />

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 px-5 py-2 text-lg font-poppins font-bold text-white bg-violet-600 hover:bg-violet-500  rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask