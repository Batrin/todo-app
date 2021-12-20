import React from 'react';
import ReactDOM from 'react-dom';

import './new-task-form.css';

const NewTaskForm = () => {
    return <input className="new-todo" type="text" placeholder="What needs to be done?" autoFocus/>
}

export default NewTaskForm;