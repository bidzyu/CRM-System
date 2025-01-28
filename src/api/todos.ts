import type {
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
  TodoFilterStatus,
} from '../interfaces/todosApi';
import { AxiosResponse } from 'axios';
import { api } from './axiosConfig';

export const createTodo = async (title: string) => {
  try {
    const todo: TodoRequest = {
      title,
    };

    await api.post<TodoRequest, AxiosResponse<Todo>>('/todos', todo);
  } catch (e) {
    throw e;
  }
};

export const fetchTodos = async (
  status: TodoFilterStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await api.get<MetaResponse<Todo, TodoInfo>>(
      `/todos?filter=${status}`
    );

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateTodo = async (
  id: number,
  newTitle: string,
  isDone: boolean
) => {
  try {
    const updatedTodo: TodoRequest = {
      title: newTitle,
      isDone,
    };

    await api.put<TodoRequest, AxiosResponse<Todo>>(
      `/todos/${id}`,
      updatedTodo
    );
  } catch (e) {
    throw e;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await api.delete<AxiosResponse<Todo>>(`/todos/${id}`);
  } catch (e) {
    throw e;
  }
};
