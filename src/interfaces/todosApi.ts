export enum TodoFilterStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  INWORK = 'inWork',
}

export interface UpdateParams {
  id: number;
  newTitle: string;
  isDone: boolean;
}

export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  created: string;
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
