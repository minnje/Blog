import { useQuery } from 'react-query';
import { getProfile } from '../utils/api';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-vanilla-tilt';
import { NavLink } from 'react-router-dom';

function Sidebar() {
   const { isLoading, error, data } = useQuery('profile', getProfile);
   const location = useLocation();
   console.log(location.pathname);

   const item = {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
   };

   const list = {
      initial: { opacity: 0 },
      animate: {
         opacity: 1,
         transition: { type: 'tween' },
      },
   };
   return (
      <div className="flex flex-col gap-2">
         {isLoading ? <span>Loading...</span> : null}
         {error ? <span>error!</span> : null}
         {data?.map((data) => (
            <figure key={data.id} className="flex flex-col gap-2 border-b p-1">
               <Tilt className="tilt-container" options={{ scale: 2, max: 25 }}>
                  <img
                     className="rounded-lg"
                     src={`${import.meta.env.VITE_PB_API}/files/users/${data?.id}/${data?.avatar}`}
                     alt="프로필 이미지"
                     width={130}
                  />
               </Tilt>
               <div className="flex flex-col space-y-1 px-1 py-2 text-xs">
                  <figcaption className="font-medium">{data.name}</figcaption>
                  <figcaption className="text-[10px]">{data.email}</figcaption>
               </div>
            </figure>
         ))}
         <motion.nav>
            <motion.ul
               variants={list}
               initial="initial"
               animate="animate"
               className="flex flex-col space-y-1 p-2 text-[11px] text-neutral-800"
            >
               <NavLink
                  to="/memo"
                  className={({ isActive }) =>
                     isActive
                        ? 'text-main underline'
                        : 'transition-colors duration-100 hover:text-main hover:underline'
                  }
               >
                  <motion.li
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     variants={item}
                     tabIndex={-1}
                  >
                     -Memo
                  </motion.li>
               </NavLink>
               <NavLink
                  to="/troubleshooting"
                  className={({ isActive }) =>
                     isActive
                        ? 'text-main underline'
                        : 'transition-colors duration-100 hover:text-main hover:underline'
                  }
               >
                  <motion.li
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     variants={item}
                     tabIndex={-1}
                  >
                     -Trouble shooting
                  </motion.li>
               </NavLink>
            </motion.ul>
         </motion.nav>
      </div>
   );
}

export default Sidebar;
