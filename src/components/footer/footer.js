import React from 'react';
import ReactDOM from 'react-dom';

import './footer.css';

import TaskFilter from '../task-filter';

const Footer = () => {
    return (
        <div className="footer">
            <span className="todo-count">1 items left</span>
            <TaskFilter />
            <button className="clear-completed">Clear completed</button>
        </div>
    );
}

export default Footer;