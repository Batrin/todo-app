import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './new-task-form.css';

export default class NewTaskForm extends Component {

    state = {
        label: '',
        e: {}
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddedItem(this.state.label);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input className="new-todo"
                       type="text"
                       placeholder="What needs to be done?"
                       autoFocus
                       onChange={this.onLabelChange}
                />
            </form>
        );
    }
}
