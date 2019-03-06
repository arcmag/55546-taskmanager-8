import {renderFiltersList} from './filter';
import {createRandomTask} from './data';
import {Task} from './task';
import {TaskEdit} from './task-edit';

renderFiltersList();

const task = createRandomTask();

const tasksContainer = document.querySelector(`.board__tasks`);
const taskComponent = new Task(task);
const editTaskComponent = new TaskEdit(task);

tasksContainer.appendChild(taskComponent.render());

taskComponent.onEdit = () => {
  editTaskComponent.render();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unrender();
};

editTaskComponent.onSubmit = () => {
  taskComponent.render();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unrender();
};
