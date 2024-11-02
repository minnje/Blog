import { Outlet } from 'react-router-dom';

function MemoList() {
   return (
      <>
         <h1>memo list</h1>
         <Outlet />
      </>
   );
}

export default MemoList;
