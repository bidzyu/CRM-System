import { UserRoles } from '../interfaces/userRoles';

export const getCurrUserRole = (roles: UserRoles[]) => {
  if (roles.includes(UserRoles.ADMIN)) {
    return UserRoles.ADMIN;
  }
  if (roles.includes(UserRoles.MODERATOR)) {
    return UserRoles.MODERATOR;
  }
  return UserRoles.USER;
};

export const getUserRolesByRole = (role: UserRoles): UserRoles[] => {
  const resultRoles = [UserRoles.USER];

  if (role === UserRoles.MODERATOR) {
    resultRoles.push(UserRoles.MODERATOR);
  }
  if (role === UserRoles.ADMIN) {
    resultRoles.push(UserRoles.MODERATOR, UserRoles.ADMIN);
  }

  return resultRoles;
};
