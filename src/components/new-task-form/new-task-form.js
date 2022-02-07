import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm( {onAddedItem} ){
  const [label, setLabelText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  function resetAllInputs() {
    setLabelText('');
    setMinutes('');
    setSeconds('');
  }

  function onSubmit(event){
    event.preventDefault();
    const secondsForTask = minutes * 60 + Number(seconds);
    onAddedItem(label, secondsForTask);
    resetAllInputs();
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        name="label"
        className="new-todo"
        type="text"
        placeholder="Task"
        autoFocus
        onChange={(event) => { setLabelText(event.target.value) }}
        value={label}
      />
      <input
        name="minutes"
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(event) => { setMinutes(event.target.value) }}
        value={minutes}
      />
      <input
        name="seconds"
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(event) => {setSeconds(event.target.value)}}
        value={seconds}
      />
      <input type="submit" className="submit-button" />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddedItem: PropTypes.func,
};

NewTaskForm.defaultProps = {
  onAddedItem: () => {},
};

export default NewTaskForm;