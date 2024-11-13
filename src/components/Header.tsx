import { Link } from 'react-router-dom';

function Header() {
   return (
      <nav className="mb-2 flex flex-row items-center gap-3 border-b border-[#4A090D]">
         <Link to={'/'} className="px-1">
            <img
               src={`${import.meta.env.BASE_URL}assets/mainLogo.svg`}
               width={40}
               alt="홈페이지 로고"
            />
         </Link>
         <Link to={'/memo'}>
            <span className="text-sm">기록</span>
         </Link>
      </nav>
   );
}

export default Header;
