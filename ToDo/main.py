from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, create_engine, Session, Field, select
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from typing import Annotated, Optional

load_dotenv()


class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str


class TodoCreate(SQLModel):
    name: str
    description: str


class TodoResponse(SQLModel):
    id: int
    name: str
    description: str


Url: str = os.getenv("DATABASE_URL")
engine = create_engine(Url)


app: FastAPI = FastAPI(
    title="ToDo App", description="A Simple ToDo App", version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_data():
    with Session(engine) as session:
        yield session

@app.get("/todo")
def get_all(db: Annotated[Session, Depends(get_data)]):
    todos = db.exec(select(Todo)).all()
    return todos

@app.post("/todo", response_model=TodoResponse)  # Update the URL endpoint
def create_todo(ToDo: TodoCreate, session: Annotated[Session, Depends(get_data)]):
    db_todo = Todo.model_validate(ToDo)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

@app.delete("/todo/delete/{id}", response_model=TodoResponse)
def delete_todo(id: int, session: Annotated[Session, Depends(get_data)]):
    todo_delete = session.get(Todo, id)
    if not todo_delete:
        return {"error": "todo not found"}
    session.delete(todo_delete)
    session.commit()
    return todo_delete

@app.put("/todo/update/{todo_id}", response_model=TodoResponse)
def update_todo(
    todo_id: int, todo: TodoCreate, session: Session = Depends(get_data)
):
    todo_update = session.get(Todo, todo_id)
    if not todo_update:
        return {"error": "todo not found"}
    todo_update.name = todo.name
    todo_update.description = todo.description
    session.commit()
    session.refresh(todo_update)
    return todo_update