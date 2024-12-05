import {createElement, applyClassAndAttrsToElement} from "../utils/domManipulation.js";

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
  oldActive && oldActive.setAttribute("inert","");
  activeArticle.setAttribute("data-active", true);
  activeArticle.removeAttribute("inert");
  const allCarItem = document.querySelectorAll(".modal-wp-view");
  allCarItem.forEach((item) => {
    item.style.transform = `translateX(-${id * 1050}px)`;
    item.setAttribute("data-offset", -id * 1050);
  });
  const isVideo = document.querySelector("[data-active='true'] video");
  isVideo && isVideo.focus();
};

/**
 * @summary Assembles of all components inside the media element.<br>
 * <b>Either</b> return a html element (for sorting function) <b>or</b> append to <b>.photographer-wp</b>
 * @param i
 * @param photographWP
 * @param media
 * @param srcMedia
 * @param isSort
 * @return {HTMLElement|void} <b>Either</b> return a html element (for sorting function) <b>or</b> append to <b>.photographer-wp</b>
 */
const mediaTemplate = (i, photographWP, media, srcMedia, isSort = false) => {
  let divWp = createElement("div",["media-wp"],{"role":"listitem"});
  let divMediaWp = createElement("div",["media-wp-mediawp"],{"role": "button"});
  let divText = document.createElement("div");

  const mediaEl = buildMediaEl(media,srcMedia,i);

  let mediaTitle = createElement("p",["media-wp-text--title"],{"aria-label": "Titre du média"});
  mediaTitle.textContent = media.title;

  // Like Creation
  const mediaWpLike = buildMediaLike(media);

  divText.classList.add("media-wp-text");
  divText.append(mediaTitle, mediaWpLike);
  divMediaWp.append(mediaEl);
  divWp.append(divMediaWp, divText);
  if (isSort)
    return divWp;
  photographWP.appendChild(divWp);
};

/**
 * @summary Build the media element with its events.
 * @param media
 * @param srcMedia
 * @param i
 * @return {HTMLElement}
 */
function buildMediaEl(media,srcMedia,i){
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
  mediaElEvents(mediaEl);
  return mediaEl;
}

/**
 * @summary Add click & key listeners to the media element.
 * @param mediaEl
 */
function mediaElEvents(mediaEl){
  mediaEl.addEventListener("click", handleMediaEl);
  mediaEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleMediaEl(e);
    }
  });
}

/**
 * @summary Build the like element with its events.
 * @param media
 * @return {HTMLElement}
 */
function buildMediaLike(media){
  const mediaTxtLikeAttrs = {"aria-label":`Nombre de likes ${media.likes}`, "tabindex":"0"};
  let mediaTxtLike = createElement("span", ["media-wp-text--wp-txt-like", "media-wp-text--like--liked"],mediaTxtLikeAttrs);
  let mediaWpLike = createElement("div",["media-wp-text--wp-like"]);
  let mediaLike = createElement("button",["media-wp-text--like"],{"aria-label": `aimer le média ${media.title}`});
  mediaTxtLike.textContent = media.likes;

  let iLike = createElement("i",["fas", "fa-heart", "p-fa--img"]);
  let hasBeenLiked = false;
  mediaLikeEvents(mediaLike,hasBeenLiked,mediaTxtLike);
  mediaLike.appendChild(iLike);
  mediaWpLike.append(mediaTxtLike, mediaLike);
  return mediaWpLike;
}

/**
 * @summary Add click & key listeners to the like element.
 * @param mediaLike
 * @param hasBeenLiked
 * @param mediaTxtLike
 */
function mediaLikeEvents(mediaLike,hasBeenLiked,mediaTxtLike){
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
  });
}

/**
 * @summary Apply accessibility attributes & classes when modal is opened.
 * @param e
 */
function handleMediaEl(e) {
  applyClassAndAttrsToElement(document.querySelector(".modalwp-lightbox"),["modalwp--show"],{"aria-hidden": "false"}) ;
  applyClassAndAttrsToElement(document.querySelector("main"),[],{"inert": ""});
  applyClassAndAttrsToElement(document.querySelector(".body"),["body--hidden"]) ;
  applyClassAndAttrsToElement(document.querySelector(".header"),[],{"inert": ""});

  const idImg = e.target.getAttribute("data-index");
  carouselOnClick(idImg);
}

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

/**
 * @summary Build a slide for the carousel element.
 * @param i
 * @param lightbox
 * @param media
 * @param srcMedia
 */
const carouselElement = (i, lightbox, media, srcMedia) => {
  const article = createElement("article",["modal-wp-view"],{"role": "listitem","data-id": i, "inert":""});
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

export {mediaTemplate, getPriceAndLikesBlock, carouselElement, carouselOnClick, likeEventListener };