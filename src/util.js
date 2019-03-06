const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const util = {
  createElement,
  getRandomInt,
  getRandomFloat
};

export {util};
