import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Write from './pages/Write';
import Home from './pages/Home';
import Layout from './components/Layout';
import List from './pages/List';
import Content from './pages/Content';

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
                  <Content />
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
                  <Content />
               </>
            ),
            errorElement: <Error />,
         },
      ],
   },
]);

export default router;
