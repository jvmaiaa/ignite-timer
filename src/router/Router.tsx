import { createBrowserRouter } from 'react-router-dom';
import { History } from '../pages/History';
import { HomePage } from '../pages/HomePage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/history',
    element: <History />,
  }
]);