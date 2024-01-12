import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PatientList from '../components/PatientList';

const mockNavigate = vi.fn();
const initialPatients = [
  {"_id":{"$oid":"656c1cafee01dd38f70f2b37"},"name":"John Doe","dateOfBirth":"1985-07-12","gender":"Male","contact":"555-123-4567","emergencyContact":{"name":"Jane Doe","relationship":"Spouse","contact":"555-987-6543","_id":{"$oid":"656c1cafee01dd38f70f2b38"}},"ssn":"123-45-6789","insurance":{"provider":"BlueCross BlueShield","policyNumber":"BCBS12345","_id":{"$oid":"656c1cafee01dd38f70f2b39"}},"medicalHistory":{"allergies":["Penicillin","Peanuts"],"chronicConditions":["Hypertension"],"surgeries":["Appendectomy"],"_id":{"$oid":"656c1cafee01dd38f70f2b3a"}},"medications":[{"name":"Lisinopril","dosage":"10mg","frequency":"Once daily","_id":{"$oid":"656c1cafee01dd38f70f2b3b"}},{"name":"Aspirin","dosage":"81mg","frequency":"Once daily","_id":{"$oid":"656c1cafee01dd38f70f2b3c"}}],"vaccinations":[{"name":"Flu Shot","date":"2022-09-25","_id":{"$oid":"656c1cafee01dd38f70f2b3d"}},{"name":"Tetanus Booster","date":"2021-05-10","_id":{"$oid":"656c1cafee01dd38f70f2b3e"}}],"primaryCarePhysician":{"name":"Dr. Sarah Johnson","contact":"555-555-5555","_id":{"$oid":"656c1cafee01dd38f70f2b3f"}},"prescriptions":[{"name":"Metformin","dosage":"500mg","instructions":"Take with meals","_id":{"$oid":"656c1cafee01dd38f70f2b41"}}],"billing":{"invoices":[{"invoiceNumber":"INV12345","amount":{"$numberInt":"150"},"status":"Paid","_id":{"$oid":"656c1cafee01dd38f70f2b43"}}],"insuranceClaims":[{"claimNumber":"CLM98765","amount":{"$numberInt":"100"},"status":"Approved","_id":{"$oid":"656c1cafee01dd38f70f2b44"}}],"_id":{"$oid":"656c1cafee01dd38f70f2b42"}},"__v":{"$numberInt":"0"}},
  {"_id":{"$oid":"656c1cb0ee01dd38f70f2b7a"},"name":"Michael Brown","dateOfBirth":"1975-03-15","gender":"Male","contact":"555-555-8888","emergencyContact":{"name":"Lisa Brown","relationship":"Wife","contact":"555-555-7777","_id":{"$oid":"656c1cb0ee01dd38f70f2b7b"}},"ssn":"678-90-1234","insurance":{"provider":"Kaiser Permanente","policyNumber":"KP12345","_id":{"$oid":"656c1cb0ee01dd38f70f2b7c"}},"medicalHistory":{"allergies":["Pollen"],"chronicConditions":["Diabetes","High Blood Pressure"],"surgeries":["Gallbladder Removal"],"_id":{"$oid":"656c1cb0ee01dd38f70f2b7d"}},"medications":[{"name":"Metformin","dosage":"1000mg","frequency":"Twice daily","_id":{"$oid":"656c1cb0ee01dd38f70f2b7e"}},{"name":"Lisinopril","dosage":"20mg","frequency":"Once daily","_id":{"$oid":"656c1cb0ee01dd38f70f2b7f"}}],"vaccinations":[{"name":"Shingles Vaccine","date":"2022-07-18","_id":{"$oid":"656c1cb0ee01dd38f70f2b80"}}],"primaryCarePhysician":{"name":"Dr. Michael Thompson","contact":"555-555-5555","_id":{"$oid":"656c1cb0ee01dd38f70f2b81"}},"prescriptions":[{"name":"Simvastatin","dosage":"40mg","instructions":"Take in the evening","_id":{"$oid":"656c1cb0ee01dd38f70f2b83"}}],"billing":{"invoices":[{"invoiceNumber":"INV67890","amount":{"$numberInt":"120"},"status":"Paid","_id":{"$oid":"656c1cb0ee01dd38f70f2b85"}}],"insuranceClaims":[{"claimNumber":"CLM56789","amount":{"$numberInt":"80"},"status":"Approved","_id":{"$oid":"656c1cb0ee01dd38f70f2b86"}}],"_id":{"$oid":"656c1cb0ee01dd38f70f2b84"}},"__v":{"$numberInt":"0"}},
  {"_id":{"$oid":"657b9c39377bebbdb05232a3"},"name":"Jane Smith","dateOfBirth":"1979-02-28","gender":"Female","contact":"555-555-5555","emergencyContact":{"name":"Michael Smith","relationship":"Husband","contact":"555-987-6543","_id":{"$oid":"656c1cafee01dd38f70f2b46"}},"ssn":"234-56-7890","insurance":{"provider":"Aetna","policyNumber":"AET12345","_id":{"$oid":"656c1cafee01dd38f70f2b47"}},"medicalHistory":{"allergies":["None"],"chronicConditions":["Asthma"],"surgeries":["Knee Replacement"],"_id":{"$oid":"656c1cafee01dd38f70f2b48"}},"medications":[{"name":"Albuterol","dosage":"90mcg","frequency":"As needed","_id":{"$oid":"656c1cafee01dd38f70f2b49"}},{"name":"Advair","dosage":"250/50","frequency":"Twice daily","_id":{"$oid":"656c1cafee01dd38f70f2b4a"}}],"vaccinations":[{"name":"COVID-19 Vaccine","date":"2021-06-15","_id":{"$oid":"656c1cafee01dd38f70f2b4b"}}],"primaryCarePhysician":{"name":"Dr. Mark Davis","contact":"555-555-5555","_id":{"$oid":"656c1cb0ee01dd38f70f2b4c"}},"prescriptions":[{"name":"Lisinopril","dosage":"10mg","instructions":"Take with meals","_id":{"$oid":"656c1cb0ee01dd38f70f2b4e"}}],"billing":{"invoices":[{"invoiceNumber":"INV23456","amount":{"$numberInt":"200"},"status":"Paid","_id":{"$oid":"656c1cb0ee01dd38f70f2b50"}}],"insuranceClaims":[{"claimNumber":"CLM12345","amount":{"$numberInt":"150"},"status":"Approved","_id":{"$oid":"656c1cb0ee01dd38f70f2b51"}}],"_id":{"$oid":"656c1cb0ee01dd38f70f2b4f"}},"__v":{"$numberInt":"1"}}    
];
// Mock useNavigate and retain other functionalities
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});


// Test Rendering of Component


describe('PatientList Component', () => {
  it('should render the component with initial patients', () => {
      
    render(
      <MemoryRouter>
        <PatientList initialPatients={initialPatients} />
      </MemoryRouter>
    );

    // Check for the presence of a patient's name to confirm rendering
    expect(screen.getByText('John Doe')).toBeTruthy();
  });


// Test Search Functionality

it('should filter patients based on search term', () => {

  render(
    <MemoryRouter>
      <PatientList initialPatients={initialPatients} />
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText('Search by name...');
  fireEvent.change(searchInput, { target: { value: 'Jane' } });

  expect(screen.getByText('Jane Smith')).toBeTruthy();
  expect(screen.queryByText('John Doe')).toBeNull();
});

// Test Navigation on Row Click


it('should navigate to patient’s medical history on row click', () => {

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<PatientList initialPatients={initialPatients} />} />
      </Routes>
    </MemoryRouter>
  );

  const patientIdCell = screen.getByText('1'); // Assuming '1' is the content of the cell
  fireEvent.click(patientIdCell);

  expect(mockNavigate).toHaveBeenCalled(); // Simplified check

});

it('should navigate to manage appointments on add appointment button click', async () => {
 
  render(
    <MemoryRouter>
      <PatientList initialPatients={initialPatients} />
    </MemoryRouter>
  );

  // Assuming each patient has an 'Add Appointment' button
  // Find the 'Add Appointment' button for the first patient
  const addButton = screen.getAllByText('Add')[0]; // Adjust if the button text is different
  fireEvent.click(addButton);

  // Check if navigate has been called with the correct path
  expect(mockNavigate).toHaveBeenCalledWith(`/manage-appointments?patientId=${initialPatients[0]._id}`);
});


});
