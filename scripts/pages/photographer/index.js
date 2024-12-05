import { mediaTemplate, photographerTemplate, getPriceAndLikesBlock, carouselElement} from "../../templates/photographer.js";
import {handleForm} from "../../utils/contactForm.js";
import {displayModal, closeModal} from "../../utils/domManipulation.js";
import {getPhotographerData} from "../../utils/dataServices.js";
import {
  mappingCarouselByClick,
  mappingCustomSelectDropdownItem,
  mappingCustomSelectToggle, mappingModals
} from "./mapping.js";

export const getMediaPath = (author, img) => {
  let name = author.name;
  let mediaName = img.image ? img.image : img.video;
  name = name.split(" ");
  name = name[0].split("-");
  name = name[1] != undefined ? `${name[0]} ${name[1]}` : name[0];
  let src = `assets/images/${name}/${mediaName}`;
  return src;
};

async function displayData(authorImgs, author) {
  const photographWP = document.querySelector(".photograph-wp");
  const photographerModel = photographerTemplate(author);
  const lightboxWP = document.querySelector(".modalwp-lightbox .modal-wp");
  const {priceTag} = photographerModel.getAuthorBlock();
  lightboxWP.setAttribute("role", "list");
  let totalLikes = 0;
  authorImgs.forEach((img, i) => {
    let srcMedia = getMediaPath(author, img);
    // Photograph-Wp Element ↓
    mediaTemplate(i, photographWP, img, srcMedia);
    carouselElement(i, lightboxWP, img, srcMedia);
    totalLikes += img.likes;
  });
  getPriceAndLikesBlock(totalLikes, priceTag);
}

/* INIT PAGE */
async function init() {
  window.displayModal = displayModal;
  window.closeModal = closeModal;
  const photographWp = document.querySelector(".photograph-wp");
  // Récupère les datas des photographes
  const getAuthor = new URLSearchParams(document.location.search);
  const idAuthor = Number(getAuthor.get("id"));
  const {authorImgs, author} = await getPhotographerData(idAuthor);

  const allLabelSort = document.querySelectorAll("label[data-sort]");
  const carPrev = document.querySelector("#prev");
  const carNext = document.querySelector("#next");
  const cSelect = document.querySelector(".custom-select-legend-btn");

  // Display
  displayData(authorImgs, author);
  handleForm();
  /*  
    Init Modal behaviour 
    Keyboard mapping => Escape & ArrowLeft/ArrowRight
  */
  mappingModals();
  /* Carousel -- Arrow's behaviour on click */
  mappingCarouselByClick(carPrev,carNext);
  /* Custom Select -- Hide/Show Dropdown Events */
  mappingCustomSelectToggle(cSelect);

  /* Custom Select Inputs -- Sort Events */
  mappingCustomSelectDropdownItem(allLabelSort,cSelect,authorImgs,author,photographWp);
}

init();
