import React from 'react';
import ReactDOM from 'react-dom';

import './task-list.css';
import Task from '../task';

const TaskList = ( {todos} ) => {

    const todosElements = todos.map(item => {
        const {id, ...itemProps} = item;

        return (
            <li key = {id}>
                <Task {...itemProps} />
            </li>
        );
    })

    return (
        <ul className="todo-list">
            {todosElements}
        </ul>
    );
}

export default TaskList;