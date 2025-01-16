import { BASE_URL } from './config';
import type {
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
  TodoFilterStatus,
} from '../interfaces';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

export const createTodo = async (title: string) => {
  try {
    const todo: TodoRequest = {
      title,
    };

    await instance.post<TodoRequest, AxiosResponse<Todo>>('/todos', todo);
  } catch (e) {
    throw e;
  }
};

export const fetchTodos = async (
  status: TodoFilterStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await instance.get<MetaResponse<Todo, TodoInfo>>(
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

    await instance.put<TodoRequest, AxiosResponse<Todo>>(
      `/todos/${id}`,
      updatedTodo
    );
  } catch (e) {
    throw e;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await instance.delete<AxiosResponse<Todo>>(`/todos/${id}`);
  } catch (e) {
    throw e;
  }
};
