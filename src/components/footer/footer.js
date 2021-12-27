import React from 'react';
import ReactDOM from 'react-dom';

import './footer.css';

import TaskFilter from '../task-filter';

const Footer = ({done, onSelect, buttonArray, deleteCompleted}) => {

    return (
        <div className="footer">
            <span className="todo-count">{done} items left</span>
            <TaskFilter
                buttonArray={buttonArray}
                onSelect={onSelect}
            />
            <button
                className="clear-completed"
                onClick={deleteCompleted}>
                Clear completed
            </button>
        </div>
    );
}

export default Footer;