import { getServerURI, methodParams } from '../../../api';

export const deleteData = async (id: number) => {
  try {
    const Url = getServerURI() + methodParams.delete(id);

    await fetch(Url, {
      method: 'DELETE',
    });
    return true;
  } catch (e) {
    console.log('deleteData: ', e);
    return false;
  }
};
