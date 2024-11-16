import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getMemoList } from '../utils/api';

function MemoList() {
   const { isLoading, error, data } = useQuery('memoList', getMemoList);
   const auth = localStorage.getItem('pocketbase_auth');
   const parsedAuth = JSON.parse(auth!);
   const token = JSON.stringify(parsedAuth.token);
   console.log(token);

   return (
      <>
         {/* {token ? (
            <Link to={'/write'}>
               <span className="border-b-2 border-amber-950">글쓰기</span>
            </Link>
         ) : null} */}
         <main>
            <ul className="p-4">
               {isLoading ? <span>Loading...</span> : null}
               {error ? <span>error!</span> : null}
               {data?.map((memo) => (
                  <Link to={`/${memo.id}`} className="cursor-pointer">
                     <li className="text-sm">{memo.title}</li>
                  </Link>
               ))}
            </ul>
         </main>
         <Outlet />
      </>
   );
}

export default MemoList;
