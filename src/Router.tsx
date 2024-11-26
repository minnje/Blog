import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Home from './pages/Home';
import Layout from './components/Layout';
import { lazy, Suspense } from 'react';
import Edit from './pages/Edit';

const Write = lazy(() => import('./pages/Write'));
const List = lazy(() => import('./pages/List'));
const Content = lazy(() => import('./pages/Content'));

// const withSuspense = (Component) => (
//    <Suspense fallback={<div>Loading...</div>}>

//       <Component />
//    </Suspense>
// );

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <>
            <Home />
         </>
      ),
      errorElement: <Error />,
   },
   {
      path: '/edit/:editId',
      element: (
         <Layout>
            <Suspense fallback={<div>Loading...</div>}>
               <Edit />
            </Suspense>
         </Layout>
      ),
   },
   {
      path: '/memo/write',
      element: (
         <Layout>
            <Suspense fallback={<div>Loading...</div>}>
               <Write />
            </Suspense>
         </Layout>
      ),
      errorElement: <Error />,
   },
   {
      path: '/troubleshooting/write',
      element: (
         <Layout>
            <Suspense fallback={<div>Loading...</div>}>
               <Write />
            </Suspense>
         </Layout>
      ),
      errorElement: <Error />,
   },
   {
      path: '/memo',
      element: (
         <Layout>
            <Suspense fallback={<div>Loading...</div>}>
               <List />
            </Suspense>
         </Layout>
      ),
      errorElement: <Error />,
      children: [
         {
            path: ':memoId',
            element: (
               <Suspense fallback={<div>Loading...</div>}>
                  <Content />
               </Suspense>
            ),
            errorElement: <Error />,
         },
      ],
   },
   {
      path: '/troubleshooting',
      element: (
         <Layout>
            <Suspense fallback={<div>Loading...</div>}>
               <List />
            </Suspense>
         </Layout>
      ),
      errorElement: <Error />,
      children: [
         {
            path: ':troubleId',
            element: (
               <Suspense fallback={<div>Loading...</div>}>
                  <Content />
               </Suspense>
            ),
            errorElement: <Error />,
         },
      ],
   },
]);

export default router;
