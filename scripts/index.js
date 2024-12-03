import Media from "./class/media.js";
import Photographer from "./class/photographer.js";
import DataService from "./utils/dataServices.js";
export default class App {
  constructor() {
    this.photographWp = document.querySelector(".photograph-wp");
    this.lightboxWP = document.querySelector(".modalwp-lightbox .modal-wp");
    this.main = document.querySelector("main");
    this.header = document.querySelector(".header");
    this.body = document.querySelector("body");
    this.totalLikes=0;
  }

  async init() {
    const urlParams = new URLSearchParams(document.location.search);
    const authorId = Number(urlParams.get("id"));
    const data = await DataService.fetchData("./data/photographers.json");
    if (!data) return;

    const { photographers, media } = data;
    const author = DataService.getAuthorById(authorId, photographers);
    const authorMedia = DataService.getMediaByAuthorId(media, authorId);

    if (author) {
      this.displayAuthorDetails(author);
      this.displayMedia(authorMedia, author.name);
      this.displayTotalLikes(author);
    }
  }

  displayAuthorDetails(author) {
    const photographer = new Photographer(author);
    const authorBlockHTML = photographer.getAuthorBlock();
    const header = document.querySelector(".photograph-header");
    header.innerHTML = authorBlockHTML;
  }

  displayMedia(mediaList, authorName) {
    const mediaInstances = mediaList.map((media) => new Media(media, authorName));
    const mediaHTML = mediaInstances.map((mediaInstance,index)=>mediaInstance.getMediaTemplate(index)).join("");
    this.photographWp.innerHTML = mediaHTML;
    mediaInstances.forEach((media, index) => {
      media.element = this.photographWp.children[index]; // Associe l'élément DOM à l'instance
      media.attachEvents(); // Attache les événements
      this.totalLikes += media.getLikes();
    });
  }

  displayTotalLikes(author){
    const container = document.createElement("div");
    container.innerHTML = `
    <div class="priceAndLike-wp">
      <p class="priceAndLike-wp-like" aria-label="Nombre total de j'aime : ${this.totalLikes}" tabindex="1">${this.totalLikes}</p>
      <p class="priceAndLike-wp-price" aria-label="Prix : ${author.price}€/jour" tabindex="1">${author.price}€/jour</p>
    </div>
`;
    this.main.appendChild(container.firstElementChild);
  }
  static updateTotalLikes(){
    let totalLikes = 0;
    const totalLikesText = document.querySelector(".priceAndLike-wp-like");
    const medias = document.querySelectorAll(".media-wp-text--wp-txt-like");
    medias && medias.forEach(media=> totalLikes += parseInt(media.textContent, 10));
    totalLikesText.textContent = totalLikes;
    totalLikesText.setAttribute("aria-label",`Nombre total de j'aime : ${totalLikes}`);
  }
}

const app = new App();
app.init();