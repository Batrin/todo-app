import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from '../new-task-form';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer'

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('DrinkCoffee'),
            this.createTodoItem('Make something awesome'),
            this.createTodoItem('Write some code')
        ],
        buttonArray: [
            {name: 'All', selected: true, id: 1},
            {name: 'Active', selected: false, id: 2},
            {name: 'Completed', selected: false, id: 3}
        ]
    }

    createTodoItem(label) {
        return {
            label,
            done: false,
            id: this.maxId++
        }
    }

    findTodoIndex = (id, array) => {
        return array.findIndex(el => el.id === id);
    }

    toggleItemProp = (sourceArray, itemId, prop) => {
        const oldItem = sourceArray[itemId];

        oldItem[prop] = !oldItem[prop];

        const newItem = {
            ...oldItem,
        }

        return [
            ...sourceArray.slice(0, itemId),
            newItem,
            ...sourceArray.slice(itemId + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState( ({ todoData }) => {
            const todoIndex = this.findTodoIndex(id, todoData);

            const newArray = this.toggleItemProp(todoData, todoIndex, 'done');

            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {

            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            }
        })
    }

    deleteItem = (id) => {
        this.setState( ({todoData}) => {
            const indexId = this.findTodoIndex(id, todoData);

            const newDataArray = [
                ...todoData.slice(0, indexId),
                ...todoData.slice(indexId + 1)
            ]

            return {
                todoData: newDataArray
            }
        })
    }

    onSelectFilter = (id) => {
        this.setState(({buttonArray}) => {
            const currSelectedIndex = buttonArray.findIndex(el => el.selected);
            const modifiedArr = this.toggleItemProp(
                buttonArray,
                currSelectedIndex,
                'selected'
            )

            const newSelectedIndex = buttonArray.findIndex(el => el.id === id);

            const finalArr = this.toggleItemProp(
                modifiedArr,
                newSelectedIndex,
                'selected'
            )

            return {
                buttonArray: finalArr
            }
        })
    }

    getActiveFilter = (buttonArr) => {
        return buttonArr.find(el => el.selected).name;
    }

    render() {
        const {todoData, buttonArray} = this.state;
        const doneCount = todoData
            .filter(el => el.done).length;

        const activeFilterName = this.getActiveFilter(buttonArray);

        let todoActiveData;

        switch (activeFilterName) {
            case 'Active':
                todoActiveData = todoData.filter(el => !el.done);
                break;
            case 'Completed':
                todoActiveData = todoData.filter(el => el.done);
                break;
            default:
                todoActiveData = todoData;
        }

        return (
            <div className="todoapp">
                <AppHeader />
                <NewTaskForm onAddedItem={this.addItem}/>
                <section className="main">
                    <TaskList
                        todos = {todoActiveData}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}/>
                </section>
                <Footer
                    done={doneCount}
                    buttonArray={this.state.buttonArray}
                    onSelect={this.onSelectFilter}
                />
            </div>
        );
    }
}
