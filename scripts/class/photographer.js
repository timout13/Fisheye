export default class Photographer {
  constructor(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
    this.name = name;
    this.portrait = portrait;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.picture = `./assets/photographers/${portrait}`;
  }

  getUserCardDOM() {
    return `
      <article class="photographer_card" aria-labelledby="photograph-${this.id}">
        <a class="photographer_card_header" href="./photographer.html?id=${this.id}" aria-label="Page de ${this.name}">
          <img class="photographer_card_header_img" src="${this.picture}" alt="Photo de ${this.name}">
          <h2 class="photographer_card_header_name" id="photograph_${this.id}">${this.name}</h2>
        </a>
        <h3 class="photographer_card_location" aria-label="Localisation : ${this.city}, ${this.country}">
          ${this.city}, ${this.country}
        </h3>
        <p class="photographer_card_desc" aria-label="Description">${this.tagline}</p>
        <p class="photographer_card_price" aria-label="Prix">${this.price}€/jour</p>
      </article>
    `;
  }

  getAuthorBlock() {
    return `
      <div class="photograph-header-profil">
        <h2 id="photograph_${this.id}">${this.name}</h2>
        <h3>${this.city}, ${this.country}</h3>
        <p>${this.tagline}</p>
      </div>
      <img class="photograph-header-img" src="${this.picture}" alt="Photo de ${this.name}">
    `;
  }
}