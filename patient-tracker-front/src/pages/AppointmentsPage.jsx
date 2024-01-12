import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { store } from '../store';
import { AppointmentsList } from '../components';


const allAppointmentsQuery = () => {
  const state = store.getState();
  const doctorId = state.userState.user._id;
   const url = `/appointments/doctor/${doctorId}`;
   return {
    queryKey: [
      'appointments', doctorId
    ],
    queryFn: () =>
      customFetch(url),
  };
};
 export const loader =
  (queryClient) =>
  async ({ request }) => {
  
    const response = await queryClient.ensureQueryData(
      allAppointmentsQuery()
    );
    const appointments  = response.data;
    return appointments;
  };



 const AppointmentsPage = () => {
  const appointmentsData = useLoaderData();
  return (
      <div>
        <AppointmentsList appointments={appointmentsData} />
      </div>
    );


}
export default AppointmentsPage;