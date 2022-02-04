import React, { useState } from 'react';

import NewTaskForm from '../new-task-form';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default function App() {
  const buttonArray = [
    { name: 'All', id: 1 },
    { name: 'Active', id: 2 },
    { name: 'Completed', id: 3 },
  ];

  const [todoData, setTodoData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const findTodoIndex = (id, array) => array.findIndex((el) => el.id === id);

  const toggleItemProp = (sourceArray, itemId, prop) => {
    const oldItem = sourceArray[itemId];

    oldItem[prop] = !oldItem[prop];

    const newItem = {
      ...oldItem,
    };

    return [...sourceArray.slice(0, itemId), newItem, ...sourceArray.slice(itemId + 1)];
  }

  const onToggleDone = (id) => {
    setTodoData(todos => {
      const todoIndex = findTodoIndex(id, todos);
      const newArray = toggleItemProp(todos, todoIndex, 'done');
      return newArray;
    });
  };

  const createTodoItem = (label, seconds) => {
    const newItem = {
      label,
      done: false,
      createTaskDate: new Date().getTime(),
      id: Math.random() * 15000000,
      seconds,
    };
    return newItem;
  }

  const addItem = (text, seconds) => {
    setTodoData(todos => {
      const newItem = createTodoItem(text, seconds);
      const newArr = [...todos, newItem];
      return newArr;
    });
  };

  const deleteItem = (id) => {
    setTodoData(todos => {
      const indexId = findTodoIndex(id, todos);
      const newDataArray = [...todos.slice(0, indexId), ...todos.slice(indexId + 1)];
      return newDataArray;
    });
  };

  const deleteCompleted = () => {

    setTodoData(todos => {
      const notCompletedTodos = todos.filter((el) => !el.done);
      return notCompletedTodos;
    });
  };

  const onEditItem = (id, newText) => {
    setTodoData(todos => {
      const newItemIndex = findTodoIndex(id, todos);
      const newItem = todos[newItemIndex];

      newItem.label = newText;
      const newTodoData = [...todos.slice(0, newItemIndex), newItem, ...todos.slice(newItemIndex + 1)];
      return newTodoData;
    });
  };

  const updateTaskTime = (idTask) => {
    setTodoData(todos => {
      const todoIndex = findTodoIndex(idTask, todos);
      const newTodoItem = todos[todoIndex];

      newTodoItem.seconds -= 1;

      const newTodoData = [...todos.slice(0, todoIndex), newTodoItem, ...todos.splice(todoIndex + 1)];
      return newTodoData;
    });
  };

  const onSelectFilter = (name) => {
    setSelectedFilter(name);
  };

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
      <NewTaskForm onAddedItem={addItem} />
      <section className="main">
        <TaskList
          todos={todoActiveData}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEditItem={onEditItem}
          updateTaskTime={updateTaskTime}
        />
      </section>
      <Footer
        done={doneCount}
        buttonArray={buttonArray}
        onSelect={onSelectFilter}
        deleteCompleted={deleteCompleted}
        selectedFilter={selectedFilter}
      />
    </div>
  );
}