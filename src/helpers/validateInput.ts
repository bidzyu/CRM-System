import { maxLength, minLength } from '../consts/validateParams';

export const validateInput = (str: string): string | null => {
  const length = str.length;

  if (length === 0) {
    return 'The input field must not be empty.';
  }
  if (length > maxLength) {
    return `Maximum number of characters: ${maxLength}. Current: ${length}.`;
  }
  if (length < minLength) {
    return `Minimum number of characters: ${minLength}. Current: ${length}.`;
  }

  return null;
};
