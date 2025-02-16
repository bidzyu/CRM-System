import { Flex } from 'antd';
import EditInfo from './EditInfo';
import { useState } from 'react';
import {
  UpdateUserParams,
  UserProfile,
  UserRequest,
} from '../../../interfaces/userRoles';

export interface ProfileInfoProps {
  user: UserProfile;
  profileUpdater: (updateParams: UpdateUserParams) => any;
  dataUpdater?: () => any;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  user,
  profileUpdater,
  dataUpdater,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <Flex
      style={{
        padding: '60px 20px 20px',
        position: 'relative',
        maxWidth: 600,
        width: '100%',
        margin: '0 auto',
      }}
      vertical
      gap={15}
    >
      <EditInfo
        isEdit={isEdit}
        user={user}
        profileUpdater={profileUpdater}
        toggleEdit={toggleEdit}
        dataUpdater={dataUpdater}
      />
    </Flex>
  );
};

export default ProfileInfo;
