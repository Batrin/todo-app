import React from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from '../new-task-form';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer'

import './app.css';

const App = () => {
    const todoData = [
        { label: 'Drink Coffee', id: 1 },
        { label: 'Write some code', id: 2 },
        { label: 'Make smth awesome', id: 3 },
    ];


    
    return (
        <div className="todoapp">
            <AppHeader />
            <NewTaskForm />
            <section className="main">
                <TaskList todos = {todoData} />
            </section>
            <Footer/>
        </div>
    );
}

export default App;