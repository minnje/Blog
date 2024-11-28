import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import './styles/main.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <HelmetProvider>
         <RecoilRoot>
            <QueryClientProvider client={queryClient}>
               <RouterProvider router={router} />
            </QueryClientProvider>
         </RecoilRoot>
      </HelmetProvider>
   </StrictMode>
);
