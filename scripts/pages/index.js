import {getPhotographersData} from "../utils/dataServices.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographersData();
  displayData(photographers);
}

init();
