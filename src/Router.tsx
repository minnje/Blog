import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import Write from './pages/write';
import Error from './pages/Error';
import MemoList from './pages/MemoList';
import Memo from './pages/Memo';

const router = createBrowserRouter([
   {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      children: [
         {
            path: 'home',
            element: <Home />,
            errorElement: <Error />,
         },
         {
            path: 'write',
            element: <Write />,
            errorElement: <Error />,
         },
         {
            path: 'memo',
            element: <MemoList />,
            errorElement: <Error />,
            children: [
               { path: ':memoId', element: <Memo />, errorElement: <Error /> },
            ],
         },
      ],
   },
]);

export default router;
