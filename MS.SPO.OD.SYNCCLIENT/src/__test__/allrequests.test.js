import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Allrequests from '../Pages/Allrequests'; // Adjust based on your folder structure

// Mocking DataTable with an empty function for the use method
jest.mock('datatables.net-react', () => {
    const mockDataTable = ({ data, columns }) => (
        <div role="table">
            {data.map((row, index) => (
                <div key={index} role="row">
                    {columns.map((col) => (
                        <div key={col.data}>{row[col.data]}</div>
                    ))}
                </div>
            ))}
        </div>
    );

    // Prevent DataTable.use from being called
    mockDataTable.use = jest.fn();

    return mockDataTable;
});

describe('Allrequests Component', () => {
    beforeEach(() => {
        render(<Allrequests />);
    });

    test('displays a loading spinner initially', () => {
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('fetches and displays data in the DataTable', async () => {
        // Wait for the loading spinner to disappear
        await waitFor(() => {
            expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument(); // Ensure loading text is gone
        });

        // Verify that the data loaded and is displayed in the table
        const rows = await screen.findAllByRole('row'); // Find all rows
        expect(rows.length).toBeGreaterThan(0); // Assert that there is at least one row

    });
});
