import { ITask } from "@/interface"

const baseUrl = "http://127.0.0.1:8000"

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/todo`, { cache: 'no-store' });
    const todos = await res.json();
    return todos
}

export const addTodo = async (todo: ITask): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/todo`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Make sure 'Content-Type' is correctly capitalized
        },
        body: JSON.stringify(todo)
    });

    const newTodo = await res.json();
    return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/todo/update/${todo.id}`, { // Make sure to include "/update/" before the todo.id
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });

    const updatedTodo = await res.json();
    return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/todo/delete/${id}`, { // Make sure to include "/delete/" before the todo.id
        method: "DELETE",
    });
}