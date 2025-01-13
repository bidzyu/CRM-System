import {
  TODO_TITLE_MAX_LENGTH,
  TODO_TITLE_MIN_LENGTH,
} from '../consts/todoValidateParams';

export const validateTodoInput = (str: string): boolean => {
  const length = str.length;

  if (
    length === 0 ||
    length < TODO_TITLE_MIN_LENGTH ||
    length > TODO_TITLE_MAX_LENGTH
  )
    return false;

  return true;
};
