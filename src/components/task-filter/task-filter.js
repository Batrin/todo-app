import React from 'react';

import './task-filter.css';

import PropTypes from 'prop-types';
import FilterButton from '../filter-button';

function TaskFilter({ buttonArray, onSelect }) {
  const buttonObjArray = buttonArray.map((el) => <FilterButton key={el.id} buttonProps={el} onSelect={onSelect} />);

  return <ul className="filters">{buttonObjArray}</ul>;
}

TaskFilter.defaultProps = {
  buttonArray: [],
  onSelect: () => {},
};

TaskFilter.propTypes = {
  buttonArray: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

export default TaskFilter;
