import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getProfile } from '../utils/api';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-vanilla-tilt';
import { useState } from 'react';

const basicVar = {
   initial: { opacity: 0 },
   animate: {
      opacity: 1,
      transition: {
         delayChildren: 0.3,
         staggerChildren: 0.3,
      },
   },
};

const slideVar = {
   initial: { opacity: 0 },
   animate: {
      opacity: 1,
      y: [-15, 0],
      transition: {
         type: 'spring',
      },
   },
};

function Home() {
   const { isLoading, error, data } = useQuery('profile', getProfile);
   const [clicked, setClicked] = useState(false);

   const MotionNavLink = motion(NavLink);

   const handleTilt = () => {
      setClicked((prev) => !prev);
   };

   return (
      <div className="flex flex-col items-center">
         <header className="mb-6 mt-2 flex items-center justify-center">
            <Link to={'/'} className="focus-custom rounded-2xl">
               <motion.img
                  className="bg-transparent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  src={`${import.meta.env.BASE_URL}assets/mainLogo.svg`}
                  width={45}
                  alt="블로그 로고"
                  tabIndex={-1}
               />
            </Link>
         </header>

         <motion.div
            variants={basicVar}
            initial="initial"
            animate="animate"
            className="flex max-w-96 flex-col gap-2"
         >
            {isLoading ? <span>Loading...</span> : null}
            {error ? <span>error!</span> : null}
            {data?.map((data) => (
               <figure
                  key={data.id}
                  className="mb-4 flex flex-col gap-2 border-b p-1"
               >
                  <motion.div className="flex justify-center">
                     <Tilt
                        onClick={handleTilt}
                        className="tilt-container"
                        options={{ scale: 2, max: 25 }}
                     >
                        <img
                           className="rounded-lg"
                           src={`${import.meta.env.VITE_PB_API}/files/users/${data?.id}/${data?.avatar}`}
                           alt="프로필 이미지"
                           width={320}
                        />
                     </Tilt>
                  </motion.div>
                  <div className="flex flex-col space-y-1 p-2 text-sm">
                     <motion.figcaption
                        variants={slideVar}
                        className="bg-transparent text-xl font-extralight"
                     >
                        {data.name}
                     </motion.figcaption>
                     <motion.figcaption
                        variants={slideVar}
                        className="bg-transparent text-xs"
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
      </div>
   );
}

export default Home;
