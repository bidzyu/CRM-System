// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserFilters {
  sortOrder?: 'asc' | 'desc';
  limit: number; // сколько на странице
  offset: number; // страницу
  sortBy?: string;
  search?: string;
  isBlocked?: boolean;
}

export interface UserFiltersByField {
  sortOrder?: 'asc' | 'desc';
  sortBy?: string;
  isBlocked?: boolean;
}

// Интерфейс пользователя
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: UserRoles[];
  phoneNumber: string;
}

export interface UserPasswordRequest {
  password: string;
}
// Интерфейс метаинформации

export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}
// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  roles: UserRoles[]; // при вызове этой апи роли будут обновлены к тому массиву который будет передан
  // например если у вас была roles: ['ADMIN'] а вы хотите добавить ['MODERATOR'] то нужно передавать
  // старые + новые - roles: ['ADMIN', 'MODERATOR']
}

// Интерфейс для обновления данных пользователя
export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UpdateUserParams {
  requestData: UserRequest;
  id?: string;
}

export interface UpdateUserRoles {
  requestData: UserRoles[];
  id?: string;
}

export interface QueryUserId {
  id: string;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export enum UsersSwitcherValues {
  ALL = 'Все',
  BLOCKED = 'Заблокированные',
  ACTIVE = 'Активные',
}
