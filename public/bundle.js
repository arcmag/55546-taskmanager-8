/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/card.js":
/*!*********************!*\
  !*** ./src/card.js ***!
  \*********************/
/*! exports provided: renderSeveralCard, START_COUNT_CARD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSeveralCard", function() { return renderSeveralCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_COUNT_CARD", function() { return START_COUNT_CARD; });

const START_COUNT_CARD = 7;
const MAX_COUNT_CARD = 20;

const boardTasksBlock = document.querySelector(`.board__tasks`);
boardTasksBlock.innerHTML = ``;

const renderCard = () => {
  const card = document.createElement(`article`);
  card.className = `card`;
  card.innerHTML = `
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
            favorites
          </button>
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
            <div class="card__dates"></div>
            <div class="card__hashtag">
              <div class="card__hashtag-list"></div>
              <label>
                <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
              </label>
            </div>
          </div>
          <label class="card__img-wrap card__img-wrap--empty">
            <input type="file" class="card__img-input visually-hidden" name="img">
            <img src="img/add-photo.svg" alt="task picture" class="card__img">
          </label>
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap"></div>
          </div>
        </div>
      </div>
    </form>`;

  boardTasksBlock.appendChild(card);
};

const renderSeveralCard = (number = Math.round(Math.random() * MAX_COUNT_CARD)) => {
  boardTasksBlock.innerHTML = ``;

  for (let i = 0; i < number; i++) {
    renderCard();
  }
};




/***/ }),

/***/ "./src/filter.js":
/*!***********************!*\
  !*** ./src/filter.js ***!
  \***********************/
/*! exports provided: FilterType, renderFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterType", function() { return FilterType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFilter", function() { return renderFilter; });
const MAX_NUMBER_TASKS = 100;

const mainFiltersBlock = document.querySelector(`.main__filter`);
mainFiltersBlock.innerHTML = ``;

const FilterType = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `REPEATING`,
  `TAGS`,
  `ARCHIVE`
];

const FilterTemplate = {
  ALL: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__all"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__all" class="filter__label">
      ALL <span class="filter__all-count">${randomNumberTask}</span></label
    >
  `,
  OVERDUE: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__overdue"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__overdue" class="filter__label"
      >OVERDUE <span class="filter__overdue-count">${randomNumberTask}</span></label
    >
  `,
  TODAY: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__today"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__today" class="filter__label"
      >TODAY <span class="filter__today-count">${randomNumberTask}</span></label
    >
  `,
  FAVORITES: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__favorites"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__favorites" class="filter__label"
      >FAVORITES <span class="filter__favorites-count">${randomNumberTask}</span></label
    >
  `,
  REPEATING: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__repeating"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__repeating" class="filter__label"
      >Repeating <span class="filter__repeating-count">${randomNumberTask}</span></label
    >
  `,
  TAGS: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__tags"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__tags" class="filter__label"
      >Tags <span class="filter__tags-count">${randomNumberTask}</span></label
    >
  `,
  ARCHIVE: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__archive"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__archive" class="filter__label"
      >ARCHIVE <span class="filter__archive-count">${randomNumberTask}</span></label
    >
  `
};

const getFilterTemplate = (filterType) => {
  const randomNumberTask = Math.round(Math.random() * MAX_NUMBER_TASKS);

  return FilterTemplate[filterType](randomNumberTask);
};

const renderFilter = (filterType) => {
  const wrapperFilter = document.createElement(`div`);
  wrapperFilter.innerHTML = getFilterTemplate(filterType);

  wrapperFilter.addEventListener(`click`, () => {
    renderSeveralCard();
  });

  mainFiltersBlock.appendChild(wrapperFilter);
};




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter */ "./src/filter.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./src/card.js");



for (let i = 0, l = _filter__WEBPACK_IMPORTED_MODULE_0__["FilterType"].length; i < l; i++) {
  Object(_filter__WEBPACK_IMPORTED_MODULE_0__["renderFilter"])(_filter__WEBPACK_IMPORTED_MODULE_0__["FilterType"][i]);
}

Object(_card__WEBPACK_IMPORTED_MODULE_1__["renderSeveralCard"])(_card__WEBPACK_IMPORTED_MODULE_1__["START_COUNT_CARD"]);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map