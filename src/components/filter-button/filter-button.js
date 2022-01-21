import React from 'react';

import './filter-button.css';
import PropTypes from 'prop-types';

function FilterButton({ buttonProps, onSelect, isSelect }) {
  let classNames = 'filter-button-item';

  const { name } = buttonProps;

  if (isSelect) {
    classNames += ' selected';
  }

  return (
    <li className={classNames}>
      <button onClick={() => onSelect(name)} type="button">
        {name}
      </button>
    </li>
  );
}

FilterButton.defaultProps = {
  buttonProps: {
    name: '',
    id: Math.random(),
  },
  onSelect: () => {},
  isSelect: false,
};

FilterButton.propTypes = {
  buttonProps: PropTypes.instanceOf(Object),
  onSelect: PropTypes.func,
  isSelect: PropTypes.bool,
};

export default FilterButton;
