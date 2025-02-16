import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';

const GoLogin = () => {
  const navigate = useNavigate();

  return (
    <Flex
      align={'center'}
      justify="center"
      style={{ width: '100%', height: '100vh' }}
    >
      <Flex
        vertical
        style={{
          maxWidth: 400,
          width: '100%',
          maxHeight: 600,
          height: '100%',
        }}
        justify="center"
      >
        <Typography.Title
          level={2}
          style={{ marginBottom: 25, textAlign: 'center' }}
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
          style={{ margin: '50px 0', width: '100%' }}
        >
          На главную
        </Button>
      </Flex>
    </Flex>
  );
};

export default GoLogin;
