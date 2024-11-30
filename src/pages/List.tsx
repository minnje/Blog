import { NavLink, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useListQuery } from '../utils/api';
import { motion } from 'framer-motion';
import { basicVar, slideVar } from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function List() {
   const location = useLocation();
   const { data, isLoading, error } = useListQuery();

   const MotionNavLink = motion(NavLink);

   return (
      <>
         <Helmet>
            <title>
               {`${data ? data[0]?.collectionName : location.pathname.substring(1)} | minje blog`}
            </title>
            <script
               src="https://kit.fontawesome.com/7e06fe1b34.js"
               crossOrigin="anonymous"
            ></script>
         </Helmet>
         <motion.div
            variants={basicVar}
            initial="initial"
            animate="animate"
            className="flex w-full flex-col rounded-xl bg-white p-3"
         >
            {location.pathname === '/memo' ? (
               <Link
                  to={`${location.pathname}/write`}
                  aria-label="글쓰기 페이지로 이동"
                  className="focus-custom-slim w-fit"
               >
                  <span
                     className="mx-4 border-b border-neutral-600 text-xs"
                     tabIndex={-1}
                  >
                     <i className="fa-regular fa-pen-to-square" aria-hidden></i>
                     글쓰기
                  </span>
               </Link>
            ) : location.pathname === '/troubleshooting' ? (
               <Link
                  to={`${location.pathname}/write`}
                  aria-label="글쓰기 페이지로 이동"
                  className="focus-custom-slim w-fit"
               >
                  <span
                     className="mx-4 border-b border-neutral-600 text-xs"
                     tabIndex={-1}
                  >
                     <i className="fa-regular fa-pen-to-square" aria-hidden></i>
                     글쓰기
                  </span>
               </Link>
            ) : null}

            <nav className="mx-4 mb-9 mt-2 flex text-[.8125rem] text-neutral-800">
               <h1 className="mr-7 font-medium">
                  {location.pathname.includes('memo')
                     ? 'Memo'
                     : location.pathname.includes('troubleshooting')
                       ? 'Trouble shooting'
                       : null}
               </h1>

               <ul aria-labelledby="section-title">
                  <h2 id="section-title" className="mb-2 block border-b px-1">
                     제목
                  </h2>
                  {isLoading ? <li>Loading...</li> : null}
                  {error ? <li>error!</li> : null}
                  {data?.map((data) => (
                     <li key={data.id} className="mb-1 rounded-2xl font-light">
                        <MotionNavLink
                           variants={slideVar}
                           whileHover={{ backgroundColor: '#f5f5f5' }}
                           whileTap={{ scale: 0.95 }}
                           to={`${data.id}`}
                           role="link"
                           className={({ isActive }) =>
                              `focus-custom-slim block cursor-pointer px-[5px] ${
                                 isActive
                                    ? `font-medium underline underline-offset-2`
                                    : ``
                              }`
                           }
                        >
                           {data.title}
                        </MotionNavLink>
                     </li>
                  ))}
               </ul>
            </nav>
            <Outlet />
         </motion.div>
      </>
   );
}

export default List;
