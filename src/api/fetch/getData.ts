import { BASE_URL, Todo, TodoInfo, MetaResponse, Status } from '../';

export const getData = async (
  status: Status
): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
  try {
    const response = await fetch(BASE_URL + `/todos?filter=${status}`);
    const json = await response.json();

    return json;
  } catch (e) {
    console.log('fetchData', e);
  }
};
