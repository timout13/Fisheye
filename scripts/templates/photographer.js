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
    return {  priceTag };
  };
  return { name, picture, getUserCardDOM, getAuthorBlock };
}
// Create the media block in photographer page
const likeEventListener = (e,mediaLike, hasBeenLiked) => {
  /* For img */
  let nbLikes = Number(mediaLike.textContent);
  !hasBeenLiked ? nbLikes++ : nbLikes--;
  mediaLike.textContent = nbLikes;
  mediaLike.append(e.target);
  /* For Page */
  let pageLikesText = document.querySelector(".priceAndLike-wp-like");
  let pageLikes = Number(pageLikesText.textContent);
  !hasBeenLiked ? pageLikes++ : pageLikes--;
  pageLikesText.textContent = pageLikes;
  return !hasBeenLiked;
}
const imageTemplate = (photographWP, img, srcMedia,isSort=false) => {
  let divWp = document.createElement("div");
  divWp.classList.add("media-wp");
  let divText = document.createElement("div");
  let mediaElement = null;
  if (img.image) {
    mediaElement = document.createElement("img");
    mediaElement.src = srcMedia;
  } else if (img.video) {
    mediaElement = document.createElement("video");
    //mediaElement.setAttribute("controls", "");
    let videoSrc = document.createElement("source");
    videoSrc.src = srcMedia;
    videoSrc.setAttribute("type", "video/mp4");
    let videoAnchor = document.createElement("a");
    let videoText = document.createElement("p");
    videoAnchor.textContent = "un lien pour télécharger la vidéo.";
    videoAnchor.href = srcMedia;
    videoText.textContent = `Votre navigateur ne prend pas en charge les vidéos HTML5. Voici`;
    videoText.append(videoAnchor);
    mediaElement.append(videoSrc, videoText);
  }
  mediaElement.classList.add("media-wp-media");
  /* Event Click Img */
  mediaElement.addEventListener("click",e => {
    console.log(e.target);
  })
  let mediaTitle = document.createElement("p");
  mediaTitle.textContent = img.title;
  /* Like Creation */
  let mediaLike = document.createElement("p");
  mediaLike.textContent = img.likes;
  let iLike = document.createElement("i");
  iLike.classList.add("fas", "fa-heart");
  let hasBeenLiked = false;
  iLike.addEventListener("click", (e) => {
     hasBeenLiked = likeEventListener(e, mediaLike, hasBeenLiked);
  })
  mediaLike.appendChild(iLike);
  divText.append(mediaTitle, mediaLike);
  divWp.append(mediaElement, divText);
  if (!isSort) {
    photographWP.appendChild(divWp);
  } else {
    
    return divWp;
  }
};

const getPriceAndLikesBlock=(totalLikes, priceTag)=>{
  const div = document.createElement("div");
  div.classList.add("priceAndLike-wp");
  const pLikes = document.createElement("p");
  pLikes.classList.add("priceAndLike-wp-like");
  pLikes.textContent = totalLikes;
  priceTag.classList.add("priceAndLike-wp-price");
  div.append(pLikes, priceTag);
  main.prepend(div);
}