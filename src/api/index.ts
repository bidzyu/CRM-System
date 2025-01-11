import { routesPrefix, serverURL } from './config';

export {
  type MethodParams,
  type MetaResponse,
  type Todo,
  type TodoInfo,
  type TodoRequest,
} from './interfaces';

export { methodParams } from './config';
export const getServerURI = () => {
  return routesPrefix ? serverURL + routesPrefix : serverURL;
};
