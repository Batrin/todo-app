import React from 'react';
import ReactDOM from 'react-dom';

import './task-list.css';
import Task from '../task';

const TaskList = ( {todos, onDeleted, onToggleDone } ) => {

    const todosElements = todos.map(item => {
        const {id, ...itemProps} = item;
        
        return (
            <Task
                key={id}
                {...itemProps}
                onDeleted={() => onDeleted(id)}
                onToggleDone={() => onToggleDone(id)}
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