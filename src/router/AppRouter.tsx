import AuthLayout from '../components/AuthLayout/AuthLayout';
import AppLayout from '../components/AppLayout/AppLayout';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import TodoPage from '../pages/TodoPage/TodoPage';
import LoginForm from '../components/AuthForms/LoginForm';
import ForgotForm from '../components/AuthForms/ForgotForm';
import RegisterForm from '../components/AuthForms/RegisterForm';

import { Route, Routes } from 'react-router-dom';
import { RouterRoutes } from '../interfaces/routerRoutes';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index path={RouterRoutes.PROFILE} element={<ProfilePage />} />
      <Route path={RouterRoutes.TODOS} element={<TodoPage />} />
      <Route path="*" element={<div>Not found</div>} />
    </Route>
    <Route path={RouterRoutes.AUTHORIZATION} element={<AuthLayout />}>
      <Route index element={<LoginForm />} />
      <Route path={RouterRoutes.REGISTRATION} element={<RegisterForm />} />
      <Route path={RouterRoutes.FORGOTPASSWORD} element={<ForgotForm />} />
    </Route>
  </Routes>
);

export default AppRouter;
