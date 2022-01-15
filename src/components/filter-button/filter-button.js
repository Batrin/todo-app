import React from 'react';

import './filter-button.css';
import PropTypes from 'prop-types';

function FilterButton({ buttonProps, onSelect }) {
  let classNames = 'filter-button-item';

  const { name, selected, id } = buttonProps;

  if (selected) {
    classNames += ' selected';
  }

  return (
    <li className={classNames}>
      <button onClick={() => onSelect(id)} type="button">
        {name}
      </button>
    </li>
  );
}

FilterButton.defaultProps = {
  buttonProps: {
    name: '',
    selected: false,
    id: Math.random(),
  },
  onSelect: () => {},
};

FilterButton.propTypes = {
  buttonProps: PropTypes.instanceOf(Object),
  onSelect: PropTypes.func,
};

export default FilterButton;
