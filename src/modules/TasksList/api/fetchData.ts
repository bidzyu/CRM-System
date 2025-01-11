import {
  getServerURI,
  methodParams,
  Todo,
  TodoInfo,
  MetaResponse,
} from '../../../api';
import { Status } from '../components/TasksList/TasksList';

export const fetchData = async (
  status: Status
): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
  try {
    const URL = getServerURI() + methodParams.getByStatus(status);
    const response = await fetch(URL);
    const json = (await response.json()) as MetaResponse<Todo, TodoInfo>;

    return json;
  } catch (e) {
    console.log('fetchData', e);
  }
};
