import { BASE_URL, Todo } from '../';

export const putData = async (
  task: Todo,
  newTitle: string,
  isDone: boolean
) => {
  try {
    await fetch(BASE_URL + `/todos/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ ...task, title: newTitle, isDone }),
    });
    return true;
  } catch (e) {
    console.log('putData: ', e);
    return false;
  }
};
