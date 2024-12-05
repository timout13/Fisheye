import {createElement} from "../utils/domManipulation.js";

function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `./assets/photographers/${portrait}`;

  const createMainElement = () => {
    const img = createElement("img",[],{"src": picture, "alt": `Photo de ${name}`});

    const h2 = document.createElement("h2");
    h2.id = `photograph_${id}`;
    h2.textContent = name;

    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;

    const catchPhrase = document.createElement("p");
    catchPhrase.textContent = `${tagline}`;

    const priceTag = document.createElement("p");
    priceTag.textContent = `${price}€/jour`;

    return { img, h2, location, catchPhrase, priceTag };
  };
  // For Homepage
  function getUserCardDOM() {
    const { img, h2, location, catchPhrase, priceTag } = createMainElement();
    const article = document.createElement("article");
    const anchor = document.createElement("a");
    article.classList.add("photographer_card");
    article.setAttribute("aria-labelledby", `photograph_${id}`);
    anchor.classList.add("photographer_card_header");
    anchor.setAttribute("aria-label", `Voir le profil de ${name}`);
    anchor.href = `./photographer.html?id=${id}`;
    img.classList.add("photographer_card_header_img");
    h2.classList.add("photographer_card_header_name");
    location.classList.add("photographer_card_location");
    location.setAttribute(
      "aria-label",
      `Localisation : ${location.textContent}`
    );
    catchPhrase.classList.add("photographer_card_desc");
    catchPhrase.setAttribute("aria-label", "Description");
    priceTag.classList.add("photographer_card_price");
    priceTag.setAttribute("aria-label", "Prix");
    // Append to anchor
    anchor.appendChild(img);
    anchor.appendChild(h2);
    // Append to article
    article.appendChild(anchor);
    article.appendChild(location);
    article.appendChild(catchPhrase);
    article.appendChild(priceTag);
    return article;
  }

  //For Photographer page
  const getAuthorBlock = () => {
    const { img, h2, location, catchPhrase, priceTag } = createMainElement();
    const profilWp = createElement("div",["photograph-header-profil"]);
    const photographersSection = document.querySelector(".photograph-header");
    img.classList.add("photograph-header-img");
    profilWp.append(h2, location, catchPhrase);
    photographersSection.prepend(profilWp);
    photographersSection.append(img);
    return { priceTag };
  };
  return { name, picture, getUserCardDOM, getAuthorBlock };
}

export {photographerTemplate};