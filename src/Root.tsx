import { Outlet } from 'react-router-dom';
import './styles/index.css';
import Header from './components/Header';

function Root() {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
}

export default Root;
