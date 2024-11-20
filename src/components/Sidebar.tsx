import { useQuery } from 'react-query';
import { getProfile } from '../utils/api';
import { motion } from 'framer-motion';
import Tilt from 'react-vanilla-tilt';
import { NavLink } from 'react-router-dom';

function Sidebar() {
   const { isLoading, error, data } = useQuery('profile', getProfile);

   // const list = {
   //    initial: { opacity: 0 },
   //    animate: {
   //       opacity: 1,
   //       transition: { type: 'tween' },
   //    },
   // };

   const MotionNavLink = motion(NavLink);

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
               <div className="flex flex-col space-y-1 bg-transparent px-1 py-2 text-xs">
                  <figcaption className="bg-transparent font-medium">
                     {data.name}
                  </figcaption>
                  <figcaption className="bg-transparent text-[10px]">
                     {data.email}
                  </figcaption>
               </div>
            </figure>
         ))}
         <nav>
            <motion.ul className="flex flex-col space-y-1 p-2 text-[11px] text-neutral-800">
               <motion.li tabIndex={-1}>
                  <MotionNavLink
                     to="/memo"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className={({ isActive }) =>
                        `focus-custom block rounded-2xl px-2 py-1 ${
                           isActive ? 'bg-sub ring-2 ring-main' : ''
                        }`
                     }
                  >
                     -Memo
                  </MotionNavLink>
               </motion.li>
               <motion.li tabIndex={-1}>
                  <MotionNavLink
                     to="/troubleshooting"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className={({ isActive }) =>
                        `focus-custom block rounded-2xl px-2 py-1 ${
                           isActive ? 'bg-sub ring-2 ring-main' : ''
                        }`
                     }
                  >
                     -Trouble shooting
                  </MotionNavLink>
               </motion.li>
            </motion.ul>
         </nav>
      </div>
   );
}

export default Sidebar;
