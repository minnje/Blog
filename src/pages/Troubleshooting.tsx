import { useQuery } from 'react-query';
import { getTroubleList } from '../utils/api';
import { Link, Outlet } from 'react-router-dom';

function Troubleshooting() {
   const { isLoading, error, data } = useQuery('memoList', getTroubleList);
   // const auth = localStorage.getItem('pocketbase_auth');
   // const parsedAuth = JSON.parse(auth!);
   // const token = JSON.stringify(parsedAuth.token);
   // console.log(token);

   return (
      <>
         {/* <Link to={'/write'}>
            <span className="border-b-2 border-amber-950">글쓰기</span>
         </Link> */}
         <main className="my-3 flex px-4 text-xs text-neutral-800">
            <h1 className="mr-6 font-medium">Trouble shooting</h1>
            <ul className="">
               <span className="mb-2 block border-b">제목</span>

               {isLoading ? <li>Loading...</li> : null}
               {error ? <li>error!</li> : null}
               {data?.map((memo) => (
                  <Link to={`/${memo.id}`} className="cursor-pointer">
                     <li className="mb-1 font-light transition-colors duration-100 hover:text-main hover:underline">
                        {memo.title}
                     </li>
                  </Link>
               ))}
            </ul>
         </main>
         <Outlet />
      </>
   );
}

export default Troubleshooting;
