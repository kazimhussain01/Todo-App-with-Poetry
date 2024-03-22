import Image from "next/image";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos } from "@/api/todo/route";

export default async function Home() {
  const task = await getAllTodos();
  // console.log("todos", task)
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-4xl font-bold font-poppins mb-3">
          Todo App by Kazim Hussain
        </h1>
        <AddTask />
        <TodoList tasks={task} />
      </div>
    </main>
  );
}
