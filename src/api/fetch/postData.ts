import { BASE_URL, Todo } from '../';

export const postData = async (title: string): Promise<Todo | undefined> => {
  try {
    const response = await fetch(BASE_URL + '/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        title,
        id: 0,
        created: new Date().toISOString(),
        isDone: false,
      }),
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log('postData: ', e);
  }
};
