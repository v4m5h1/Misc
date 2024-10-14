import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import '@testing-library/jest-dom';

// Mocking the components used in the routes
jest.mock('./Pages/Home', () => () => <div>Home Page</div>);
jest.mock('./Pages/DownloadRequest', () => () => <div>Download Request Page</div>);
jest.mock('./Pages/UploadRequest', () => () => <div>Upload Request Page</div>);
jest.mock('./Pages/Allrequests', () => () => <div>All Requests Page</div>);

describe('AppRoutes Component', () => {
  test('renders Home Page for default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('renders Download Request Page for /downloadrequest route', () => {
    render(
      <MemoryRouter initialEntries={['/downloadrequest']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Download Request Page')).toBeInTheDocument();
  });

  test('renders Upload Request Page for /uploadrequest route', () => {
    render(
      <MemoryRouter initialEntries={['/uploadrequest']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Upload Request Page')).toBeInTheDocument();
  });

  test('renders All Requests Page for /allrequest route', () => {
    render(
      <MemoryRouter initialEntries={['/allrequest']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('All Requests Page')).toBeInTheDocument();
  });
});
