import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { refreshUserToken } from '../../store/reducers/authorization/authAsyncThunk';
import {
  getAuthIsLogged,
  getAuthStatus,
} from '../../store/selectors/authorization';
import { LoadingStatus } from '../../interfaces/loadingStatus';

const AuthReconnector: React.FC = () => {
  const isLogged = useAppSelector(getAuthIsLogged);
  const status = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const reconnect = async () => {
    await dispatch(refreshUserToken());
  };

  useEffect(() => {
    if (!isLogged && status === LoadingStatus.INITIAL) {
      reconnect();
    }
  }, [isLogged]);

  return null;
};

export default AuthReconnector;
