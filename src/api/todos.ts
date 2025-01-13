import { BASE_URL } from './config';
import {
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
  TodoFilterStatus,
} from '../interfaces';

export const createTodo = async (title: string): Promise<Todo> => {
  try {
    const todo: TodoRequest = {
      title,
    };

    const response = await fetch(BASE_URL + '/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(todo),
    });
    const data: Todo = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};

export const fetchTodos = async (
  status: TodoFilterStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await fetch(BASE_URL + `/todos?filter=${status}`);
    const data: MetaResponse<Todo, TodoInfo> = await response.json();

    return data;
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

    await fetch(BASE_URL + `/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(updatedTodo),
    });
  } catch (e) {
    throw e;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await fetch(BASE_URL + `/todos/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    throw e;
  }
};
