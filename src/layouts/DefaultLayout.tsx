import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/*Local que será substituído pelo conteúdo da rota */}
    </div>
  );
};