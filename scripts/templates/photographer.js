function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  const createMainElement = () => {
    const img = document.createElement("img");

    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
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
  /* AJOUTER ARIA LABEL À DESC PRICE LOCATION HOMEPAGE */
  // For Homepage
  function getUserCardDOM() {
    const { img, h2, location, catchPhrase, priceTag } = createMainElement();
    const article = document.createElement("article");
    const anchor = document.createElement("a");
    article.classList.add("photographer_card");
    article.setAttribute("aria-labelledby", `photograph-${id}`);
    anchor.classList.add("photographer_card_header");
    anchor.setAttribute("aria-label", `Page de ${name}`);
    anchor.href = `../../photographer.html?id=${id}`;
    img.classList.add("photographer_card_header_img");
    h2.classList.add("photographer_card_header_name");
    location.classList.add("photographer_card_location");
    catchPhrase.classList.add("photographer_card_desc");
    priceTag.classList.add("photographer_card_price");
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
    const profilWp = document.createElement("div");
    profilWp.classList.add("photograph-header-profil");
    img.classList.add("photograph-header-img");
    return { img, h2, location, catchPhrase, priceTag, profilWp };
  };
  return { name, picture, getUserCardDOM, getAuthorBlock };
}

const imageTemplate = (img) => {
  // Fait le template des img de la page photographer
};
