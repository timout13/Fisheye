function createElement(tagName, classes = [], attributes = {}) {
  let element = document.createElement(tagName);
  element = applyClassAndAttrsToElement(element,classes, attributes);
  return element;
}

function applyClassAndAttrsToElement(element,classes = [],attributes = {}){
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  for (let [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

function displayModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.querySelector("main");
  const body = document.querySelector(".body");
  const header = document.querySelector(".header");
  body.classList.add("body--hidden");
  main.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("modalwp--show");
  let closeBtn = modal.querySelector(".btn-close");
  closeBtn.focus();
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
  const modal = document.querySelector(".modalwp--show");
  const main = document.querySelector("main");
  const header = document.querySelector(".header");
  const body = document.querySelector(".body");
  body.classList.remove("body--hidden");
  main.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("modalwp--show");
}

export { closeModal, displayModal, applyClassAndAttrsToElement, createElement }