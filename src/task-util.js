import {createRandomTask} from './data';
import {updateFiltersList} from './filter-util';
import Task from './task';
import TaskEdit from './task-edit';
import BackendAPI from './backend-api';

const StatusEditForm = {
  SUBMIT: `submit`,
  DELETE: `delete`
};

const HIDDEN_CLASS = `visually-hidden`;

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;

const api = new BackendAPI({endPoint: END_POINT, authorization: AUTHORIZATION});

const tasksContainer = document.querySelector(`.board__tasks`);
tasksContainer.innerHTML = ``;

const boardNoTasks = document.querySelector(`.board__no-tasks`);
boardNoTasks.classList.remove(HIDDEN_CLASS);
boardNoTasks.innerHTML = `Loading tasks...`;

const createDataTasksList = (numberTask) => {
  const dataTasks = [];

  for (let i = 0; i < numberTask; i++) {
    dataTasks.push(createRandomTask());
  }

  return dataTasks;
};

const createTasksList = (dataTasksList) => dataTasksList.map((it) => createTask(it));

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

    api.updateTask({id: task._id, data: task.toRAW()})
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
    api.deleteTask({id: task._id})
      .then(() => api.getTasks())
      .then(() => {
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

const taskDelete = (delTask) => {
  for (let i = 0, l = tasksList.length; i < l; i++) {
    const task = tasksList[i];

    if (task === delTask) {
      tasksList.splice(i, 1);
      return;
    }
  }
};

const renderTask = (task) => tasksContainer.appendChild(task.render());

const renderTasksList = (tasksList) => tasksList.forEach((it) => renderTask(it));

let tasksList = [];

api.getTasks()
  .then((tasks) => {
    boardNoTasks.classList.add(HIDDEN_CLASS);
    tasksList = createTasksList(tasks);
    renderTasksList(tasksList);
    updateFiltersList();
  })
  .catch(() => {
    boardNoTasks.innerHTML = `Something went wrong while loading your tasks. Check your connection or try again later`;
  });

export {
  tasksList,
  createDataTasksList,
  createTask,
  createTasksList,
  renderTask,
  renderTasksList,
  taskDelete
};
