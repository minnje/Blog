import { Outlet } from 'react-router-dom';

function Write() {
   return (
      <>
         <h1>write page</h1>
         <Outlet />
      </>
   );
}

export default Write;
