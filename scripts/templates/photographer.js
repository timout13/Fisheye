function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer_card");
    article.setAttribute('aria-labelledby', `photograph-${id}`);
    const anchor = document.createElement("a");
    anchor.classList.add("photographer_card_header");
    anchor.setAttribute('aria-label', `Page de ${name}`);
    anchor.href = `../../photographer.html?id=${id}`;
    const img = document.createElement("img");
    img.classList.add("photographer_card_header_img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    const h2 = document.createElement("h2");
    h2.classList.add("photographer_card_header_name");
    h2.id=`photograph_${id}`
    h2.textContent = name;
    const location = document.createElement("h3");
    location.classList.add("photographer_card_location");
    location.textContent = `${city}, ${country}`;
    const catchPhrase = document.createElement("p");
    catchPhrase.classList.add("photographer_card_desc");
    catchPhrase.textContent = `${tagline}`;
    const priceTag = document.createElement("p");
    priceTag.classList.add("photographer_card_price");
    priceTag.textContent = `${price}€/jour`;
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
  return { name, picture, getUserCardDOM };
}
