
import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import SharedChart from '../components/SharedChart';
const getPatientHealthMetrics = (patientId) => {
   
    const url = `/patient-health-metrics/${patientId}`;
   
    return {
    queryKey: ['healthMetrics', patientId],
      queryFn: () =>
        customFetch(url),
    };
   };
   
   
export const loader =
(queryClient) =>
async ({ params }) => {
    queryClient.invalidateQueries()
    const response = await queryClient.ensureQueryData(
    getPatientHealthMetrics(params.id)
    );
    const healthMetrics  = response.data;
    return healthMetrics;
};

const HealthMetrics = () => {
    const healthMetrics = useLoaderData().healthMetrics;
    console.log(healthMetrics);
    const labels = healthMetrics.map(item => new Date(item.date).toLocaleDateString());
    const bloodPressureData = {
        labels,
        datasets: [
          {
            label: 'Systolic Blood Pressure (mmHg)',
            data: healthMetrics.map(item => item.bloodPressure.systolic),
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Diastolic Blood Pressure (mmHg)',
            data: healthMetrics.map(item => item.bloodPressure.diastolic),
            borderColor: 'blue',
            fill: false,
          }
        ]
      };
      
      const weightData = {
        labels,
        datasets: [
          {
            label: 'Weight (kg)',
            data: healthMetrics.map(item => item.weight),
            borderColor: 'green',
            fill: false,
          }
        ]
      };
      const bloodSugarData = {
        labels,
        datasets: [
          {
            label: 'Sugar Level (mmol/L)',
            data: healthMetrics.map(item => item.bloodSugar),
            borderColor: 'pink',
            fill: false,
          }
        ]
      };
    return (
        <div className="container mx-auto p-6 font-mono">
            <h2 className="text-2xl font-bold mb-4">Patient Health Metrics</h2>
            <h2>Blood Pressure Chart</h2>
            <SharedChart data={bloodPressureData} chartType="line" />
            
            <h2>Weight Chart</h2>
            <SharedChart data={weightData} chartType="line" />

            <h2>Blood Sugar Level Chart</h2>
            <SharedChart data={bloodSugarData} chartType="line" />

        </div>
    )
}


export default HealthMetrics;