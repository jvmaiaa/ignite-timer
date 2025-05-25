import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { LayoutContainer } from './styles';

export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet /> {/*Local que será substituído pelo conteúdo da rota */}
    </LayoutContainer>
  );
};