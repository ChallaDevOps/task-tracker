import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from './Task';

describe('Task component', () => {
    test('renders task text', () => {
        const task = { id: 1, text: 'Write tests', completed: false };
        const { getByText } = render(<Task task={task} onDelete={() => {}} onToggle={() => {}} />);
        expect(getByText('Write tests')).toBeInTheDocument();
    });

    test('applies success class and line-through style when completed', () => {
        const task = { id: 2, text: 'Done task', completed: true };
        const { getByText } = render(<Task task={task} onDelete={() => {}} onToggle={() => {}} />);
        const span = getByText('Done task');
        const li = span.closest('li');

        expect(li).toHaveClass('list-group-item');
        expect(li).toHaveClass('list-group-item-success');
        expect(span).toHaveStyle('text-decoration: line-through');
    });

    test('does not have success class or line-through when not completed', () => {
        const task = { id: 3, text: 'Open task', completed: false };
        const { getByText } = render(<Task task={task} onDelete={() => {}} onToggle={() => {}} />);
        const span = getByText('Open task');
        const li = span.closest('li');

        expect(li).toHaveClass('list-group-item');
        expect(li).not.toHaveClass('list-group-item-success');
        expect(span).toHaveStyle('text-decoration: none');
    });

    test('calls onToggle with task id on double click', () => {
        const task = { id: 4, text: 'Toggle me', completed: false };
        const onToggle = jest.fn();
        const { getByText } = render(<Task task={task} onDelete={() => {}} onToggle={onToggle} />);
        const li = getByText('Toggle me').closest('li');

        fireEvent.doubleClick(li);
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(4);
    });

    test('calls onDelete with task id when Delete button is clicked', () => {
        const task = { id: 5, text: 'Delete me', completed: false };
        const onDelete = jest.fn();
        const { getByText } = render(<Task task={task} onDelete={onDelete} onToggle={() => {}} />);
        const button = getByText('Delete');

        fireEvent.click(button);
        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith(5);
    });
});