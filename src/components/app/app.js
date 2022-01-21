import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [],
    selectedFilter: 'All',
  };

  buttonArray = [
    { name: 'All', id: 1 },
    { name: 'Active', id: 2 },
    { name: 'Completed', id: 3 },
  ];

  findTodoIndex = (id, array) => array.findIndex((el) => el.id === id);

  toggleItemProp = (sourceArray, itemId, prop) => {
    const oldItem = sourceArray[itemId];

    oldItem[prop] = !oldItem[prop];

    const newItem = {
      ...oldItem,
    };

    return [...sourceArray.slice(0, itemId), newItem, ...sourceArray.slice(itemId + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const todoIndex = this.findTodoIndex(id, todoData);

      const newArray = this.toggleItemProp(todoData, todoIndex, 'done');

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const indexId = this.findTodoIndex(id, todoData);

      const newDataArray = [...todoData.slice(0, indexId), ...todoData.slice(indexId + 1)];

      return {
        todoData: newDataArray,
      };
    });
  };

  onSelectFilter = (name) => {
    this.setState({
      selectedFilter: name,
    });
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const notCompletedTodos = todoData.filter((el) => !el.done);

      return {
        todoData: notCompletedTodos,
      };
    });
  };

  onEditItem = (id, newText) => {
    this.setState(({ todoData }) => {
      const newItemIndex = this.findTodoIndex(id, todoData);
      const newItem = todoData[newItemIndex];

      newItem.label = newText;

      const newTodoData = [...todoData.slice(0, newItemIndex), newItem, ...todoData.slice(newItemIndex + 1)];

      return {
        todoData: newTodoData,
      };
    });
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      createTaskDate: new Date().getTime(),
      id: (this.maxId += 1),
    };
  }

  render() {
    const { todoData, selectedFilter } = this.state;
    const doneCount = todoData.filter((el) => !el.done).length;

    let todoActiveData = [];

    switch (selectedFilter) {
      case 'Active':
        todoActiveData = todoData.filter((el) => !el.done);
        break;
      case 'Completed':
        todoActiveData = todoData.filter((el) => el.done);
        break;
      default:
        todoActiveData = [...todoData];
    }

    return (
      <div className="todoapp">
        <AppHeader />
        <NewTaskForm onAddedItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={todoActiveData}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditItem={this.onEditItem}
          />
        </section>
        <Footer
          done={doneCount}
          buttonArray={this.buttonArray}
          onSelect={this.onSelectFilter}
          deleteCompleted={this.deleteCompleted}
          selectedFilter={selectedFilter}
        />
      </div>
    );
  }
}
