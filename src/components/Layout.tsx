import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }: any) {
   return (
      <div className="">
         <Header />
         <div className="flex">
            <Sidebar />
            {children}
         </div>
      </div>
   );
}

export default Layout;
