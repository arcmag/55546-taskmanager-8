import Filter from './filter';
import {tasksList, renderTasksList} from './task-util';
import moment from 'moment';

const FILTERS_TYPES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const tasksContainer = document.querySelector(`.board__tasks`);
const filtersContainer = document.querySelector(`.main__filter`);
filtersContainer.innerHTML = ``;

const filterTasks = (filterName) => {
  let result = tasksList;

  switch (filterName) {
    case `overdue`:
      result = tasksList.filter((it) => it._dueDate < Date.now());
      break;
    case `today`:
      result = tasksList.filter((it) => moment(it._dueDate).format(`DD`) === moment(Date.now()).format(`DD`));
      break;
    case `favorites`:
      result = tasksList.filter((it) => it._isFavorite);
      break;
    case `repeating`:
      result = tasksList.filter((it) => it._isRepeated());
      break;
    case `tags`:
      result = tasksList.filter((it) => [...it._tags].length > 0);
      break;
    case `archive`:
      result = tasksList.filter((it) => it._isDone);
      break;
  }

  return result;
};

const updateFiltersList = () => {
  filtersList.forEach((it) => {
    it.update(filterTasks(it._type).length);

    const oldFilter = it.element;
    it.unrender();
    filtersContainer.replaceChild(it.render(), oldFilter);
  });
};

const createFilter = (filterType) => {
  const filter = new Filter(filterType, filterTasks(filterType).length);

  filter.onFilter = () => {
    tasksContainer.innerHTML = ``;
    renderTasksList(filterTasks(filterType));
  };

  return filter;
};

const createFiltersList = () => FILTERS_TYPES.map((it) => createFilter(it));

const renderFilter = (filter) => filtersContainer.appendChild(filter.render());

const renderFiltersList = (filtersList) => filtersList.forEach((it) => renderFilter(it));

const filtersList = createFiltersList();

export {
  filtersList,
  filterTasks,
  updateFiltersList,
  createFilter,
  createFiltersList,
  renderFilter,
  renderFiltersList
};
