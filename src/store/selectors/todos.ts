import { RootState } from '../store';

export const getTodosStatus = (state: RootState) => state.todos.status;

export const getTodosList = (state: RootState) => state.todos.list;

export const getTodosInfo = (state: RootState) => state.todos.info;
