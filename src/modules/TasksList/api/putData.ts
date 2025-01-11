import { getServerURI, methodParams, Todo } from '../../../api';
import { updateTask } from '../helpers/updateTask';

export const putData = async (
  task: Todo,
  newTitle: string,
  isDone: boolean
) => {
  try {
    const Url = getServerURI() + methodParams.put(task.id);

    await fetch(Url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(updateTask(task, newTitle, isDone)),
    });
    return true;
  } catch (e) {
    console.log('putData: ', e);
    return false;
  }
};
