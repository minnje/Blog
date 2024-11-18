import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }: any) {
   return (
      <div className="">
         <Header />
         <div className="flex gap-4">
            <Sidebar />
            {children}
         </div>
      </div>
   );
}

export default Layout;
