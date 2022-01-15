import React from 'react';

import './task-list.css';
import PropTypes from 'prop-types';
import Task from '../task';

function TaskList({ todos, onDeleted, onToggleDone, onEditItem }) {
  const todosElements = todos.map((item) => {
    const { id } = item;

    return (
      <Task
        key={id}
        item={item}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEditItem={onEditItem}
      />
    );
  });

  return <ul className="todo-list">{todosElements}</ul>;
}

TaskList.defaultProps = {
  onDeleted: () => {},
  todos: [],
  onToggleDone: () => {},
  onEditItem: () => {},
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object),
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
};

export default TaskList;
