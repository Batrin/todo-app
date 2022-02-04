import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm( {onAddedItem} ){
  const [label, setLabelText] = useState('Пусто');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  function onSubmit(event){
    event.preventDefault();
    const secondsForTask = minutes * 60 + Number(seconds);
    onAddedItem(label, secondsForTask);
    event.target.reset();
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
      />
      <input
        name="minutes"
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(event) => { setMinutes(event.target.value) }}
      />
      <input
        name="seconds"
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(event) => {setSeconds(event.target.value)}}
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