import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: 'Пусто',
    minutes: 0,
    seconds: 0,
  };

  static propTypes = {
    onAddedItem: PropTypes.func,
  };

  static defaultProps = {
    onAddedItem: () => {},
  };

  onLabelChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { label, minutes, seconds } = this.state;
    const secondsForTask = minutes * 60 + Number(seconds);
    this.props.onAddedItem(label, secondsForTask);
    event.target.reset();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          name="label"
          className="new-todo"
          type="text"
          placeholder="Task"
          autoFocus
          onChange={this.onLabelChange}
        />
        <input
          name="minutes"
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onLabelChange}
        />
        <input
          name="seconds"
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onLabelChange}
        />
        <input type="submit" className="submit-button" />
      </form>
    );
  }
}
