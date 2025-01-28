import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';

const GoLogin = () => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      style={{
        maxWidth: 400,
        width: '100%',
        maxHeight: 600,
        height: '100%',
      }}
    >
      {' '}
      <Typography.Title
        level={2}
        style={{ marginBottom: 15, textAlign: 'center' }}
      >
        Регистрация прошла успешно
      </Typography.Title>
      <Typography.Text
        style={{ display: 'block', marginBottom: 10, textAlign: 'center' }}
      >
        Перейдите на главную чтобы войти в приложение.
      </Typography.Text>
      <Button
        size="large"
        type="primary"
        onClick={() => navigate(RouterRoutes.AUTHORIZATION)}
        style={{ marginTop: 150, width: '100%' }}
      >
        На главную
      </Button>
      ;
    </Flex>
  );
};

export default GoLogin;
