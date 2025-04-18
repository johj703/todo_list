"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "@/api/todoApi";
import { Todo } from "@/types/todo";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const queryClient = useQueryClient();

  // 요구사항 3: 서버 상태 관리(react-query)와 비동기 로직 처리
  // (useMutation 훅을 사용한 업데이트 및 삭제 요청, 성공 시 캐시 무효화로 UI 자동 업데이트)
  // 요구사항 1: Todo CRUD - 수정(U) 기능
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditing(false);
    },
  });
  // 요구사항 1: Todo CRUD - 삭제(D) 기능
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  // 요구사항 1: Todo CRUD - 수정(U) 기능 - 완료 상태 토글
  const handleToggleComplete = () => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };
  // 요구사항 1: Todo CRUD - 수정(U) 기능 - 제목 수정
  const handleEdit = () => {
    if (isEditing && editedTitle.trim() !== "") {
      updateMutation.mutate({ ...todo, title: editedTitle });
    } else {
      setIsEditing(!isEditing);
    }
  };
  // 요구사항 1: Todo CRUD - 삭제(D) 기능
  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-2 w-full sm:w-auto mb-2 sm:mb-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5"
          disabled={updateMutation.isPending}
        />

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow ${
              todo.completed ? `line-through text-gray-500` : ""
            } break-words`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={handleEdit}
          className="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-700"
          disabled={updateMutation.isPending}
        >
          {isEditing ? "저장" : "수정"}
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700"
          disabled={deleteMutation.isPending}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
