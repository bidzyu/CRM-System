import { RootState } from '../store';

export const getTodosFilter = (state: RootState) => state.todos.filter;

export const getTodosList = (state: RootState) => state.todos.list;

export const getTodosInfo = (state: RootState) => state.todos.info;
