import React from 'react';

import './task-filter.css';

import PropTypes from 'prop-types';
import FilterButton from '../filter-button';

function TaskFilter({ buttonArray, onSelect, selectedFilter }) {
  let isSelect = false;
  const buttonObjArray = buttonArray.map((el) => {
    if (el.name === selectedFilter) {
      isSelect = true;
    } else {
      isSelect = false;
    }
    return <FilterButton key={el.id} buttonProps={el} onSelect={onSelect} isSelect={isSelect} />;
  });

  return <ul className="filters">{buttonObjArray}</ul>;
}

TaskFilter.defaultProps = {
  buttonArray: [],
  onSelect: () => {},
  selectedFilter: '',
};

TaskFilter.propTypes = {
  buttonArray: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
  selectedFilter: PropTypes.string,
};

export default TaskFilter;
