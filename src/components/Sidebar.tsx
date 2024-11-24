import { useQuery } from 'react-query';
import { getProfile } from '../utils/api';
import { motion } from 'framer-motion';
import Tilt from 'react-vanilla-tilt';
import { NavLink } from 'react-router-dom';

export const basicVar = {
   initial: { opacity: 0 },
   animate: {
      opacity: 1,
      transition: {
         delayChildren: 0.2,
         staggerChildren: 0.2,
      },
   },
};

const slideVar = {
   initial: { opacity: 0 },
   animate: {
      opacity: 1,
      y: [-10, 0],
      transition: {
         type: 'spring',
      },
   },
};

function Sidebar() {
   const { isLoading, error, data } = useQuery('profile', getProfile);

   const MotionNavLink = motion(NavLink);

   return (
      <motion.div
         variants={basicVar}
         initial="initial"
         animate="animate"
         className="flex min-w-44 flex-col gap-2"
      >
         {isLoading ? <span>Loading...</span> : null}
         {error ? <span>error!</span> : null}
         {data?.map((data) => (
            <figure key={data.id} className="flex flex-col gap-2 border-b p-1">
               <Tilt className="tilt-container" options={{ scale: 2, max: 25 }}>
                  <img
                     className="rounded-lg"
                     src={`${import.meta.env.VITE_PB_API}/files/users/${data?.id}/${data?.avatar}`}
                     alt="프로필 이미지"
                     width={170}
                  />
               </Tilt>
               <div className="flex flex-col space-y-1 bg-transparent p-2 text-sm">
                  <motion.figcaption
                     variants={slideVar}
                     className="bg-transparent font-medium"
                  >
                     {data.name}
                  </motion.figcaption>
                  <motion.figcaption
                     variants={slideVar}
                     className="bg-transparent text-xs text-neutral-600"
                  >
                     {data.email}
                  </motion.figcaption>
               </div>
            </figure>
         ))}
         <nav>
            <ul className="flex flex-col space-y-1 p-2 text-xs text-neutral-800">
               <motion.li variants={slideVar} tabIndex={-1}>
                  <MotionNavLink
                     to="/memo"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className={({ isActive }) =>
                        `focus-custom block rounded-2xl px-2 py-[3px] ${
                           isActive
                              ? 'bg-sub font-medium shadow-xl ring-2 ring-main'
                              : ''
                        }`
                     }
                  >
                     -Memo
                  </MotionNavLink>
               </motion.li>
               <motion.li variants={slideVar} tabIndex={-1}>
                  <MotionNavLink
                     to="/troubleshooting"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className={({ isActive }) =>
                        `focus-custom block rounded-2xl px-2 py-[3px] ${
                           isActive
                              ? 'bg-sub font-medium shadow-xl ring-2 ring-main'
                              : ''
                        }`
                     }
                  >
                     -Trouble shooting
                  </MotionNavLink>
               </motion.li>
            </ul>
         </nav>
      </motion.div>
   );
}

export default Sidebar;
