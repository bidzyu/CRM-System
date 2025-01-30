const UNHANDLED_ERROR_MSG =
  'Упс, произошла неизвестная ошибка, повторите запрос позже.';

export const getLoginErrorMessage = (status: number) => {
  if (status === 400) {
    return `Ошибка десериализации запроса или неверный ввод.`;
  }
  if (status === 401) {
    return 'Неверные учетные данные.';
  }
  if (status === 500) {
    return 'Внутренняя ошибка сервера.';
  }
  return UNHANDLED_ERROR_MSG;
};

export const getRegisterErrorMessage = (status: number) => {
  if (status === 409)
    return `Пользователь с такой Почтой или Логином уже существует.`;
  if (status === 400) return 'Ошибка десериализации запроса или неверный ввод.';
  if (status === 500) return 'Внутренняя ошибка сервера.';

  return UNHANDLED_ERROR_MSG;
};

export const getUserUpdateErrorMessage = (status: number = 0) => {
  if (status === 400) return 'Электронная почта уже используется.';
  if (status === 404) return 'Пользователь не найден.';
  if (status === 500) return 'Внутренняя ошибка сервера.';
  return UNHANDLED_ERROR_MSG;
};
