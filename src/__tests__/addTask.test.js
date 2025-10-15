import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AddTask from '../components/AddTask';

// Behaviors covered:
// 1) Calls onAdd with input text when clicking Add
// 2) Does not call onAdd when input is empty
// 3) Does not call onAdd when input is whitespace-only
// 4) Clears the input after successful submit
// 5) Updates input value as the user types
// 6) Submits via form submit (simulate Enter) and calls onAdd once
// 7) Passes original input including surrounding whitespace to onAdd

describe('AddTask', () => {
  test('calls onAdd with input text when clicking Add', () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('Test Task');
  });

  test('does not call onAdd when input is empty', () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);

    // input remains empty by default
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  test('does not call onAdd when input is whitespace-only', () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  test('clears the input after successful submit', () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Clear Me' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith('Clear Me');
    expect(input).toHaveValue('');
  });

  test('updates input value as the user types', () => {
    render(<AddTask onAdd={jest.fn()} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Typing...' } });

    expect(input).toHaveValue('Typing...');
  });

  test('submits via form submit and calls onAdd once', () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'Submit via Enter' } });
    fireEvent.submit(form);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('Submit via Enter');
  });

  test('passes original input including surrounding whitespace to onAdd', () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: '  padded  ' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // Component checks .trim() only to prevent empty submission,
    // but forwards the original text (including spaces) to onAdd.
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('  padded  ');
  });
});
