import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: 'Пустая задача',
  };

  static propTypes = {
    onAddedItem: PropTypes.func,
  };

  static defaultProps = {
    onAddedItem: () => {},
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAddedItem(this.state.label);
    event.target.reset();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
        />
      </form>
    );
  }
}
