import { Status } from '../../modules/TasksList/components/TasksList/TasksList';
import { MethodParams } from '../interfaces';

export const serverURL = 'https://easydev.club';
export const routesPrefix = '/api/v2';

export const methodParams: MethodParams = {
  get: (id: number) => `/todos/${id}`,
  post: () => `/todos`,
  put: (id: number) => `/todos/${id}`,
  delete: (id: number) => `/todos/${id}`,
  getByStatus: (status: Status) => `/todos?filter=${status}`,
};
