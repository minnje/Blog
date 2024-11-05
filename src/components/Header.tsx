import { Link } from 'react-router-dom';

function Header() {
   return (
      <nav className="flex flex-row items-center gap-3">
         <Link to={'/'}>
            <span className="flex">🎧</span>
         </Link>
         <Link to={'/memo'}>
            <span className="text-sm">기록</span>
         </Link>
      </nav>
   );
}

export default Header;
