import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getMemoList } from '../utils/api';

function MemoList() {
   const { isLoading, data } = useQuery('memoList', getMemoList);
   console.log(data);

   return (
      <>
         <Link to={'/write'}>
            <span className="border-b-2 border-amber-950">글쓰기</span>
         </Link>
         <main>
            {isLoading ? <span>Loading...</span> : null}
            <ul>
               {data?.map((memo) => (
                  <li className="cursor-pointer">{memo.title}</li>
               ))}
            </ul>
         </main>
         <Outlet />
      </>
   );
}

export default MemoList;
