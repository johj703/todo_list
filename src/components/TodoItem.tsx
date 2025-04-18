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
    <div className="">
      <div className="">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className=""
          disabled={updateMutation.isPending}
        />

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className=""
            autoFocus
          />
        ) : (
          <span className="">{todo.title}</span>
        )}
      </div>

      <div className="">
        <button
          onClick={handleEdit}
          className=""
          disabled={updateMutation.isPending}
        >
          {isEditing ? "저장" : "수정"}
        </button>
        <button
          onClick={handleDelete}
          className=""
          disabled={deleteMutation.isPending}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
