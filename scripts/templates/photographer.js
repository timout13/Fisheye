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
    const photographersSection = document.querySelector(".photograph-header");
    profilWp.classList.add("photograph-header-profil");
    img.classList.add("photograph-header-img");
    profilWp.append(h2, location, catchPhrase);
    photographersSection.prepend(profilWp);
    photographersSection.append(img);
    return { priceTag };
  };
  return { name, picture, getUserCardDOM, getAuthorBlock };
}
// Create the media block in photographer page
const likeEventListener = (e, mediaTxtLike, hasBeenLiked) => {
  /* For img */
  let nbLikes = Number(mediaTxtLike.textContent);
  !hasBeenLiked ? nbLikes++ : nbLikes--;
  mediaTxtLike.textContent = nbLikes;

  /* For Page */
  let pageLikesText = document.querySelector(".priceAndLike-wp-like");
  let pageLikes = Number(pageLikesText.textContent);
  !hasBeenLiked ? pageLikes++ : pageLikes--;
  pageLikesText.textContent = pageLikes;
  return !hasBeenLiked;
};
const carouselOnClick = (id) => {
  const oldActive = document.querySelector("[data-active='true']");
  const activeArticle = document.querySelector(`[data-id='${Number(id)}']`);
  oldActive && oldActive.removeAttribute("data-active");
  activeArticle.setAttribute("data-active", true);
  const allCarItem = document.querySelectorAll(".modal-wp-view");
  allCarItem.forEach((item) => {
    item.style.transform = `translateX(-${id * 1050}px)`;
    item.setAttribute("data-offset", -id * 1050);
  });
  const isVideo = document.querySelector("[data-active='true'] video");
  isVideo && isVideo.focus();
};

/* Photograph-wp Elements */
const imageTemplate = (i, photographWP, media, srcMedia, isSort = false) => {
  let divWp = document.createElement("div");
  divWp.classList.add("media-wp");
  divWp.setAttribute("role", "listitem");
  let divMediaWp = document.createElement("div");
  divMediaWp.classList.add("media-wp-mediawp");
  divMediaWp.setAttribute("role", "button");
  let divText = document.createElement("div");
  let mediaEl = null;
  if (media.image) {
    mediaEl = document.createElement("img");
    mediaEl.src = srcMedia;
    mediaEl.setAttribute("alt", media.title);
  } else if (media.video) {
    mediaEl = document.createElement("video");

    let videoSrc = document.createElement("source");
    videoSrc.src = srcMedia;
    videoSrc.setAttribute("type", "video/mp4");
    let videoAnchor = document.createElement("a");
    let videoText = document.createElement("p");
    videoAnchor.textContent = "un lien pour télécharger la vidéo.";
    videoAnchor.href = srcMedia;
    videoText.textContent = `Votre navigateur ne prend pas en charge les vidéos HTML5. Voici`;
    videoText.append(videoAnchor);
    mediaEl.append(videoSrc, videoText);
  }
  mediaEl.classList.add("media-wp-mediawp-media");
  mediaEl.setAttribute("data-index", i);
  mediaEl.setAttribute("tabindex", 0);
  /* Event Click Img */
  function handleMediaEl(e) {
    const lightbox = document.querySelector(".modalwp-lightbox");
    const main = document.querySelector("main");
    const header = document.querySelector(".header");
    const body = document.querySelector(".body");
    body.classList.add("body--hidden");
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    lightbox.classList.add("modalwp--show");
    lightbox.setAttribute("aria-hidden", "false");
    const iImg = e.target.getAttribute("data-index");
    carouselOnClick(iImg);
  }
  mediaEl.addEventListener("click", handleMediaEl);
  mediaEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleMediaEl(e);
    }
  });
  let mediaTitle = document.createElement("p");
  mediaTitle.classList.add("media-wp-text--title");
  mediaTitle.textContent = media.title;
  mediaTitle.setAttribute("aria-label", "Titre du média");
  /* Like Creation */
  let mediaWpLike = document.createElement("div");
  let mediaTxtLike = document.createElement("span");
  let mediaLike = document.createElement("button");
  mediaWpLike.classList.add("media-wp-text--wp-like");
  mediaTxtLike.classList.add("media-wp-text--wp-txt-like");
  mediaTxtLike.classList.add("media-wp-text--like--liked");
  mediaLike.classList.add("media-wp-text--like");
  mediaWpLike.setAttribute("aria-label", "J'aime");
  mediaTxtLike.textContent = media.likes;
  let iLike = document.createElement("i");
  iLike.classList.add("fas", "fa-heart", "p-fa--img");
  let hasBeenLiked = false;
  mediaLike.addEventListener("click", (e) => {
    hasBeenLiked = likeEventListener(e, mediaTxtLike, hasBeenLiked);
  });
  mediaLike.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === 'Enter' || e.keyCode === 13) {
      hasBeenLiked = likeEventListener(e, mediaTxtLike, hasBeenLiked);
    }
    e.target.blur();
  });
  divText.classList.add("media-wp-text");
  mediaLike.appendChild(iLike);
  mediaWpLike.append(mediaTxtLike,mediaLike);
  divText.append(mediaTitle, mediaWpLike);
  divMediaWp.append(mediaEl);
  divWp.append(divMediaWp, divText);
  if (!isSort) {
    photographWP.appendChild(divWp);
  } else {
    return divWp;
  }
};

const getPriceAndLikesBlock = (totalLikes, priceTag) => {
  const div = document.createElement("div");
  div.classList.add("priceAndLike-wp");
  const pLikes = document.createElement("p");
  pLikes.classList.add("priceAndLike-wp-like");
  pLikes.textContent = totalLikes;
  priceTag.classList.add("priceAndLike-wp-price");
  div.append(pLikes, priceTag);
  main.prepend(div);
};

const carouselElement = (i, lightbox, media, srcMedia) => {
  const article = document.createElement("article");
  const div = document.createElement("div");
  let mediaEl = null;
  const p = document.createElement("p");

  article.classList.add("modal-wp-view");
  div.classList.add("modal-wp-view-imgwp");
  p.classList.add("modal-wp-view-imgwp-title");

  article.setAttribute("role", "listitem");
  article.setAttribute("data-id", i);
  if (media.image) {
    mediaEl = document.createElement("img");
    mediaEl.src = srcMedia;
    mediaEl.setAttribute("alt", media.title);
  } else if (media.video) {
    mediaEl = document.createElement("video");
    mediaEl.controls = true;
    mediaEl.setAttribute('tabindex', 0);
    let videoSrc = document.createElement("source");
    videoSrc.src = srcMedia;
    videoSrc.setAttribute("type", "video/mp4");
    let videoAnchor = document.createElement("a");
    let videoText = document.createElement("p");
    videoAnchor.textContent = "un lien pour télécharger la vidéo.";
    videoAnchor.href = srcMedia;
    videoText.textContent = `Votre navigateur ne prend pas en charge les vidéos HTML5. Voici`;
    videoText.append(videoAnchor);
    mediaEl.append(videoSrc, videoText);
  }
  mediaEl.classList.add("modal-wp-view-imgwp-media");
  mediaEl.setAttribute("width", "100%");
  mediaEl.setAttribute("height", "100%");

  p.textContent = media.title;
  p.setAttribute("aria-label", "Titre du média");

  div.append(mediaEl);
  article.append(div, p);
  lightbox.append(article);
};
