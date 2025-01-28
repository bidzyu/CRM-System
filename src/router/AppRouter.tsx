import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import LoginForm from '../components/AuthForms/LoginForm';
import ForgotForm from '../components/AuthForms/ForgotForm';
import RegisterForm from '../components/AuthForms/RegisterForm';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import AppLayout from '../layouts/AppLayout/AppLayout';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import TodoPage from '../pages/TodoPage/TodoPage';
import { RouterRoutes } from '../interfaces/routerRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
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
    </>
  )
);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
