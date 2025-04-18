import { Todo, TodoFormData } from "@/types/todo";

const API_URL = "http://localhost:4000";

// 모든 Todo 항목 가져오기
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

// 새 Todo 항목 생성
export const createTodo = async (todoData: TodoFormData): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...todoData,
      completed: false,
      id: Date.now().toString(),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
};
