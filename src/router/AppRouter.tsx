import { Routes, Route } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import TodoPage from '../pages/TodoPage/TodoPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ProfilePage />} />
        <Route path="todo" element={<TodoPage />} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};

export default AppRouter;
