import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './task-filter.css';

import FilterButton from '../filter-button';

export default class TaskFilter extends Component {


    render() {
        const {buttonArray ,onSelect} = this.props;

        const buttonObjArray = buttonArray.map(el => {
            return(
                <FilterButton
                    key={el.id}
                    buttonProps={el}
                    onSelect={onSelect}
                />
            );
        })

        return (
            <ul className="filters">
                {buttonObjArray}
            </ul>
        );
    }
}
