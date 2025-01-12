import {
  TODO_TITLE_MAX_LENGTH,
  TODO_TITLE_MIN_LENGTH,
} from '../consts/validateParams';

export const validateInput = (str: string): string | null => {
  const length = str.length;

  if (length === 0) {
    return 'The input field must not be empty.';
  }
  if (length > TODO_TITLE_MAX_LENGTH) {
    return `Maximum number of characters: ${TODO_TITLE_MAX_LENGTH}. Current: ${length}.`;
  }
  if (length < TODO_TITLE_MIN_LENGTH) {
    return `Minimum number of characters: ${TODO_TITLE_MIN_LENGTH}. Current: ${length}.`;
  }

  return null;
};
