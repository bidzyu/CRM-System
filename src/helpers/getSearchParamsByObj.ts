import { UserFilters } from '../interfaces/userRoles';

export const getSearchParamsByObj = (filters: UserFilters) => {
  const urlSearchParams = new URLSearchParams();

  for (let [param, value] of Object.entries(filters)) {
    if (value) {
      urlSearchParams.set(param, value);
    }
  }

  return '?' + urlSearchParams.toString();
};
