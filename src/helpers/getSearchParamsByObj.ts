import { UserFilters } from '../interfaces/userRoles';

export const getSearchParamsByObj = (filters: UserFilters) => {
  const urlSearchParams = new URLSearchParams();
  let addParams = '';

  for (let [param, value] of Object.entries(filters)) {
    if (value && (typeof value === 'string' || typeof value === 'number')) {
      urlSearchParams.set(param, String(value));
    } else if (typeof value === 'boolean') {
      addParams += `&${param}=${value}`;
    }
  }

  return '?' + urlSearchParams.toString() + addParams;
};
