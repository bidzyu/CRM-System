import AuthLayout from '../components/AuthLayout/AuthLayout';
import AppLayout from '../components/AppLayout/AppLayout';
import LoginForm from '../components/AuthForms/LoginForm';
import ForgotForm from '../components/AuthForms/ForgotForm';
import RegisterForm from '../components/AuthForms/RegisterForm';
import { Route, Routes } from 'react-router-dom';
import { RouterRoutes } from '../interfaces/routerRoutes';
import React, { Suspense } from 'react';
import ReconnectSpin from '../components/ReconnectSpin/ReconnectSpin';
import UserDetails from '../components/UserDetails/UserDetails';

const ProfilePage = React.lazy(
  () => import('../pages/ProfilePage/ProfilePage')
);
const TodoPage = React.lazy(() => import('../pages/TodoPage/TodoPage'));
const UsersPage = React.lazy(() => import('../pages/UsersPage/UsersPage'));

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route
        path={RouterRoutes.USERS}
        element={
          <Suspense fallback={<ReconnectSpin />}>
            <UsersPage />
          </Suspense>
        }
      />
      <Route
        path={RouterRoutes.USERDETAILS + ':id'}
        element={
          <Suspense fallback={<ReconnectSpin />}>
            <UsersPage />
            <UserDetails />
          </Suspense>
        }
      />
      <Route
        path={RouterRoutes.PROFILE}
        element={
          <Suspense fallback={<ReconnectSpin />}>
            <ProfilePage />
          </Suspense>
        }
      />
      <Route
        path={RouterRoutes.TODOS}
        element={
          <Suspense fallback={<ReconnectSpin />}>
            <TodoPage />
          </Suspense>
        }
      />

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
