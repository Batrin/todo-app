import React from 'react';

import './footer.css';

import PropTypes from 'prop-types';
import TaskFilter from '../task-filter';

function Footer({ done, onSelect, buttonArray, deleteCompleted, selectedFilter }) {
  return (
    <div className="footer">
      <span className="todo-count">{done} items left</span>
      <TaskFilter buttonArray={buttonArray} onSelect={onSelect} selectedFilter={selectedFilter} />
      <button type="button" className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </div>
  );
}

Footer.defaultProps = {
  done: 0,
  onSelect: () => {},
  buttonArray: [],
  deleteCompleted: () => {},
  selectedFilter: '',
};

Footer.propTypes = {
  done: PropTypes.number,
  onSelect: PropTypes.func,
  buttonArray: PropTypes.arrayOf(PropTypes.object),
  deleteCompleted: PropTypes.func,
  selectedFilter: PropTypes.string,
};

export default Footer;
