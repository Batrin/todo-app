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
    updateTaskTime: () => {},
  };

  static propTypes = {
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEditItem: PropTypes.func,
    item: PropTypes.instanceOf(Object),
    createTaskDate: PropTypes.instanceOf(Date),
    updateTaskTime: PropTypes.func,
  };

  state = {
    isNowEditing: false,
    inputText: this.props.item.label,
    currentDate: new Date(),
    playButtonDisabled: false,
    stopButtonDisabled: true,
  };

  interval = null;

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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

  startTimer = () => {
    const { updateTaskTime, item } = this.props;
    const { id } = item;
    this.interval = setInterval(() => updateTaskTime(id), 1000);
    this.setState({
      playButtonDisabled: true,
      stopButtonDisabled: false,
    });
  };

  formatTimerString = (time) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  stopTimer = () => {
    clearInterval(this.interval);
    this.setState({
      playButtonDisabled: false,
      stopButtonDisabled: true,
    });
  };

  render() {
    const { onDeleted, onToggleDone, item, createTaskDate } = this.props;
    const { label, done, seconds } = item;
    const { isNowEditing, inputText, currentDate, playButtonDisabled, stopButtonDisabled } = this.state;
    const minutesTimer = Math.floor(seconds / 60);
    const secondsTimer = seconds % 60;

    let classNames = 'todo-list-item';
    let isChecked = false;

    if (done) {
      classNames += ' completed';
      isChecked = true;
    }

    if (isNowEditing) {
      classNames += ' editing';
    }

    if (seconds === 0) {
      clearInterval(this.interval);
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={isChecked} />
          <label>
            <span className="description">{label}</span>
            <div className="timer-control">
              <button
                disabled={playButtonDisabled}
                className="timer-button icon-play"
                type="button"
                aria-label="test"
                onClick={this.startTimer}
              />
              <button
                disabled={stopButtonDisabled}
                className="timer-button icon-pause"
                type="button"
                aria-label="test"
                onClick={this.stopTimer}
              />
              <p className="task-time">
                {this.formatTimerString(minutesTimer)}:{this.formatTimerString(secondsTimer)}
              </p>
            </div>
            <span className="created">created {formatDistance(createTaskDate, currentDate)} ago</span>
            <button className="icon icon-edit" onClick={this.showEditForm} type="button" aria-label="edit-element" />
            <button className="icon icon-destroy" onClick={onDeleted} aria-label="destroy-element" type="button" />
          </label>
        </div>
        <form onSubmit={this.onSubmitEditForm}>
          <input className="edit" type="text" value={inputText} onChange={this.onEditInputChange} />
        </form>
      </li>
    );
  }
}
