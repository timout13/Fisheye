import App from "../index.js";
export default class Media {
  constructor(mediaData, photographerName) {
    this.mediaData = mediaData;
    this.photographerName = photographerName;
  }
  getMediaPath() {
    const mediaName = this.mediaData.image || this.mediaData.video;
    const name = this.photographerName.split(" ")[0];
    const formattedN =name.replace("-","%20");
    return `./assets/images/${formattedN}/${mediaName}`;
  }

  getMediaTemplate(index) {
    const src = this.getMediaPath();
    const isVideo = !!this.mediaData.video;
    const mediaElement = isVideo
      ? `
        <video class="media-wp-mediawp-media" data-index="${index}" tabindex="0" aria-label="Voir la vidéo ${this.mediaData.title} en plein écran">
          <source src="${src}" type="video/mp4">
          <p>Votre navigateur ne prend pas en charge les vidéos HTML5. Voici <a href="${src}">un lien pour télécharger la vidéo.</a></p>
        </video>`
      : `<img class="media-wp-mediawp-media" src="${src}" alt="${this.mediaData.title}" data-index="${index}" tabindex="0" aria-label="Voir l'image ${this.mediaData.title} en plein écran">`;

    return `
      <div class="media-wp" role="listitem">
        <div class="media-wp-mediawp" role="button" >${mediaElement}</div>
        <div class="media-wp-text">
          <p class="media-wp-text--title" aria-label="Titre du média">${this.mediaData.title}</p>
          <div class="media-wp-text--wp-like" aria-label="J'aime" >
            <span class="media-wp-text--wp-txt-like">${this.mediaData.likes}</span>
            <button class="media-wp-text--like" data-liked="false"><i class="fas fa-heart p-fa--img"></i></button>
          </div>
        </div>
      </div>
    `;

  }
  getLikes(){
    if (!this.element) {
      console.error("L'élément DOM pour ce média n'a pas été défini.");
      return;
    }
    const likesText = this.element.querySelector(".media-wp-text--wp-txt-like");
    const currentLikes = parseInt(likesText.textContent, 10);
    return currentLikes;
  }
  attachEvents() {
    // Vérifier si l'élément DOM est défini
    if (!this.element) {
      console.error("L'élément DOM pour ce média n'a pas été défini.");
      return;
    }

    // Gestionnaire pour le bouton "like"
    const likeButton = this.element.querySelector(".media-wp-text--like");
    likeButton.addEventListener("click", () => {
      this.incrementLikes();
    });
    likeButton.addEventListener("keydown", (e) => {
      if (e.key === "Tab" ) {
        return;
      }
      e.preventDefault();
      console.log(e.key);
      if (e.key === "Enter" || e.keyCode === 13) {
        this.incrementLikes();
      }
    });

    // Gestionnaire pour ouvrir le carrousel ou un modal
    const mediaButton = this.element.querySelector(".media-wp-mediawp");
    mediaButton.addEventListener("click", (e) => {
      this.openMediaModal(e);
    });
    mediaButton.addEventListener("keydown", (e) => {
      if (e.key === "Tab" ) {
        return;
      }
      e.preventDefault();
      console.log(e.key);
      if (e.key === "Enter" || e.keyCode === 13) {
        this.openMediaModal(e);
      }
    });
  }

  incrementLikes() {
    const likesText = this.element.querySelector(".media-wp-text--wp-txt-like");
    const likeEl = this.element.querySelector(".media-wp-text--like");
    const likeStatus = likeEl.getAttribute("data-liked");
    const currentLikes = parseInt(likesText.textContent, 10);
    if(likeStatus=="true") {
      likesText.textContent = currentLikes - 1;
      likeEl.setAttribute("data-liked",false);
    }else{
      likesText.textContent = currentLikes + 1;
      likeEl.setAttribute("data-liked",true);
    }
    App.updateTotalLikes();
  }

  openMediaModal(e) {
    console.log(`Ouverture du modal pour le média : ${this.mediaData.title}`);
    const lightbox = document.querySelector(".modalwp-lightbox");
    const main = document.querySelector("main");
    const header = document.querySelector(".header");
    const body = document.querySelector(".body");
    body.classList.add("body--hidden");
    main.setAttribute("inert", "");
    header.setAttribute("inert", "true");
    lightbox.classList.add("modalwp--show");
    lightbox.setAttribute("aria-hidden", "false");
    console.log(e.target.dataset.index);
    /*const iImg = e.target.getAttribute("data-index");
    carouselOnClick(iImg);*/
  }
}