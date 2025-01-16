import {
  TODO_TITLE_MAX_LENGTH,
  TODO_TITLE_MIN_LENGTH,
} from '../consts/todoValidateParams';

const validateTodoInput = (str: string): boolean => {
  const length = str.trim().length;

  if (
    length === 0 ||
    length < TODO_TITLE_MIN_LENGTH ||
    length > TODO_TITLE_MAX_LENGTH
  )
    return false;

  return true;
};

const getTodoValidateError = (str: string): string => {
  const length = str.trim().length;

  if (length === 0) {
    return 'Поле не должно быть пустым';
  }
  if (length > TODO_TITLE_MAX_LENGTH) {
    return `Максимальное число символов: ${TODO_TITLE_MAX_LENGTH}. Текущее: ${length}.`;
  }
  if (length < TODO_TITLE_MIN_LENGTH) {
    return `Минимальное число символов: ${TODO_TITLE_MIN_LENGTH}. Текущее: ${length}.`;
  }
  return 'Упс, что-то сломалось...';
};

export const todoInputValidator = (_: any, value: string | undefined = '') => {
  if (validateTodoInput(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(getTodoValidateError(value));
  }
};
