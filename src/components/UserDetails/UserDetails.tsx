import { Button, Flex, Modal, Typography } from 'antd';
import ProfileInfo from '../ProfileContainer/ProfileInfo/ProfileInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { useGetUserQuery, useUpdateUserMutation } from '../../api/UsersApi';
import ReconnectSpin from '../ReconnectSpin/ReconnectSpin';
import { ArrowLeftOutlined } from '@ant-design/icons';

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
    <Flex vertical style={{ position: 'relative' }}>
      <Button
        onClick={handleCancel}
        type="primary"
        icon={<ArrowLeftOutlined />}
        size={'large'}
        block
        style={{ width: 150, position: 'absolute', right: 0, zIndex: 1 }}
      >
        Go back
      </Button>
      <Typography.Title style={{ margin: '30px auto 50px' }} level={1}>
        Пользователь id: {id}
      </Typography.Title>

      {currUserProfile && (
        <ProfileInfo user={currUserProfile} profileUpdater={updateUser} />
      )}
    </Flex>
  );
};

export default UserDetails;
