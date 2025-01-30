import AuthReconnector from './components/AuthReconnector/AuthReconnector';
import AppRouter from './router/AppRouter';
import './App.scss';

const App: React.FC = () => {
  return (
    <>
      <AppRouter />
      <AuthReconnector />
    </>
  );
};

export default App;
