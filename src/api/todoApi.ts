import { Todo, TodoFormData } from "@/types/todo";

const API_URL = "http://localhost:4000";

// 요구사항 3: 서버 상태 관리와 비동기 로직 처리
// 요구사항 1: Todo CRUD - 읽기(R) 기능
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

// 요구사항 1: Todo CRUD - 생성(C) 기능
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

// 요구사항 1: Todo CRUD - 수정(U) 기능
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

// 요구사항 1: Todo CRUD - 삭제(D) 기능
export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
