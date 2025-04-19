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
    <div className="w-full min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
            Todo List
          </h1>
          {/* 할 일 입력 폼 */}
          <TodoForm />

          {/* 필터 버튼 */}
          <div className="mb-4">
            <TodoFilter filter={filter} setFilter={setFilter} />
          </div>

          {/* 할 일 목록 */}
          <div className="space-y-2">
            {filteredTodos?.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                할 일이 없습니다.
              </p>
            ) : (
              filteredTodos?.map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
