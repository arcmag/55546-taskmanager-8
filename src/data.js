import {util} from './util';

const TAGS_LIST = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const TITLES_LIST = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const COLORS_LIST = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const WEEK_DAYS = [
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`
];

const URL_PICTURE = `http://picsum.photos/100/100?r=`;

const MIN_COUNT_TAGS = 0;
const MAX_COUNT_TAGS = 3;

const getRandomBool = () => !!(Math.random() < 0.5);

const getRandomTags = () => {
  const countTags = util.getRandomInt(MIN_COUNT_TAGS, MAX_COUNT_TAGS);
  const copyTags = TAGS_LIST.slice();
  const tags = [];

  for (let i = 0; i < countTags; i++) {
    tags.push(copyTags.splice(util.getRandomInt(0, copyTags.length - 1), 1));
  }

  return tags;
};

const getRandomTitle = () => TITLES_LIST[util.getRandomInt(0, TITLES_LIST.length - 1)];
const getRandomColor = () => TITLES_LIST[util.getRandomInt(0, COLORS_LIST.length - 1)];
const getRandomDate = () => Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
const getRandomPicture = () => URL_PICTURE + Math.random();

const createRandomTask = () => {
  return {
    title: getRandomTitle(),
    dueDate: getRandomDate(),
    tags: new Set(getRandomTags()),
    picture: getRandomPicture(),
    color: getRandomColor(),
    repeatingDays: WEEK_DAYS.reduce((res, day) => {
      res[day] = getRandomBool();
      return res;
    }, {}),
    isFavorite: getRandomBool(),
    isDone: getRandomBool()
  };
};

export {createRandomTask};
