import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
   return (
      <header>
         <nav className="mb-2 flex flex-row items-center gap-3">
            <Link to={'/'} className="px-1">
               <motion.img
                  className="bg-transparent"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src={`${import.meta.env.BASE_URL}assets/mainLogo.svg`}
                  width={40}
                  alt="홈페이지 로고"
               />
            </Link>
         </nav>
      </header>
   );
}

export default Header;
