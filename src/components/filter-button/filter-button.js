import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './filter-button.css';

export default class FilterButton extends Component {


    render() {
        const {buttonProps, onSelect} = this.props;

        let classNames = 'filter-button-item';

        const {name, selected, id} = buttonProps;

        if (selected) {
            classNames += ' selected';
        }

        return (
            <li className={classNames} onClick={() => onSelect(id)}>
                <button>{name}</button>
            </li>
        );
    }
}