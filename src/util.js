import {createRandomTask} from './data';
import {Task} from './task';
import {TaskEdit} from './task-edit';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const createTask = (data = createRandomTask()) => {
  return {
    taskComponent: new Task(data),
    editTaskComponent: new TaskEdit(data)
  };
};

const createTasksList = (numberTask) => {
  const tasksList = [];

  for (let i = 0; i < numberTask; i++) {
    tasksList.push(createTask());
  }

  return tasksList;
};

const renderTask = (container, task) => {
  task.taskComponent.onEdit = () => {
    task.editTaskComponent.render();
    container.replaceChild(task.editTaskComponent.element, task.taskComponent.element);
    task.taskComponent.unrender();
  };

  task.editTaskComponent.onSubmit = () => {
    task.taskComponent.render();
    container.replaceChild(task.taskComponent.element, task.editTaskComponent.element);
    task.editTaskComponent.unrender();
  };

  container.appendChild(task.taskComponent.render());
};

const renderTasksList = (container, tasksList) => {
  tasksList.forEach((it) => {
    renderTask(container, it);
  });
};

const util = {
  createElement,
  getRandomInt,
  getRandomFloat,
  createTask,
  createTasksList,
  renderTask,
  renderTasksList
};

export {util};
