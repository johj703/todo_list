"use client";

import { useState } from "react";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/todoApi";

export default function TodoList() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const filteredTodos = todos?.filter((todo: Todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (isLoading) return <div>로딩 중</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoForm />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <div className="space-y-1">
        {filteredTodos?.length === 0 ? (
          <p className="text-center text-gray-500">할 일이 없습니다.</p>
        ) : (
          filteredTodos?.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
}
