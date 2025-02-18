import { App as AntdApp } from 'antd';
import AppRouter from './router/AppRouter';
import './App.scss';

const App: React.FC = () => {
  return (
    <AntdApp>
      <AppRouter />
    </AntdApp>
  );
};

export default App;
