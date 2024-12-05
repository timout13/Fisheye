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
  const closeBtn = modal.querySelector(".btn-close");
  closeBtn.focus();
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
  const modal = document.querySelector(".modalwp--show");
  const body = document.querySelector(".body");
  const logo = document.querySelector(".logo-link");
  body.classList.remove("body--hidden");
  //faire un focus sur un btn
  modal.setAttribute("aria-hidden", "true");
  document.querySelector("main").removeAttribute('inert');
  document.querySelector(".header").removeAttribute('inert');

  modal.classList.remove("modalwp--show");
  logo.focus();
}

export { closeModal, displayModal, applyClassAndAttrsToElement, createElement };