import React, { Component } from 'react';

import './task.css';

import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';

export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onEditItem: () => {},
    item: {},
    createTaskDate: new Date(),
  };

  static propTypes = {
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEditItem: PropTypes.func,
    item: PropTypes.instanceOf(Object),
    createTaskDate: PropTypes.instanceOf(Date),
  };

  state = {
    isNowEditing: false,
    inputText: this.props.item.label,
    currentDate: new Date(),
  };

  showEditForm = () => {
    this.setState(({ isNowEditing }) => ({
      isNowEditing: !isNowEditing,
    }));
  };

  onEditInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  onSubmitEditForm = (event) => {
    event.preventDefault();
    this.props.onEditItem(this.props.item.id, this.state.inputText);
    this.setState(({ isNowEditing }) => ({
      isNowEditing: !isNowEditing,
    }));
  };

  render() {
    const { onDeleted, onToggleDone, item, createTaskDate } = this.props;
    const { label, done } = item;
    const { isNowEditing, inputText, currentDate } = this.state;

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
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={isChecked} />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {formatDistance(createTaskDate, currentDate)} ago</span>
          </label>

          <button className="icon icon-edit" onClick={this.showEditForm} type="button" aria-label="edit-element" />
          <button className="icon icon-destroy" onClick={onDeleted} aria-label="destroy-element" type="button" />
        </div>
        <form onSubmit={this.onSubmitEditForm}>
          <input className="edit" type="text" value={inputText} onChange={this.onEditInputChange} />
        </form>
      </li>
    );
  }
}
