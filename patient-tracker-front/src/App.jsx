import { action as loginAction } from './pages/Login';
import {action as registerAction} from './pages/Register'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HomeLayout, Login, Landing, Patients, ProfilePage, Register, AppointmentsPage, ManageAppointments, HealthMetrics } from './pages';
import { store } from './store';
import { SinglePatient } from './components';
import { loader as patientLoader } from './pages/Patients';
import { loader as singlePatientLoader } from './components/SinglePatient';
import { loader as singlePatientLoaderEdit } from './components/PatientRegister';
import { loader as appointmentsLoader } from './pages/AppointmentsPage';
import {loader as singleAppointmentEditLoader} from './components/AppointmentRegister'
import {loader as healthMetricsLoader} from './pages/HealthMetrics'

const queryClient = new QueryClient({
defaultOptions: {
  queries: {
    staleTime: 1000 * 60 * 5,
    // cacheTime: 1000,
  },
},
});
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
     element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
   },
   {
     path: 'manage-patient/:id',
     element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
    loader: singlePatientLoaderEdit(queryClient)
   },
   {
     path: 'medical-history',
     element: (
      <ProtectedRoute>
        <Patients />
      </ProtectedRoute>
    ),
    loader: patientLoader(queryClient)
   },
   {
     path: 'medical-history/:id',
     element: (
      <ProtectedRoute>
        <SinglePatient />
      </ProtectedRoute>
    ),
    loader: singlePatientLoader(queryClient)
   },
   {
     path: 'appointments/',
     element: (
      <ProtectedRoute>
        <AppointmentsPage />
      </ProtectedRoute>
    ),
    loader: appointmentsLoader(queryClient)
   },
   {
     path: 'manage-appointments/',
     element: (
      <ProtectedRoute>
        <ManageAppointments />
      </ProtectedRoute>
    ),
    loader: singleAppointmentEditLoader(queryClient)
   },
   {
     path: 'health-metrics/:id',
     element: (
      <ProtectedRoute>
        <HealthMetrics />
      </ProtectedRoute>
    ),
    loader: healthMetricsLoader(queryClient)
   },
  
 ]
},
{
 path: '/login',
 element: <Login />,
 action: loginAction(store),
},
{
 path: '/register',
 element: <Register />,
 action: registerAction,
},
]);

const App = () => {
return (
 <QueryClientProvider client={queryClient}>
   <RouterProvider router={router} />
   <ReactQueryDevtools initialIsOpen={false} />
 </QueryClientProvider>
);
};
export default App;