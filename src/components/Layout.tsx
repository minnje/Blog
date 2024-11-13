import Header from './Header';
import Profile from './Profile';

function Layout({ children }: any) {
   return (
      <>
         <Header />
         <div className="flex">
            <Profile />
            {children}
         </div>
      </>
   );
}

export default Layout;
