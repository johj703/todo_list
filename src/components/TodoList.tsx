"use client";

import { useState } from "react";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/todoApi";

export default function TodoList() {
  // 요구사항 2: 완료 상태를 별도로 확인할 수 있는 필터/탭 기능
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // 요구사항 3: 서버 상태 관리(react-query)와 비동기 로직 처리
  // (useQuery 훅을 사용해 서버에서 데이터를 가져오고 캐싱, 로딩 상태와 에러 상태 관리)
  // 요구사항 1: Todo CRUD - 읽기(R) 기능
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => fetchTodos(filter),
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
          {/* 요구사항 1: Todo CRUD - 생성(C) 기능 */}
          {/* 할 일 입력 폼 */}
          <TodoForm />

          {/* 요구사항 2: 완료 상태를 별도로 확인할 수 있는 필터/탭 기능 */}
          {/* 필터 버튼 */}
          <div className="mb-4">
            <TodoFilter filter={filter} setFilter={setFilter} />
          </div>

          {/* 요구사항 1: Todo CRUD - 읽기(R) 기능 */}
          {/* 할 일 목록 */}
          <div className="space-y-2">
            {todos?.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                할 일이 없습니다.
              </p>
            ) : (
              todos?.map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
