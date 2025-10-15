import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from './TaskList';

// Mock Task before importing TaskList so TaskList receives the mocked version
jest.mock('./Task', () => {
    const React = require('react');  // require React here inside factory
    return {
        __esModule: true,
        default: ({ task, onDelete, onToggle }) =>
            React.createElement(
                'div',
                { 'data-testid': `task-${task.id}` },
                React.createElement('span', null, task.title),
                React.createElement(
                    'button',
                    {
                        'data-testid': `delete-${task.id}`,
                        onClick: () => onDelete(task.id),
                    },
                    'Delete'
                ),
                React.createElement(
                    'button',
                    {
                        'data-testid': `toggle-${task.id}`,
                        onClick: () => onToggle(task.id),
                    },
                    'Toggle'
                )
            ),
    };
});


afterEach(cleanup);

test('renders "No tasks to show." when tasks array is empty', () => {
    render(<TaskList tasks={[]} onDelete={jest.fn()} onToggle={jest.fn()} />);
    expect(screen.getByText(/No tasks to show\./i)).toBeInTheDocument();
});

test('renders a list with Task components for each task', () => {
    const tasks = [
        { id: '1', title: 'First Task' },
        { id: '2', title: 'Second Task' },
    ];
    render(<TaskList tasks={tasks} onDelete={jest.fn()} onToggle={jest.fn()} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    expect(screen.getByTestId('task-1')).toHaveTextContent('First Task');
    expect(screen.getByTestId('task-2')).toHaveTextContent('Second Task');
});

test('passes onDelete and onToggle handlers down to Task components', () => {
    const handleDelete = jest.fn();
    const handleToggle = jest.fn();
    const tasks = [{ id: 'a', title: 'Alpha' }];

    render(
        <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
    );

    fireEvent.click(screen.getByTestId('delete-a'));
    expect(handleDelete).toHaveBeenCalledWith('a');

    fireEvent.click(screen.getByTestId('toggle-a'));
    expect(handleToggle).toHaveBeenCalledWith('a');
});