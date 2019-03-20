import {createRandomTask, COLORS_LIST, TAGS_LIST} from './data';
import {getRandomInt} from './util';
import Filter from './filter';
import Task from './task';
import TaskEdit from './task-edit';
import moment from 'moment';
import flatpickr from 'flatpickr';
import Chart from 'chart.js';

const FILTERS_TYPES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const HIDDEN_CLASS = `visually-hidden`;

const MIN_COUNT_CARD = 10;
const MAX_COUNT_CARD = 30;

const tasksContainer = document.querySelector(`.board__tasks`);
const filtersContainer = document.querySelector(`.main__filter`);

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
    task.render();
    tasksContainer.replaceChild(task.element, taskEdit.element);
    taskEdit.unrender();
  };

  taskEdit.onDelete = () => {
    taskEdit.element.remove();
    taskEdit.unrender();
    taskDelete(task);
    updateFiltersList();
  };

  return task;
};

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

const closeAllContainer = () => allContainers.forEach((it) => it.classList.add(HIDDEN_CLASS));

const openTasksContainer = () => {
  closeAllContainer();
  taskContainer.classList.remove(HIDDEN_CLASS);
};

const openStatisticContainer = () => {
  closeAllContainer();
  statisticContainer.classList.remove(HIDDEN_CLASS);
  updateCharts();
};

const getDataTasksColors = () => {
  const labels = [];
  const colorsCount = {};

  COLORS_LIST.forEach((it) => {
    labels.push(`#` + it);
    colorsCount[it] = 0;
  });

  tasksList.forEach((it) => {
    colorsCount[it._color]++;
  });

  return {
    labels,
    datasets: {
      data: Object.values(colorsCount),
      backgroundColor: COLORS_LIST
    }
  };
};

const getDataTasksTags = () => {
  const labels = [];
  const tagsCount = {};

  TAGS_LIST.forEach((it) => {
    labels.push(`#` + it);
    tagsCount[it] = 0;
  });

  tasksList.forEach((it) => {
    it._tags.forEach((tag) => {
      tagsCount[tag]++;
    });
  });

  return {
    labels,
    data: Object.values(tagsCount)
  };
};

const createNewChart = (canvas, data) => new Chart(canvas, data);

const updateCharts = () => {
  const dataChartTasksColor = getDataTasksColors();
  const dataChartTasksTags = getDataTasksTags();

  createNewChart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: dataChartTasksTags.labels,
      datasets: [{
        data: dataChartTasksTags.data,
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${data.labels[tooltipItem.index]}(${tooltipData}) — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });

  createNewChart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: dataChartTasksColor.labels,
      datasets: [dataChartTasksColor.datasets]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${data.labels[tooltipItem.index]}(${tooltipData}) — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};

const tasksList = createTasksList(
    createDataTasksList(getRandomInt(MIN_COUNT_CARD, MAX_COUNT_CARD))
);

const filtersList = createFiltersList();

filtersContainer.innerHTML = ``;
tasksContainer.innerHTML = ``;

renderFiltersList(filtersList);
renderTasksList(tasksList);

const tasksBtn = document.querySelector(`#control__task`);
const statisticsBtn = document.querySelector(`#control__statistic`);

const taskContainer = document.querySelector(`.board.container`);
const statisticContainer = document.querySelector(`.statistic.container`);

const allContainers = [taskContainer, statisticContainer];

flatpickr(
    `.statistic__period-input`,
    {
      mode: `range`,
      altInput: true,
      altFormat: `Y-m-d`,
      dateFormat: `Y-m-d`,
      defaultDate: [`2019-03-01`, Date.now()]
    }
);

tasksBtn.addEventListener(`click`, openTasksContainer);
statisticsBtn.addEventListener(`click`, openStatisticContainer);

const ChartDataLabels = {};

[`.statistic__tags-wrap`, `.statistic__colors-wrap`].forEach((it) => {
  document.querySelector(it).classList.remove(HIDDEN_CLASS);
});

const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);
