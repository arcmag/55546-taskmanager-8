import {tasksList} from './task-util';
import {COLORS_LIST, TAGS_LIST} from './data';
import Chart from 'chart.js';
import moment from 'moment';
import flatpickr from 'flatpickr';

const HIDDEN_CLASS = `visually-hidden`;

const chartLabelFn = (tooltipItem, data) => {
  const allData = data.datasets[tooltipItem.datasetIndex].data;
  const tooltipData = allData[tooltipItem.index];
  const total = allData.reduce((acc, it) => acc + parseFloat(it));
  const tooltipPercentage = Math.round((tooltipData / total) * 100);
  return `${data.labels[tooltipItem.index]}(${tooltipData}) — ${tooltipPercentage}%`;
};

const createDataChart = (data, titleText) => {
  return {
    plugins: [{}],
    type: `pie`,
    data,
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: chartLabelFn
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
        text: titleText,
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
  };
};

const getDataTasksColors = () => {
  const labels = [];
  const colorsCount = {};
  const dateFirst = selectDateStatsistics.selectedDates[0];
  const dateLast = selectDateStatsistics.selectedDates[1] || Date.now();

  COLORS_LIST.forEach((it) => {
    labels.push(`#` + it);
    colorsCount[it] = 0;
  });

  tasksList.
    filter((it) =>
      it._dueDate >= dateFirst && it._dueDate <= dateLast).
    forEach((it) => {
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
  const dateFirst = selectDateStatsistics.selectedDates[0];
  const dateLast = selectDateStatsistics.selectedDates[1] || Date.now();

  TAGS_LIST.forEach((it) => {
    labels.push(`#` + it);
    tagsCount[it] = 0;
  });

  tasksList.
    filter((it) =>
      it._dueDate >= dateFirst && it._dueDate <= dateLast).
    forEach((it) => {
      it._tags.forEach((tag) => {
        tagsCount[tag]++;
      });
    });

  return {
    labels,
    data: Object.values(tagsCount)
  };
};

const updateCharts = () => {
  const dataChartTasksColor = getDataTasksColors();
  const dataChartTasksTags = getDataTasksTags();

  chartTags.data.datasets[0].data = dataChartTasksTags.data;
  chartColors.data.datasets[0].data = dataChartTasksColor.datasets.data;

  chartTags.update();
  chartColors.update();
};

const _onInputDateChange = () => {
  updateCharts();
};

const inputDate = document.querySelector(`.statistic__period-input`);
inputDate.addEventListener(`change`, _onInputDateChange);

const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);

const selectDateStatsistics = flatpickr(
    inputDate,
    {
      mode: `range`,
      altInput: true,
      altFormat: `Y-m-d`,
      dateFormat: `Y-m-d`,
      defaultDate: [
        moment(Date.now()).startOf(`week`).format(`YYYY-MM-DD`),
        moment(Date.now()).startOf(`week`).add(`day`, 6).format(`YYYY-MM-DD`)
      ]
    }
);

const dataChartTasksColor = getDataTasksColors();
const dataChartTasksTags = getDataTasksTags();

[`.statistic__tags-wrap`, `.statistic__colors-wrap`].forEach((it) => {
  document.querySelector(it).classList.remove(HIDDEN_CLASS);
});

const chartTags = new Chart(tagsCtx, createDataChart({
  labels: dataChartTasksTags.labels,
  datasets: [{
    data: dataChartTasksTags.data,
    backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
  }]
}, `DONE BY: TAGS`));

const chartColors = new Chart(colorsCtx, createDataChart({
  labels: dataChartTasksColor.labels,
  datasets: [dataChartTasksColor.datasets]
}, `DONE BY: COLORS`));

export {updateCharts};
