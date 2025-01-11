import { getServerURI, methodParams, Todo } from '../../../api';
import { createNewTask } from '../helpers';

const POST_URL = getServerURI() + methodParams.post();

export const postData = async (title: string): Promise<Todo | undefined> => {
  try {
    const response = await fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(createNewTask(title)),
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log('postData: ', e);
  }
};
