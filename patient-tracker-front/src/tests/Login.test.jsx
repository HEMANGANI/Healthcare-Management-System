import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { customFetchNoToken } from '../utils';
import { toast } from 'react-toastify';
import { store } from '../store';
import { action as loginAction } from '../pages/Login';
import { HomeLayout } from '../pages';

const routes = [
  { path: '/', element: <HomeLayout /> },
  {
    path: '/login',
    element: <Login />,
    action: loginAction(store),
  },
];

// Create a memory router
const router = createMemoryRouter(routes, {
  initialEntries: ['/login'],
});

// Mock customFetchNoToken.post
vi.mock('../utils', () => ({
  customFetchNoToken: {
    post: vi.fn(),
  },
}));

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Login Component', () => {
  it('submits the form and navigates on successful login', async () => {
    customFetchNoToken.post.mockResolvedValueOnce({
      data: {
        doctor: {
          _id: '656cf827622a670699def59d',
          username: 'test',
          email: 'test@test.com',
          patients: [
            '656c1cafee01dd38f70f2b37',
            '656c1cafee01dd38f70f2b45',
            '656c1cb0ee01dd38f70f2b52',
          ],
          __v: 0,
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZjZjgyNzYyMmE2NzA2OTlkZWY1OWQiLCJpYXQiOjE3MDI6MDE5NzR9.V3Yklp62EY2K64p-chmxLK5jR0UVLAzbiVlbrxRjSlI',
      },
    });

    render(<RouterProvider router={router} />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(screen.getByText('login'));

    await waitFor(() => {
      // Check if the API was called with the correct data
      expect(customFetchNoToken.post).toHaveBeenCalledWith('/doctors/login', {
        email: 'test@test.com',
        password: '123',
      });

      // Check if the success toast was displayed
      expect(toast.success).toHaveBeenCalledWith('logged in successfully');
    });
  });

  it('displays an error message on login failure', async () => {
    router.navigate('/login');
    const errorMessage = 'Invalid credentials';
    customFetchNoToken.post.mockRejectedValueOnce({
      response: { data: { error: { message: errorMessage } } },
    });

    render(<RouterProvider router={router} />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');

    fireEvent.change(emailInput, { target: { value: 'wrong@wrong.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('login'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });
});
