import { Todo } from "@/types/todo";

const API_URL = 'http://localhost:4000';

// 모든 Todo 항목 가져오기
export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/todos`);
    if(!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}