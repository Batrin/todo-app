import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from '../new-task-form';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer'

import './app.css';

export default class App extends Component {

    state = {
        todoData: [
            { label: 'Drink Coffee', id: 1 },
            { label: 'Write some code', id: 2 },
            { label: 'Make smth awesome', id: 3 },
        ]
    }

    deleteItem = (id) => {
        this.setState( ({todoData}) => {
            const indexId = todoData.findIndex(el => el.id === id);

            const newDataArray = [
                ...todoData.slice(0, indexId),
                ...todoData.slice(indexId + 1)
            ]

            return {
                todoData: newDataArray
            }
        })
    }

    render() {
        return (
            <div className="todoapp">
                <AppHeader />
                <NewTaskForm />
                <section className="main">
                    <TaskList
                        todos = {this.state.todoData}
                        onDeleted={(id) => this.deleteItem(id) }/>
                </section>
                <Footer/>
            </div>
        );
    }
}
