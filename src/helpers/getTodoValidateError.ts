import {
  TODO_TITLE_MAX_LENGTH,
  TODO_TITLE_MIN_LENGTH,
} from '../consts/todoValidateParams';

export const getTodoValidateError = (str: string): string => {
  const length = str.length;

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
