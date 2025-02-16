import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksSort } from '../../../helpers/tasksSort';
import { extraReducers } from './todoExtraReducers';
import {
  Todo,
  TodoInfo,
  MetaResponse,
  TodoFilterStatus,
} from '../../../interfaces/todosApi';
import { LoadingStatus } from '../../../interfaces/loadingStatus';

export interface Todos {
  list: Todo[];
  info: TodoInfo | undefined;
  total: number;
  filter: TodoFilterStatus;
  status: LoadingStatus;
  error: string | undefined;
}

const initialState: Todos = {
  list: [],
  info: undefined,
  total: 0,
  filter: TodoFilterStatus.ALL,
  status: LoadingStatus.INITIAL,
  error: undefined,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodoError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    removeTodoError: (state) => {
      state.error = undefined;
    },
    changeStateTodosStatus: (
      state,
      { payload }: PayloadAction<TodoFilterStatus>
    ) => {
      state.filter = payload;
    },
  },
  //   updateStateTodos: (
  //     state,
  //     { payload }: PayloadAction<MetaResponse<Todo, TodoInfo>>
  //   ) => {
  //     state.list = payload.data.sort(tasksSort);
  //     state.info = payload.info;
  //     state.total = payload.meta.totalAmount;
  //   },
  //   createStateTodo: (state, { payload }: PayloadAction<string>) => {
  //     const newTodo: Todo = {
  //       title: payload,
  //       created: new Date().toISOString(),
  //       id: Math.random(),
  //       isDone: false,
  //     };

  //     const updatedList = [...state.list, newTodo].sort(tasksSort);
  //     state.list = updatedList;
  //     if (state.info) {
  //       state.info.all += 1;
  //       state.info.inWork += 1;
  //     }
  //   },
  //   updateStateTodo: (state, { payload }: PayloadAction<Todo>) => {
  //     const index = state.list.findIndex(
  //       (item: Todo) => item.id === payload.id
  //     );
  //     if (index === -1) return;
  //     const prevIsDone = state.list[index].isDone;
  //     const isSameStatus = prevIsDone === payload.isDone;
  //     const updatedList = [
  //       ...state.list.slice(0, index),
  //       payload,
  //       ...state.list.slice(index + 1),
  //     ].sort(tasksSort);

  //     state.list = updatedList;

  //     if (state.info && !isSameStatus) {
  //       if (prevIsDone) {
  //         state.info.completed -= 1;
  //         state.info.inWork += 1;
  //       } else {
  //         state.info.completed += 1;
  //         state.info.inWork -= 1;
  //       }
  //     }
  //   },
  //   deleteStateTodo: (state, { payload }: PayloadAction<number>) => {
  //     const index = state.list.findIndex((item: Todo) => item.id === payload);
  //     if (index === -1) return;

  //     const status = state.list[index].isDone;
  //     const updatedList = [
  //       ...state.list.slice(0, index),
  //       ...state.list.slice(index + 1),
  //     ];

  //     state.list = updatedList;

  //     if (state.info) {
  //       state.info.all -= 1;
  //       if (status) {
  //         state.info.completed -= 1;
  //       } else {
  //         state.info.inWork -= 1;
  //       }
  //     }
  //   },

  extraReducers,
});

export default todosSlice.reducer;
export const { changeStateTodosStatus, setTodoError, removeTodoError } =
  todosSlice.actions;
