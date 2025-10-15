import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

test('renders header text "Task Tracker"', () => {
    render(<Header />);
    expect(screen.getByText(/Task Tracker/i)).toBeInTheDocument();
});

test('renders as an h1 heading', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1, name: /Task Tracker/i });
    expect(heading).toBeInTheDocument();
});