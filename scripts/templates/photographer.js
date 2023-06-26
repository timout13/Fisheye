function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const anchor = document.createElement("a");
    anchor.href = `../../photographer.html?id=${id}`;
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;
    const catchPhrase = document.createElement("p");
    catchPhrase.textContent = `${tagline}`;
    const priceTag = document.createElement("p");
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
