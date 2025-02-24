import { Modal } from 'antd';
import ProfileInfo from '../ProfileContainer/ProfileInfo/ProfileInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { useGetUserQuery, useUpdateUserMutation } from '../../api/UsersApi';
import ReconnectSpin from '../ReconnectSpin/ReconnectSpin';

const UserDetails = () => {
  const { id } = useParams();
  const {
    data: currUserProfile,
    isSuccess,
    isError,
  } = useGetUserQuery({ id: id as string });
  const [updateUser] = useUpdateUserMutation();

  const navigate = useNavigate();

  if (!isSuccess && !isError) return <ReconnectSpin />;

  const handleCancel = () => {
    navigate(RouterRoutes.USERS);
  };

  return (
    <Modal title={`ID:${id}`} open={true} onCancel={handleCancel} footer={null}>
      {currUserProfile && (
        <ProfileInfo user={currUserProfile} profileUpdater={updateUser} />
      )}
    </Modal>
  );
};

export default UserDetails;
