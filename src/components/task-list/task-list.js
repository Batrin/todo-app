import React from 'react';
import ReactDOM from 'react-dom';

import './task-list.css';
import Task from '../task';

const TaskList = ( {todos, onDeleted, onToggleDone, onEditItem } ) => {

    const todosElements = todos.map(item => {
        const id = item.id;

        return (
            <Task
                key={id}
                item={item}
                onDeleted={() => onDeleted(id)}
                onToggleDone={() => onToggleDone(id)}
                onEditItem={onEditItem}
            />
        );
    })

    return (
        <ul className="todo-list">
            {todosElements}
        </ul>
    );
}

export default TaskList;