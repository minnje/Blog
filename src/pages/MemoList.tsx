import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function MemoList() {
   return (
      <>
         <Link to={'/write'}>
            <span className="border-b-2 border-amber-950">글쓰기</span>
         </Link>
         <h1>작성글 리스트</h1>
         <Outlet />
      </>
   );
}

export default MemoList;
