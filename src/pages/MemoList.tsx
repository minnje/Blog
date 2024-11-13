import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getMemoList } from '../utils/api';

function MemoList() {
   const { isLoading, error, data } = useQuery('memoList', getMemoList);
   console.log(data);

   return (
      <>
         <Link to={'/write'}>
            <span className="border-b-2 border-amber-950">글쓰기</span>
         </Link>
         <main>
            <ul>
               {isLoading ? <span>Loading...</span> : null}
               {error ? <span>error!</span> : null}
               {data?.map((memo) => (
                  <Link to={`/${memo.id}`} className="cursor-pointer">
                     {memo.title}
                  </Link>
               ))}
            </ul>
         </main>
         <Outlet />
      </>
   );
}

export default MemoList;
