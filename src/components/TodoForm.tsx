"use client";

import { createTodo } from "@/api/todoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

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
    <form onSubmit={handleSubmit} className="">
      <div className="">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요."
          className=""
        />
        <button type="submit" className="">
          추가
        </button>
      </div>
    </form>
  );
}
