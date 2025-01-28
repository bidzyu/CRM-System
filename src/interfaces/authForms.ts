export enum AuthLabels {
  NAME = 'Имя',
  LOGIN = 'Логин',
  PASSWORD = 'Пароль',
  CONFIRMPASS = 'Повторить пароль',
  EMAIL = 'Почта',
  TEL = 'Телефон',
}

export enum RegisterConfirmInputNames {
  NAME = 'name',
  LOGIN = 'login',
  PASSWORD = 'password',
  EMAIL = 'email',
  TEL = 'phone',
}

export type RegisterFormConfirm = Record<RegisterConfirmInputNames, string> & {
  [RegisterConfirmInputNames.TEL]: string | undefined;
};

export interface LoginFormConfirm {
  [RegisterConfirmInputNames.LOGIN]: string;
  [RegisterConfirmInputNames.PASSWORD]: string;
}

export interface ForgotFormConfirm {
  [RegisterConfirmInputNames.EMAIL]: string;
}

export interface UserFieldType {
  [RegisterConfirmInputNames.NAME]: string;
  [RegisterConfirmInputNames.EMAIL]: string;
  [RegisterConfirmInputNames.TEL]: string;
}
