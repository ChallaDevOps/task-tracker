import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock child components to focus tests on App's state/props wiring
jest.mock('./components/Header', () => () => <div>Mock Header</div>);

jest.mock('./components/AddTask', () => (props) => (
    <div>
        <button onClick={() => props.onAdd('New Task')}>Add Mock Task</button>
    </div>
));

jest.mock('./components/TaskList', () => (props) => (
    <div>
        <div data-testid="tasks">{JSON.stringify(props.tasks)}</div>
        {props.tasks && props.tasks[0] && (
            <div>
                <button onClick={() => props.onToggle(props.tasks[0].id)}>Toggle Mock</button>
                <button onClick={() => props.onDelete(props.tasks[0].id)}>Delete Mock</button>
            </div>
        )}
    </div>
));


test('renders header and starts with empty tasks', () => {
    render(<App />);
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByTestId('tasks').textContent).toBe('[]');
});

test('adds a task when AddTask calls onAdd', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Mock Task'));
    const tasks = JSON.parse(screen.getByTestId('tasks').textContent);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].text).toBe('New Task');
    expect(tasks[0].completed).toBe(false);
});

test('toggleTask flips completed flag', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Mock Task'));
    fireEvent.click(screen.getByText('Toggle Mock'));
    let tasks = JSON.parse(screen.getByTestId('tasks').textContent);
    expect(tasks[0].completed).toBe(true);
    // toggle back
    fireEvent.click(screen.getByText('Toggle Mock'));
    tasks = JSON.parse(screen.getByTestId('tasks').textContent);
    expect(tasks[0].completed).toBe(false);
});

test('deleteTask removes the task', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add Mock Task'));
    fireEvent.click(screen.getByText('Delete Mock'));
    const tasks = JSON.parse(screen.getByTestId('tasks').textContent);
    expect(tasks).toHaveLength(0);
});

