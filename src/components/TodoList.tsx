"use client";

import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";

export default function TodoList() {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoFilter />
      <div></div>
    </div>
  );
}
