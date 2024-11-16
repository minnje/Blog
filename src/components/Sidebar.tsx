import { useQuery } from 'react-query';
import { getProfile } from '../utils/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-vanilla-tilt';

function Sidebar() {
   const { isLoading, error, data } = useQuery('profile', getProfile);
   console.log(data);

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
                     className="rounded-sm"
                     src={`${import.meta.env.VITE_PB_API}/files/users/${data?.id}/${data?.avatar}`}
                     alt="프로필 이미지"
                     width={130}
                  />
               </Tilt>
               <div className="flex flex-col space-y-1 px-1 py-2 text-xs">
                  <figcaption className="font-medium">{data.name}</figcaption>
                  <figcaption className="text-[11px]">{data.email}</figcaption>
               </div>
            </figure>
         ))}
         <motion.nav className="flex flex-col rounded-md p-2 text-[11px] text-neutral-700">
            <motion.ul
               variants={list}
               initial="initial"
               animate="animate"
               className="space-y-1"
            >
               <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={item}
               >
                  <Link
                     to="/memo"
                     className="transition-colors duration-100 hover:text-main"
                  >
                     * 기록
                  </Link>
               </motion.li>
               <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={item}
               >
                  <Link
                     to="/troubleshooting"
                     className="transition-colors duration-100 hover:text-main"
                  >
                     * Trouble shooting
                  </Link>
               </motion.li>
            </motion.ul>
         </motion.nav>
      </div>
   );
}

export default Sidebar;
