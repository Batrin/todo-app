import React, { useState, useEffect } from 'react';

import './task.css';

import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';

function Task( {onDeleted, onToggleDone, onEditItem, item, createTaskDate, updateTaskTime} ) {
  const { label, done, seconds } = item;
  const minutesTimer = Math.floor(seconds / 60);
  const secondsTimer = seconds % 60;

  const [isNowEditing, setNowEditing] = useState(false);
  const [inputText, setInputText] = useState(item.label);
  const [currentDate] = useState(new Date());
  const [playButtonIsDisabled, setPlayButtonState] = useState(false);
  const [stopButtonIsDisabled, setStopButtonState] = useState(true);
  const [interval, setTimerInterval] = useState(null);

  useEffect(() => {
    const clearInt = () => {
      clearInterval(interval);
    }
    return clearInt;
  }, [interval]);

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
    clearInterval(interval);
  }

  const formatTimerString = (time) => (String(time).length === 1 ? `0${time}` : `${time}`);

  const onSubmitEditForm = (event) => {
    event.preventDefault();
    onEditItem(item.id, inputText);
    setNowEditing(false);
  }

  const startTimer = () => {
    setTimerInterval(setInterval(() => updateTaskTime(item.id), 1000));
    setPlayButtonState(true);
    setStopButtonState(false);
  }

  const stopTimer = () => {
    clearInterval(interval);
    setPlayButtonState(false);
    setStopButtonState(true);
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleDone} checked={isChecked} />
        <label>
          <span className="description">{label}</span>
          <div className="timer-control">
            <button
              disabled={playButtonIsDisabled}
              className="timer-button icon-play"
              type="button"
              aria-label="test"
              onClick={startTimer}
            />
            <button
              disabled={stopButtonIsDisabled}
              className="timer-button icon-pause"
              type="button"
              aria-label="test"
              onClick={stopTimer}
            />
            <p className="task-time">
              {formatTimerString(minutesTimer)}:{formatTimerString(secondsTimer)}
            </p>
          </div>
          <span className="created">created {formatDistance(createTaskDate, currentDate)} ago</span>
          <button className="icon icon-edit" onClick={() => setNowEditing(true)} type="button" aria-label="edit-element" />
          <button className="icon icon-destroy" onClick={onDeleted} aria-label="destroy-element" type="button" />
        </label>
      </div>
      <form onSubmit={onSubmitEditForm}>
        <input className="edit" type="text" value={inputText} onChange={(event) => {setInputText(event.target.value)}} />
      </form>
    </li>
  );
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditItem: () => {},
  item: {},
  createTaskDate: new Date(),
  updateTaskTime: () => {},
};

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
  item: PropTypes.instanceOf(Object),
  createTaskDate: PropTypes.instanceOf(Date),
  updateTaskTime: PropTypes.func,
};

export default Task;


