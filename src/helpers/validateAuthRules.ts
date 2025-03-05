import type { FormRule } from 'antd';
import { AuthLabels } from '../interfaces/authForms';

const notLatRegEx = /[^a-z]+/i;
const notCyrRegEx = /[^а-я]+/i;
const validPhoneRegEx =
  /^\+[0-9]{1,2}[-\s.]?[(]?[0-9]{3}[)]?[\s.]?[0-9]{3}[-\s.]?[0-9]{2}[-\s.]?[0-9]{2}$/;
const validPhone2RegEx = /^\+\d{9,12}$/;

export const loginRules = [
  { required: true, message: '' },
  {
    validator(_: any, value: string | undefined = '') {
      const trimedValue = value.trim();

      if (!trimedValue) {
        return Promise.reject(
          new Error(`Пожалуйста заполните поле ${AuthLabels.LOGIN}`)
        );
      }
      if (notLatRegEx.test(trimedValue)) {
        return Promise.reject(new Error('Только EN символы!'));
      }
      if (trimedValue.length < 2) {
        return Promise.reject(new Error('Минимум 2 символа!'));
      }
      if (trimedValue.length > 60) {
        return Promise.reject(new Error('Максимум 60 символов!'));
      }
      return Promise.resolve();
    },
  },
];

export const nameRules = [
  { required: true, message: '' },
  {
    validator(_: any, value: string | undefined = '') {
      const trimedValue = value.trim();

      if (!trimedValue) {
        return Promise.reject(
          new Error(`Пожалуйста заполните поле ${AuthLabels.NAME}`)
        );
      }
      if (notLatRegEx.test(trimedValue) && notCyrRegEx.test(trimedValue)) {
        return Promise.reject(new Error('Только EN|RU символы!'));
      }
      if (trimedValue.length < 1) {
        return Promise.reject(new Error('Минимум 1 символ!'));
      }
      if (trimedValue.length > 60) {
        return Promise.reject(new Error('Максимум 60 символов!'));
      }
      return Promise.resolve();
    },
  },
];

export const passwordRules = [
  {
    required: true,
    message: `Пожалуйста заполните поле ${AuthLabels.PASSWORD}`,
  },
  {
    validator(_: any, value: string | undefined = '') {
      if ((value && value.length < 6) || value.length > 60) {
        if (value.length < 6) {
          return Promise.reject(new Error('Минимум 6 символов!'));
        }
        return Promise.reject(new Error('Максимум 60 символов!'));
      }
      return Promise.resolve();
    },
  },
];

export const confirmPasswordRules = [
  { required: true, message: `Пожалуйста повторите ${AuthLabels.PASSWORD}` },
  ({ getFieldValue }: any) => ({
    validator(_: any, value: string | undefined = '') {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают!'));
    },
  }),
];

export const emailRules = [
  { required: true, message: `Пожалуйста заполните поле ${AuthLabels.EMAIL}` },
  { type: 'email', message: `Введите правильную Почту` },
] as FormRule[];

export const phoneRules = [
  {
    validator(_: any, value: string | undefined = '') {
      const trimedValue = value.trim();

      if (
        !trimedValue.length ||
        validPhoneRegEx.test(trimedValue) ||
        validPhone2RegEx.test(trimedValue)
      ) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Неправильный формат номера!'));
    },
  },
];
