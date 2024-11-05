import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import MemoList from './pages/MemoList';
import Memo from './pages/Memo';
import Write from './pages/Write';
import Home from './pages/Home';
import Header from './components/Header';

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <>
            <Header />
            <Home />
         </>
      ),
      errorElement: <Error />,
   },
   {
      path: '/write',
      element: (
         <>
            <Header />
            <Write />
         </>
      ),
      errorElement: <Error />,
   },
   {
      path: '/memo',
      element: (
         <>
            <Header />
            <MemoList />
         </>
      ),
      errorElement: <Error />,
      children: [
         {
            path: ':memoId',
            element: <Memo />,
            errorElement: <Error />,
         },
      ],
   },
]);

export default router;
