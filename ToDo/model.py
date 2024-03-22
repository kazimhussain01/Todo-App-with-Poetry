from typing import Optional
from sqlmodel import SQLModel, create_engine, Session, Field
from dotenv import load_dotenv
import os

load_dotenv()


class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str


Url: str = os.getenv("DATABASE_URL")
engine = create_engine(Url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db()