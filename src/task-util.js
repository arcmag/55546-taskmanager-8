import {updateFiltersList} from './filter-util';
import Task from './task';
import TaskEdit from './task-edit';
import BackendAPI from './backend-api';

import Store from './store';
import Provider from './provider';

const StatusEditForm = {
  SUBMIT: `submit`,
  DELETE: `delete`
};

const HIDDEN_CLASS = `visually-hidden`;

const AUTHORIZATION_NUMBER = 3571239485124;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${AUTHORIZATION_NUMBER}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;
const TASKS_STORE_KEY = `tasks-store-key`;

const api = new BackendAPI({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: TASKS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => String(Date.now())});

const tasksContainer = document.querySelector(`.board__tasks`);
tasksContainer.innerHTML = ``;

const boardNoTasks = document.querySelector(`.board__no-tasks`);
boardNoTasks.classList.remove(HIDDEN_CLASS);
boardNoTasks.innerHTML = `Loading tasks...`;

const createTasksList = (dataTasksList) => dataTasksList.map((it) => createTask(it));

const taskDelete = (delTask) => {
  for (let i = 0, l = tasksList.length; i < l; i++) {
    if (tasksList[i] === delTask) {
      return tasksList.splice(i, 1);
    }
  }

  return false;
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
    taskEdit.disabledForm(StatusEditForm.SUBMIT);

    provider.updateTask({id: task._id, data: task.toRAW()})
      .then(() => {
        task.render();
        tasksContainer.replaceChild(task.element, taskEdit.element);
        taskEdit.unrender();
      })
      .catch(() => {
        taskEdit.includedForm(StatusEditForm.SUBMIT);
      });
  };

  taskEdit.onDelete = () => {
    taskEdit.disabledForm(StatusEditForm.DELETE);

    provider.deleteTask({id: task._id}).then(() => {
      taskEdit.element.remove();
      taskEdit.unrender();
      taskDelete(task);
      updateFiltersList();
    })
    .catch(() => {
      taskEdit.includedForm(StatusEditForm.DELETE);
    });
  };

  return task;
};

const renderTask = (task) => tasksContainer.appendChild(task.render());

const renderTasksList = (tasksList) => tasksList.forEach((it) => renderTask(it));

let tasksList = [];

provider.getTasks()
  .then((tasks) => {
    boardNoTasks.classList.add(HIDDEN_CLASS);
    tasksList = createTasksList(tasks);
    renderTasksList(tasksList);
    updateFiltersList();
  })
  .catch(() => {
    boardNoTasks.innerHTML = `Something went wrong while loading your tasks. Check your connection or try again later`;
  });

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});

window.addEventListener(`online`, () => {
  provider.syncTasks();
  document.title = document.title.split(`[OFFLINE]`)[0];
});

export {
  tasksList,
  createTask,
  createTasksList,
  renderTask,
  renderTasksList,
  taskDelete
};
