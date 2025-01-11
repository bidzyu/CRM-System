import { Status } from '../../modules/TasksList/components/TasksList/TasksList';

export interface MethodParams {
  get: (id: number) => string;
  post: () => string;
  put: (id: number) => string;
  delete: (id: number) => string;
  getByStatus: (status: Status) => string;
}

export interface TodoRequest {
  title?: string;
  isDone?: boolean; // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}
