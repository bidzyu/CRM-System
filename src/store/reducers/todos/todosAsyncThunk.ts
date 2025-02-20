import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/AppApi';
import {
  Todo,
  TodoInfo,
  MetaResponse,
  TodoFilterStatus,
  TodoRequest,
  UpdateParams,
} from '../../../interfaces/todosApi';
import { AxiosResponse } from 'axios';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (filter: TodoFilterStatus, thunkApi) => {
    try {
      const response = await api.get<MetaResponse<Todo, TodoInfo>>(`/todos`, {
        params: {
          filter,
        },
      });

      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (title: string, thunkApi) => {
    try {
      const todo: TodoRequest = {
        title,
      };

      await api.post<TodoRequest, AxiosResponse<Todo>>('/todos', todo);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (params: UpdateParams, thunkApi) => {
    const { id, newTitle, isDone } = params;

    try {
      const updatedTodo: TodoRequest = {
        title: newTitle,
        isDone,
      };

      await api.put<TodoRequest, AxiosResponse<Todo>>(
        `/todos/${id}`,
        updatedTodo
      );
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number, thunkApi) => {
    try {
      await api.delete(`/todos/${id}`);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
