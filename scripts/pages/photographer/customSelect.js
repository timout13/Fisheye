import {carouselElement, mediaTemplate} from "../../templates/photographer.js";
import {getMediaPath} from "./index.js";

const displaySelect = (cSelect) => {
  const cSelectList = document.querySelector(".custom-select-list");
  console.log("là");
  if (cSelectList.classList.contains("custom-select-list--show")) {
    console.log("ici");
    cSelect.setAttribute("aria-expanded", false);
    cSelect.classList.remove("open");
    cSelectList.classList.remove("custom-select-list--show");
  } else {
    cSelect.classList.add("open");
    cSelectList.classList.add("custom-select-list--show");
    cSelect.setAttribute("aria-expanded", true);
  }
};

const handleSort = (cSelect, labelSort, authorImgs, author, photographWp) => {
  const c = document.querySelector(".custom-select-list");
  console.log("test");
  c.classList.remove("custom-select-list--show");
  cSelect.setAttribute("aria-expanded", false);
  const sort = {
    title: labelSort.textContent,
    attr: labelSort.getAttribute("data-sort")
  };
  caseSelect(sort, authorImgs, author, photographWp);
};

function changeSelectLabel(title) {
  const cSelectBtn = document.querySelector(".custom-select-legend-btn");
  cSelectBtn.textContent = title;
}


function displaySortedData(authorImgs, author) {
  const photographWP = document.querySelector(".photograph-wp");
  const lightboxWP = document.querySelector(".modalwp-lightbox .modal-wp");
  const lightboxArticle = lightboxWP.querySelectorAll(".modal-wp-view");
  let divWpArray = [];
  lightboxArticle.forEach((article) => article.remove());
  authorImgs.forEach((img, i) => {
    let srcMedia = getMediaPath(author, img);
    divWpArray.push(mediaTemplate(i, photographWP, img, srcMedia, true));
    carouselElement(i, lightboxWP, img, srcMedia);
  });
  return divWpArray;
}

function compareByTitle(a, b) {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

function compareByPop(a, b) {
  const titleA = a.likes;
  const titleB = b.likes;

  if (titleA < titleB) {
    return 1;
  } else if (titleA > titleB) {
    return -1;
  }
  return 0;
}

function compareByDate(a, b) {
  const titleA = a.date;
  const titleB = b.date;

  if (titleA < titleB) {
    return 1;
  } else if (titleA > titleB) {
    return -1;
  }
  return 0;
}

function caseSelect({title, attr}, authorImgs, author, photographWp) {
  changeSelectLabel(title);
  switch (attr) {
  case "popularite":
    filterImgs(authorImgs, compareByPop, author, photographWp);
    break;
  case "date":
    filterImgs(authorImgs, compareByDate, author, photographWp);
    break;
  case "titre":
    filterImgs(authorImgs, compareByTitle, author, photographWp);
    break;
  default:
    break;
  }
}

const filterImgs = (authorImgs, compareFunc, author, photographWp) => {
  authorImgs.sort(compareFunc);
  let dataSorted = displaySortedData(authorImgs, author);
  photographWp.replaceChildren(...dataSorted);
};

export {filterImgs, caseSelect, compareByPop, compareByDate, compareByTitle, changeSelectLabel, displaySelect, handleSort, displaySortedData};