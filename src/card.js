const START_COUNT_CARD = 7;
const MAX_COUNT_CARD = 20;

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
  'mo',
  'tu',
  'we',
  'th',
  'fr',
  'sa',
  'su'
];

const BOOLEANS_LIST = [
  true,
  false
];

const MAX_COUNT_TAGS = 3;

const boardTasksBlock = document.querySelector(`.board__tasks`);
boardTasksBlock.innerHTML = ``;

const getRandomBool = () => BOOLEANS_LIST[Math.floor(Math.random() * BOOLEANS_LIST.length)];

const getRandomTags = () => {
  const countTags = Math.round(Math.random() * MAX_COUNT_TAGS);
  const copyTags = TAGS_LIST.slice();
  const tags = [];

  for (let i = 0; i < countTags; i++) {
    tags.push(copyTags.splice(Math.floor(Math.random() * copyTags.length), 1));
  }

  return tags;
};

const getRandomTitle = () => TITLES_LIST[Math.floor(Math.random() * TITLES_LIST.length)];

const getRandomColor = () => COLORS_LIST[Math.floor(Math.random() * COLORS_LIST.length)];

const createRandomDataCard = () => {
  return {
    title: getRandomTitle(),
    dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    tags: new Set(getRandomTags()),
    picture: `http://picsum.photos/100/100?r=${Math.random()}.`,
    color: getRandomColor(),
    repeatingDays: WEEK_DAYS.reduce((res, day) => {
      res[day] = getRandomBool();
      return res;
    }, {}),
    isFavorite: getRandomBool(),
    isDone: getRandomBool()
  };
};

const renderCard = (dataCard) => {
  let tagsString = ``;
  let weekDaysString = ``;
  let colorsString = ``;

  WEEK_DAYS.forEach((it) => {
    const isChecked = dataCard.repeatingDays[it] ? `checked` : ``;

    weekDaysString += `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${it}-5"
        name="repeat"
        value="${it}" ${isChecked}/>
      <label class="card__repeat-day" for="repeat-${it}-5">${it}</label>`;
  });

  dataCard.tags.forEach((it) => {
    tagsString += `
      <span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="${it}" class="card__hashtag-hidden-input">
        <button type="button" class="card__hashtag-name">#${it}</button>
        <button type="button" class="card__hashtag-delete"> delete</button>
      </span>`;
  });

  COLORS_LIST.forEach((it) => {
    const isChecked = dataCard.color === it ? `checked` : ``;

    colorsString += `
    <input
      type="radio"
      id="color-${it}-5"
      class="card__color-input card__color-input--${it} visually-hidden"
      name="color"
      value="${it}" ${isChecked}/>
    <label for="color-${it}-5" class="card__color card__color--${it}">${it}</label>`;
  });

  const cardString = `
    <article class="card">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text"></textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="23 September" name="date" />
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days" disabled>
                  <div class="card__repeat-days-inner">
                    ${weekDaysString}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${tagsString}
                </div>

                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                </label>
              </div>
            </div>

            <label class="card__img-wrap card__img-wrap--empty">
              <input type="file" class="card__img-input visually-hidden" name="img" />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsString}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`;

  boardTasksBlock.insertAdjacentHTML('afterbegin', cardString);
};

const createCardsList = (number = Math.round(Math.random() * MAX_COUNT_CARD)) => {
  const cardList = [];

  for (let i = 0; i < number; i++) {
    cardList.push(createRandomDataCard());
  }

  return cardList;
};

const renderCardsList = (cardList) => {
  cardList.forEach((it) => {
    renderCard(it);
  });
};

export {renderCardsList, createCardsList, START_COUNT_CARD};
