import {createElement, applyClassAndAttrsToElement} from "../utils/domManipulation.js";

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

/* PHOTOGRAPH-WP CARD-LIST ELEMENT */
const mediaTemplate = (i, photographWP, media, srcMedia, isSort = false) => {
  let divWp = createElement("div",["media-wp"],{"role":"listitem"});
  let divMediaWp = createElement("div",["media-wp-mediawp"],{"role": "button"});
  let divText = document.createElement("div");
  let mediaEl = null;
  const mediaElAtts ={
    "data-index": i,"tabindex": 0,"aria-label":
    `Voir le média ${media.title} en plein écran.`
  };
  if (media.image) {
    mediaEl = createElement("img",["media-wp-mediawp-media"],{...mediaElAtts,"alt": media.title});
    mediaEl.src = srcMedia;
  } else if (media.video) {
    mediaEl = createElement("video",["media-wp-mediawp-media"],mediaElAtts);
    let videoSrc = createElement("source",[],{"type": "video/mp4"});
    videoSrc.src = srcMedia;
    let videoAnchor = document.createElement("a");
    let videoText = document.createElement("p");
    videoAnchor.textContent = "un lien pour télécharger la vidéo.";
    videoAnchor.href = srcMedia;
    videoText.textContent =
      "Votre navigateur ne prend pas en charge les vidéos HTML5. Voici";
    videoText.append(videoAnchor);
    mediaEl.append(videoSrc, videoText);
  }

  // Event Click Img
  function handleMediaEl(e) {
    applyClassAndAttrsToElement(document.querySelector(".modalwp-lightbox"),["modalwp--show"],{"aria-hidden": "false"}) ;
    applyClassAndAttrsToElement(document.querySelector("main"),[],{"inert": ""});
    applyClassAndAttrsToElement(document.querySelector(".body"),["body--hidden"]) ;
    applyClassAndAttrsToElement(document.querySelector(".header"),[],{"inert": ""});

    const idImg = e.target.getAttribute("data-index");
    carouselOnClick(idImg);
  }
  mediaEl.addEventListener("click", handleMediaEl);
  mediaEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleMediaEl(e);
    }
  });

  let mediaTitle = createElement("p",["media-wp-text--title"],{"aria-label": "Titre du média"});
  mediaTitle.textContent = media.title;

  // Like Creation
  let mediaTxtLike = createElement("span", ["media-wp-text--wp-txt-like", "media-wp-text--like--liked"]);
  let mediaWpLike = createElement("div",["media-wp-text--wp-like"]);
  let mediaLike = createElement("button",["media-wp-text--like"],{"aria-label": "J'aime"});
  mediaTxtLike.textContent = media.likes;

  let iLike = createElement("i",["fas", "fa-heart", "p-fa--img"]);
  let hasBeenLiked = false;
  mediaLike.addEventListener("click", (e) => {
    hasBeenLiked = likeEventListener(e, mediaTxtLike, hasBeenLiked);
  });
  mediaLike.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      return;
    }
    e.preventDefault();
    if (e.key === "Enter" || e.keyCode === 13) {
      hasBeenLiked = likeEventListener(e, mediaTxtLike, hasBeenLiked);
    }
    e.target.blur();
  });
  divText.classList.add("media-wp-text");
  mediaLike.appendChild(iLike);
  mediaWpLike.append(mediaTxtLike, mediaLike);
  divText.append(mediaTitle, mediaWpLike);
  divMediaWp.append(mediaEl);
  divWp.append(divMediaWp, divText);
  if (isSort)
    return divWp;
  photographWP.appendChild(divWp);
};

const getPriceAndLikesBlock = (totalLikes, priceTag) => {
  const main = document.querySelector("main");
  const div = createElement("div",["priceAndLike-wp"]);
  const pLikesAttrs={"aria-label": `Nombre total de j'aime : ${totalLikes}`,"tabindex": 1};
  const pLikes = createElement("p",["priceAndLike-wp-like"],pLikesAttrs);
  pLikes.textContent = totalLikes;
  applyClassAndAttrsToElement(priceTag,["priceAndLike-wp-price"],{"aria-label":`Prix : ${priceTag.textContent}`,"tabindex": 1});
  div.append(pLikes, priceTag);
  main.append(div);
};

/* MODAL-MEDIA-WP CAROUSEL ELEMENT */
const carouselElement = (i, lightbox, media, srcMedia) => {
  const article = createElement("article",["modal-wp-view"],{"role": "listitem","data-id": i});
  const div = createElement("div",["modal-wp-view-imgwp"]);
  let mediaEl = null;
  const p = createElement("p", ["modal-wp-view-imgwp-title"],{"aria-label": media.title});
  p.textContent = media.title;
  const mediaElAttrs = {
    "width": "100%",
    "height": "100%"
  };
  if (media.image) {
    mediaEl = createElement("img",["modal-wp-view-imgwp-media"],{...mediaElAttrs,"alt": media.title});
    mediaEl.src = srcMedia;
  } else if (media.video) {
    mediaEl = createElement("video",["modal-wp-view-imgwp-media"],{...mediaElAttrs,"tabindex": 0});
    mediaEl.controls = true;
    let videoSrc = document.createElement("source");
    videoSrc.src = srcMedia;
    videoSrc.setAttribute("type", "video/mp4");
    let videoAnchor = document.createElement("a");
    let videoText = document.createElement("p");
    videoAnchor.textContent = "un lien pour télécharger la vidéo.";
    videoAnchor.href = srcMedia;
    videoText.textContent =
      "Votre navigateur ne prend pas en charge les vidéos HTML5. Voici";
    videoText.append(videoAnchor);
    mediaEl.append(videoSrc, videoText);
  }

  div.append(mediaEl);
  article.append(div, p);
  lightbox.append(article);
};

export {mediaTemplate, photographerTemplate, getPriceAndLikesBlock, carouselElement, carouselOnClick, likeEventListener };