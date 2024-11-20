import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Memo from './pages/Memo';
import Write from './pages/Write';
import Home from './pages/Home';
import Layout from './components/Layout';
import List from './pages/List';

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
               <List />
            </Layout>
         </>
      ),
      errorElement: <Error />,
      children: [
         {
            path: ':memoId',
            element: (
               <>
                  <Memo />
               </>
            ),
            errorElement: <Error />,
         },
      ],
   },
   {
      path: '/troubleshooting',
      element: (
         <>
            <Layout>
               <List />
            </Layout>
         </>
      ),
      errorElement: <Error />,
      children: [
         {
            path: ':troubleId',
            element: (
               <>
                  <Memo />
               </>
            ),
            errorElement: <Error />,
         },
      ],
   },
]);

export default router;
