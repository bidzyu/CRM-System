import { BASE_URL } from './config';
import type {
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
  TodoFilterStatus,
} from '../interfaces';
import axios, { AxiosResponse } from 'axios';

export const createTodo = async (title: string) => {
  try {
    const todo: TodoRequest = {
      title,
    };

    await axios.post<TodoRequest, AxiosResponse<Todo>>(
      BASE_URL + '/todos',
      todo
    );
  } catch (e) {
    throw e;
  }
};

export const fetchTodos = async (
  status: TodoFilterStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await axios.get<MetaResponse<Todo, TodoInfo>>(
      BASE_URL + `/todos?filter=${status}`
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

    await axios.put<TodoRequest, AxiosResponse<Todo>>(
      BASE_URL + `/todos/${id}`,
      updatedTodo
    );
  } catch (e) {
    throw e;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await axios.delete<AxiosResponse<Todo>>(BASE_URL + `/todos/${id}`);
  } catch (e) {
    throw e;
  }
};
