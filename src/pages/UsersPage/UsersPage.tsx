import { Outlet, useParams } from 'react-router-dom';
import UsersContainer from '../../components/UsersContainer/UsersContainer';

const UsersPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <UsersContainer display={id ? 'none' : undefined} />
      {id && <Outlet />}
    </div>
  );
};

export default UsersPage;
