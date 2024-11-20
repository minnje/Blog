import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useListCustomQuery } from '../utils/api';

function List() {
   const location = useLocation();
   const { data, isLoading, error } = useListCustomQuery();
   console.log(data);

   return (
      <div className="flex w-full flex-col">
         <nav className="my-3 flex px-4 text-xs text-neutral-800">
            <h1 className="mr-6 font-medium">
               {location.pathname.includes('memo')
                  ? 'Memo'
                  : location.pathname.includes('troubleshooting')
                    ? 'Trouble shooting'
                    : null}
            </h1>
            <ul>
               <span className="mb-2 block border-b">제목</span>
               {isLoading ? <li>Loading...</li> : null}
               {error ? <li>error!</li> : null}
               {data?.map((data) => (
                  <Link to={`${data.id}`} className="cursor-pointer">
                     <li className="mb-1 font-light transition-colors duration-100 hover:text-main hover:underline">
                        {data.title}
                     </li>
                  </Link>
               ))}
            </ul>
         </nav>
         <Outlet />
      </div>
   );
}

export default List;
