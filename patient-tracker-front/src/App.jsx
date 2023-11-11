
import { action as loginAction } from './pages/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HomeLayout, Login, Landing, Patients, ProfilePage } from './pages';
import { store } from './store';
import { SinglePatient } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'manage-patient',
        element: <ProfilePage />,
      },
      {
        path: 'medical-history',
        element: <Patients />,
      },
      {
        path: 'medical-history/:id',
        element: <SinglePatient />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction(store),
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      // cacheTime: 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;