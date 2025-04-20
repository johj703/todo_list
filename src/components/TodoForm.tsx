"use client";

import { createTodo } from "@/api/todoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  // 요구사항 3: 서버 상태 관리(react-query)와 비동기 로직 처리
  // (useMutation 훅을 사용해 서버에 데이터 생성 요청, 요청 성공 시 캐시 무효화 및 UI 업데이트)
  // 요구사항 1: Todo CRUD - 생성(C) 기능
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createMutation.mutate({ title });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요."
          className="w-full sm:w-4/5 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={createMutation.isPending}
        />
        <button
          type="submit"
          className="w-full sm:w-1/5 min-w-[80px] text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700"
          disabled={createMutation.isPending}
        >
          추가
        </button>
      </div>
    </form>
  );
}
