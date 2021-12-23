import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './task.css';

export default class Task extends Component {

    render() {

        const {label, onDeleted, onToggleDone, done} = this.props;

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' completed';
        }

        return (
            <li className={classNames}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        onChange={onToggleDone}
                    />
                    <label>
                        <span className="description">{label}</span>
                    </label>

                    <button className="icon icon-edit"></button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleted}>

                    </button>
                </div>
            </li>
        );
    }
}