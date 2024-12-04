import Header from './Header';
import Sidebar from './Sidebar';
import 'framer-motion';

function Layout({ children }: any) {
    return (
        <>
            <Header />
            <div className="box-border flex h-[85vh] gap-4 rounded-xl bg-neutral-100 p-3">
                <Sidebar />
                <div className="flex w-full">{children}</div>
            </div>
        </>
    );
}

export default Layout;
