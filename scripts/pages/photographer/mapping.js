import {displaySelect, handleSort} from "./customSelect.js";
import {carouselArrow} from "./carousel.js";
import {closeModal} from "../../utils/domManipulation.js";

function mappingCustomSelectToggle(cSelect) {
  /* Custom Select -- Hide/Show Dropdown Events */
  cSelect.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      displaySelect(cSelect);
    }
  });
  cSelect.addEventListener("click", () => {
    displaySelect(cSelect);
  });
}

function mappingCustomSelectDropdownItem(allLabelSort, cSelect, authorImgs, author, photographWp) {
  allLabelSort.forEach((labelSort) => {
    labelSort.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        handleSort(cSelect, labelSort, authorImgs, author, photographWp);
      }
    });
    labelSort.addEventListener("click", () => {
      handleSort(cSelect, labelSort, authorImgs, author, photographWp);
    });
  });
}

function mappingCarouselByClick(carPrev, carNext) {
  carPrev.addEventListener("click", () => {
    carouselArrow();
  });
  carNext.addEventListener("click", () => {
    carouselArrow(true);
  });
}

function mappingModals() {
  document.addEventListener("keydown", (e) => {
    const visibleModal = document.querySelector(".modalwp.modalwp--show");
    if (visibleModal) {
      const isLightbox = visibleModal.classList.contains("modalwp-lightbox");
      switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        if (isLightbox) carouselArrow();
        break;
      case "ArrowRight":
        if (isLightbox) carouselArrow(true);
        break;
      }
    }
  });
}

export {mappingCustomSelectToggle, mappingCustomSelectDropdownItem, mappingCarouselByClick, mappingModals};