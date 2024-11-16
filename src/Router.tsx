import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import MemoList from './pages/MemoList';
import Memo from './pages/Memo';
import Write from './pages/Write';
import Home from './pages/Home';
import Layout from './components/Layout';
import Troubleshooting from './pages/Trouble';

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <>
            <Layout>
               <Home />
            </Layout>
         </>
      ),
      errorElement: <Error />,
   },
   {
      path: '/write',
      element: (
         <>
            <Layout>
               <Write />
            </Layout>
         </>
      ),
      errorElement: <Error />,
   },
   {
      path: '/memo',
      element: (
         <>
            <Layout>
               <MemoList />
            </Layout>
         </>
      ),
      errorElement: <Error />,
   },
   {
      path: '/troubleshooting',
      element: (
         <>
            <Layout>
               <Troubleshooting />
            </Layout>
         </>
      ),
      errorElement: <Error />,
   },
   {
      path: ':memoId',
      element: (
         <>
            <Layout>
               <Memo />
            </Layout>
         </>
      ),
      errorElement: <Error />,
   },
]);

export default router;
