import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './task.css';

export default class Task extends Component {

    state = {
        isNowEditing: false,
        inputText: this.props.item.label
    }

    showEditForm = () => {
        this.setState(({isNowEditing}) => {
            return {
                isNowEditing: !isNowEditing
            }
        })
    }

    onEditInputChange = (e) => {
        this.setState({
            inputText: e.target.value
        })
    }

    onSubmitEditForm = (e) => {
        e.preventDefault();
        this.props.onEditItem(this.props.item.id, this.state.inputText);
        this.setState(({isNowEditing}) => {
            return {
                isNowEditing: !isNowEditing
            }
        })
    }

    render() {

        const {onDeleted, onToggleDone, onEditItem, item} = this.props;
        const {label, done, id} = item;
        let {isNowEditing, inputText} = this.state;

        let classNames = 'todo-list-item';
        let isChecked = false;

        if (done) {
            classNames += ' completed';
            isChecked = true;
        }
        
        if (isNowEditing) {
            classNames += ' editing';
        }
        
        return (
            <li className={classNames}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        onChange={onToggleDone}
                        checked={isChecked}
                    />
                    <label>
                        <span className="description">{label}</span>
                    </label>

                    <button
                        className="icon icon-edit"
                        onClick={this.showEditForm}>
                    </button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleted}>
                    </button>
                </div>
                <form onSubmit={this.onSubmitEditForm}>
                    <input
                        className="edit"
                        type="text"
                        value={inputText}
                        onChange={this.onEditInputChange}
                    />
                </form>
            </li>
        );
    }
}