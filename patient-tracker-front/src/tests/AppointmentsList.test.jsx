import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppointmentsList from '../components/AppointmentsList';
import { toast } from 'react-toastify';

const mockNavigate = vi.fn();
const appointments = [
    {
        "_id": "656cfda0be30a5a5885b520e",
        "patient": {
            "_id": "656c1cafee01dd38f70f2b37",
            "name": "John Doe",
            "dateOfBirth": "1985-07-12",
            "contact": "555-123-4567"
        },
        "doctor": "656cf827622a670699def59d",
        "date": "05/12/2023",
        "purpose": "Severe Head ache",
        "__v": 0
    },
    {
        "_id": "65711a600a4d32f7e91be600",
        "patient": {
            "_id": "656c1cb0ee01dd38f70f2b52",
            "name": "David Johnson",
            "dateOfBirth": "1990-10-05",
            "contact": "555-888-9999"
        },
        "doctor": "656cf827622a670699def59d",
        "date": "12/15/2023",
        "purpose": "Leg pain",
        "__v": 0
    }
    
]

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock customFetch.delete
vi.mock('../utils', () => ({
  customFetch: {
    delete: vi.fn(() => Promise.resolve({ success: true })),
  },
}));

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('AppointmentsList Component', () => {
    it('should render the component with appointments', () => {
      render(
        <MemoryRouter>
          <AppointmentsList appointments={appointments} />
        </MemoryRouter>
      );
  
      // Check for presence of elements to confirm rendering
      expect(screen.getByText('Patients')).toBeTruthy();
      // Add more assertions as needed
    });

    it('should navigate to medical history on row click', () => {
      
        render(
          <MemoryRouter>
            <AppointmentsList appointments={appointments} />
          </MemoryRouter>
        );
      
        const firstRow = screen.getByText(appointments[0].patient.name);
        fireEvent.click(firstRow);
      
        // Replace 'mockNavigate' with actual mock function name
        expect(mockNavigate).toHaveBeenCalledWith(`/medical-history/${appointments[0].patient._id}`);
      });
      

      it('should call the edit and delete functions when buttons are clicked', async () => {
        render(
          <MemoryRouter>
            <AppointmentsList appointments={appointments} />
          </MemoryRouter>
        );
      
         // Find a specific row by patient's name or other unique data
  const row = screen.getByText(appointments[0].patient.name).closest('tr');

  // Within that row, find the Edit button
  const editButton = within(row).getByText('Edit');
  fireEvent.click(editButton);

  // Test navigation for edit
  expect(mockNavigate).toHaveBeenCalled();

  // Within that row, find the Delete button
  const deleteButton = within(row).getByText('Delete');
  
  // Simulate click on the delete button
  fireEvent.click(deleteButton);

  // Wait for the asynchronous operation to complete
  await new Promise(resolve => setTimeout(resolve, 0)); // Use a brief timeout to allow the async operation to complete

  // Check if the toast message is displayed
  expect(toast.success).toHaveBeenCalledWith('Appointment Deleted Successfully');
    });
      
  });
  