import { Modal } from 'antd';
import ProfileInfo from '../ProfileContainer/ProfileInfo/ProfileInfo';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import {
  fetchUser,
  fetchUsers,
  updateUser,
} from '../../store/reducers/usersAdmin/usersAdminAsyncThunk';
import { clearCurrUserState } from '../../store/reducers/usersAdmin/usersAdminSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const UserDetails = () => {
  const currUserProfile = useAppSelector((state) => state.usersAdmin.currUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = () => {
    navigate(RouterRoutes.USERS);
  };

  useEffect(() => {
    if (!id) return;

    dispatch(fetchUser(id));

    return () => {
      dispatch(clearCurrUserState());
    };
  }, []);

  return (
    <Modal title={`ID:${id}`} open={true} onCancel={handleCancel} footer={null}>
      {currUserProfile && (
        <ProfileInfo
          user={currUserProfile}
          profileUpdater={updateUser}
          dataUpdater={fetchUsers}
        />
      )}
    </Modal>
  );
};

export default UserDetails;
