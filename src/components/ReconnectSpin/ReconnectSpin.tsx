import { Flex, Spin } from 'antd';

const ReconnectSpin = () => {
  return (
    <Flex style={{ minHeight: '100vh' }} justify="center" align="center">
      <Spin tip="Подключаемся..." size="large">
        <div style={{ width: 200, height: 200 }}></div>
      </Spin>
    </Flex>
  );
};

export default ReconnectSpin;
