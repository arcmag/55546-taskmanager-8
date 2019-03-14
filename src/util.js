import {createRandomTask} from './data';
import Task from './task';
import TaskEdit from './task-edit';

const tasksContainer = document.querySelector(`.board__tasks`);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const createDataTasksList = (numberTask) => {
  const dataTasksList = [];

  for (let i = 0; i < numberTask; i++) {
    dataTasksList.push(createRandomTask());
  }

  return dataTasksList;
};

const createTask = (data) => {
  const task = new Task(data);
  const taskEdit = new TaskEdit(data);

  task.onEdit = () => {
    taskEdit.render();
    tasksContainer.replaceChild(taskEdit.element, task.element);
    task.unrender();
  };

  taskEdit.onSubmit = (newData) => {
    task.update(newData);
    task.render();
    tasksContainer.replaceChild(task.element, taskEdit.element);
    taskEdit.unrender();
  };

  return {
    task,
    taskEdit
  };
};

const createTasksList = (dataTasksList) => dataTasksList.map((it) => createTask(it));

const renderTask = (dataTask) => {
  tasksContainer.appendChild(dataTask.task.render());
};

const renderTasksList = (tasksList) => {
  tasksList.forEach((it) => {
    renderTask(it);
  });
};

export {
  createElement,
  getRandomInt,
  getRandomFloat,
  createTask,
  createTasksList,
  renderTask,
  renderTasksList,
  createDataTasksList
};
