import { Outlet } from 'react-router-dom';
import UsersContainer from '../../components/UsersContainer/UsersContainer';

const UsersPage: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <UsersContainer />
      <Outlet />
    </div>
  );
};

export default UsersPage;
