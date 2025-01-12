import { BASE_URL } from '../';

export const deleteData = async (id: number) => {
  try {
    await fetch(BASE_URL + `/todos/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (e) {
    console.log('deleteData: ', e);
    return false;
  }
};
