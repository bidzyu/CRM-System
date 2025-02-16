import { Flex } from 'antd';
import EditInfo from './EditInfo';
import { useState } from 'react';

const ProfileInfo: React.FC = () => {
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
      <EditInfo isEdit={isEdit} toggleEdit={toggleEdit} />
    </Flex>
  );
};

export default ProfileInfo;
