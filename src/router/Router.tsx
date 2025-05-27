import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { History } from '../pages/History';
import { Home } from '../pages/Home';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />, // Contaúdo carregado para todas as rotas
    // implementar tatramento de erro global
    children: [
      {
        index: true, // Esta rota será usada para o caminho "/"
        element: <Home />,
      },
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