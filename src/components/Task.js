import React from 'react';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <li
      className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default Task;

