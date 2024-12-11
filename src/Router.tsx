import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Home from './pages/Home';
import Layout from './components/Layout';
import { lazy, Suspense } from 'react';

const Edit = lazy(() => import('./pages/Edit'));
const Write = lazy(() => import('./pages/Write'));
const List = lazy(() => import('./pages/List'));
const Content = lazy(() => import('./pages/Content'));

const withSuspense = (Component) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: '/edit/:editId',
        element: <Layout>{withSuspense(Edit)}</Layout>,
        errorElement: <Error />,
    },
    {
        path: '/memo/write',
        element: <Layout>{withSuspense(Write)}</Layout>,
        errorElement: <Error />,
    },
    {
        path: '/troubleshooting/write',
        element: <Layout>{withSuspense(Write)}</Layout>,
        errorElement: <Error />,
    },
    {
        path: '/memo',
        element: <Layout>{withSuspense(List)}</Layout>,
        errorElement: <Error />,
        children: [
            {
                path: ':memoId',
                element: withSuspense(Content),
                errorElement: <Error />,
            },
        ],
    },
    {
        path: '/troubleshooting',
        element: <Layout>{withSuspense(List)}</Layout>,
        errorElement: <Error />,
        children: [
            {
                path: ':troubleId',
                element: withSuspense(Content),
                errorElement: <Error />,
            },
        ],
    },
]);

export default router;
