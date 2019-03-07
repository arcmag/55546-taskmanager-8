import {util} from './util';
import {renderFiltersList} from './filter';

renderFiltersList();

const tasksContainer = document.querySelector(`.board__tasks`);

tasksContainer.innerHTML = ``;
util.renderTask(tasksContainer, util.createTask());
