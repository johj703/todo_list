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

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleToggleComplete = () => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const handleEdit = () => {
    if (isEditing && editedTitle.trim() !== "") {
      updateMutation.mutate({ ...todo, title: editedTitle });
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center gap-2 flex-grow">
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
            className="flex-grow p-1 border rounded"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow ${
              todo.completed ? `line-through text-gray-500` : ""
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
          disabled={updateMutation.isPending}
        >
          {isEditing ? "저장" : "수정"}
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
          disabled={deleteMutation.isPending}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
