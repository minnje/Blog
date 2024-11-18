import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
   return (
      <header className="mb-3 mt-2 flex items-center">
         <Link to={'/'} className="px-1">
            <motion.img
               className="bg-transparent"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               src={`${import.meta.env.BASE_URL}assets/mainLogo.svg`}
               width={40}
               alt="블로그 로고"
               tabIndex={-1}
            />
         </Link>
      </header>
   );
}

export default Header;
