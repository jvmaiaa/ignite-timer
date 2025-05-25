import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { History } from '../pages/History';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />, // Contaúdo carregado para todas as rotas
    // implementar tatramento de erro global
    children: [
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '*',
        element: <div>Página não encontrada</div>
      },
    ],
  },
]);