import Component from './component';
import flatpickr from 'flatpickr';
import moment from 'moment';

const Color = {
  blue: `card--blue`,
  black: `card--black`,
  yellow: `card--yellow`,
  green: `card--green`,
  pink: `card--pink`,
};

export default class TaskEdit extends Component {
  constructor(data) {
    super();

    this._id = data.id;

    this._title = data.title;
    this._dueDate = data.dueDate;
    this._date = new Date(data.dueDate);
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._state.isDate = false;
    this._state.isRepeated = false;

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);

    this._state.isDate = false;
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this.uncache();
    this._partialUpdate();
    this.cache();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this.uncache();
    this._partialUpdate();
    this.cache();
    this.bind();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    const date = moment(this._dueDate);

    const tagsString = [...this._tags].map((it) => {
      return `
        <span class="card__hashtag-inner">
          <input type="hidden" name="hashtag" value="${it}" class="card__hashtag-hidden-input">
          <button type="button" class="card__hashtag-name">#${it}</button>
          <button type="button" class="card__hashtag-delete"> delete</button>
        </span>`.trim();
    }).join(``);

    const weekDaysString = Object.keys(this._repeatingDays).map((it) => {
      return `
        <input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${it}-${this._id}"
          name="repeat"
          value="${it}" ${!this._repeatingDays[it] ? `` : `checked`}/>
        <label class="card__repeat-day" for="repeat-${it}-${this._id}">${it}</label>`.trim();
    }).join(``);

    const colorsString = Object.keys(Color).map((it) => {
      return `
        <input
          type="radio"
          id="color-${it}-${this._id}"
          class="card__color-input
          card__color-input--${it}
          visually-hidden"
          name="color"
          value="${it}" ${it !== this._color ? `` : `checked`}/>
        <label for="color-${it}-${this._id}" class="card__color card__color--${it}">${it}</label>`.trim();
    }).join(``);

    return `
    <article class="card card--edit ${Color[this._color]} ${this._isRepeated() ? `card--repeat` : ``}">
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
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" value="${date.format(`DD MMMM`)}" name="date" />
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" value="${date.format(`HH:mm`)} PM" name="time" />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
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
    </article>`.trim();
  }

  cache() {
    this._form = this._element.querySelector(`.card__form`);
    this._deadlineToggle = this._element.querySelector(`.card__date-deadline-toggle`);
    this._repeatToggle = this._element.querySelector(`.card__repeat-toggle`);
  }

  uncache() {
    this._form = null;
    this._deadlineToggle = null;
    this._repeatToggle = null;
  }

  bind() {
    this._form.addEventListener(`submit`, this._onSubmitButtonClick);
    this._deadlineToggle.addEventListener(`click`, this._onChangeDate);
    this._repeatToggle.addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(
          `.card__date`,
          {
            altInput: true,
            altFormat: `j F`,
            dateFormat: `j F`
          }
      );

      flatpickr(
          `.card__time`,
          {
            enableTime: true,
            noCalendar: true,
            altInput: true,
            altFormat: `h:i K`,
            dateFormat: `h:i K`
          }
      );

    }
  }

  unbind() {
    this._form.removeEventListener(`submit`, this._onSubmitButtonClick);
    this._deadlineToggle.removeEventListener(`click`, this._onChangeDate);
    this._repeatToggle.removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => target.dueDate[value]
    };
  }
}
