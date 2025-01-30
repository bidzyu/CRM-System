import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { tasksSort } from '../../../helpers/tasksSort';
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from './todosAsyncThunk';
import { Todos } from './todosSlice';
import { LoadingStatus } from '../../../interfaces/loadingStatus';

export function extraReducers(builder: ActionReducerMapBuilder<Todos>) {
  builder.addCase(fetchTodos.pending, (state) => {
    state.status = LoadingStatus.LOADING;
    state.error = undefined;
  });
  builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
    state.status = LoadingStatus.SUCCESS;
    state.list = payload.data.sort(tasksSort);
    state.info = payload.info;
    state.total = payload.meta.totalAmount;
  });
  builder.addCase(fetchTodos.rejected, (state, { error }) => {
    state.status = LoadingStatus.FAIL;
    if (error.code === 'ERR_NETWORK') {
      state.error = 'Нет интернета.';
    } else {
      state.error = 'Неудалось получить данные, попробуйте позже.';
    }
  });
  builder.addCase(createTodo.pending, (state) => {
    state.status = LoadingStatus.LOADING;
    state.error = undefined;
  });
  builder.addCase(createTodo.fulfilled, (state) => {
    state.status = LoadingStatus.SUCCESS;
    state.error = undefined;
  });
  builder.addCase(createTodo.rejected, (state, { error }) => {
    state.status = LoadingStatus.FAIL;
    state.error = 'Неудалось создать задачу, попробуйте позже.';
  });
  builder.addCase(updateTodo.pending, (state) => {
    state.status = LoadingStatus.LOADING;
    state.error = undefined;
  });
  builder.addCase(updateTodo.fulfilled, (state) => {
    state.status = LoadingStatus.SUCCESS;
    state.error = undefined;
  });
  builder.addCase(updateTodo.rejected, (state, { error }) => {
    state.status = LoadingStatus.FAIL;
    state.error = 'Неудалось обновить задачу, попробуйте позже.';
  });
  builder.addCase(deleteTodo.pending, (state) => {
    state.status = LoadingStatus.LOADING;
    state.error = undefined;
  });
  builder.addCase(deleteTodo.fulfilled, (state) => {
    state.status = LoadingStatus.SUCCESS;
    state.error = undefined;
  });
  builder.addCase(deleteTodo.rejected, (state, { error }) => {
    state.status = LoadingStatus.FAIL;
    state.error = 'Неудалось удалить задачу, попробуйте позже.';
  });
}
