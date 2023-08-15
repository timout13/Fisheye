async function getPhotographer() {
  let url = "./data/photographers.json";
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let allMembersOrigin = await fetch(url, options);
    let allMembers = await allMembersOrigin.json();
    return allMembers;
  } catch {
    console.log(err);
  }
}

const getAuthorImgs = (allImgs, idAuthor) => {
  const authorImgs = [];
  allImgs.forEach((img) => {
    img.photographerId === idAuthor && authorImgs.push(img);
  });
  return authorImgs;
};

const getAuthorById = (idAuthor, allAuthor) => {
  for (const author of allAuthor) {
    if (author.id == idAuthor) {
      return author;
    }
  }
  return null;
};

const getMediaPath = (author, img) => {
  let name = author.name;
  let mediaName = img.image ? img.image : img.video;
  name = name.split(" ");
  name = name[0].split("-");
  name = name[1] != undefined ? `${name[0]} ${name[1]}` : name[0];
  src = `assets/images/${name}/${mediaName}`;
  return src;
};

async function displayData(authorImgs, author) {
  const photographWP = document.querySelector(".photograph-wp");
  const photographerModel = photographerTemplate(author);
  const lightboxWP = document.querySelector(".modalwp-lightbox .modal-wp");
  const { priceTag } = photographerModel.getAuthorBlock();
  let totalLikes = 0;
  authorImgs.forEach((img, i) => {
    let srcMedia = getMediaPath(author, img);
    // Photograph-Wp Element ↓
    imageTemplate(i, photographWP, img, srcMedia);
    carouselElement(i, lightboxWP, img, srcMedia);
    totalLikes += img.likes;
  });
  getPriceAndLikesBlock(totalLikes, priceTag);
}
function displaySortedData(authorImgs, author) {
  const photographWP = document.querySelector(".photograph-wp");
  const lightboxWP = document.querySelector(".modalwp-lightbox .modal-wp");
  const lightboxArticle = lightboxWP.querySelectorAll(".modal-wp-view");
  let divWpArray = [];
  lightboxArticle.forEach(article => article.remove());
  authorImgs.forEach((img,i) => {
    let srcMedia = getMediaPath(author, img);
    divWpArray.push(imageTemplate(i, photographWP, img, srcMedia, true));
    carouselElement(i, lightboxWP, img, srcMedia);
  });
  return divWpArray;
}

function compareByTitle(a, b) {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

function compareByPop(a, b) {
  const titleA = a.likes;
  const titleB = b.likes;

  if (titleA < titleB) {
    return 1;
  } else if (titleA > titleB) {
    return -1;
  }
  return 0;
}

function compareByDate(a, b) {
  const titleA = a.date;
  const titleB = b.date;

  if (titleA < titleB) {
    return 1;
  } else if (titleA > titleB) {
    return -1;
  }
  return 0;
}

const filterImgs = (authorImgs, compareFunc, author, photographWp) => {
  authorImgs.sort(compareFunc);
  let dataSorted = displaySortedData(authorImgs, author);
  photographWp.replaceChildren(...dataSorted);
};

const carouselArrow = (isNxt = false) => {
  const allCarItem = document.querySelectorAll(".modal-wp-view");
  const oldActive = document.querySelector("[data-active='true']");
  const idActive = oldActive.getAttribute("data-id");
  const nbItems = allCarItem.length - 1;

  oldActive && oldActive.removeAttribute("data-active");
  if (Number(idActive) == nbItems && isNxt) {
    // Sup à 10
    const activeArticle = document.querySelector(`[data-id='0']`);
    activeArticle.setAttribute("data-active", true);
    allCarItem.forEach((item) => {
      item.style.transform = `translateX(0)`;
      item.setAttribute("data-offset", "0");
    });
  } else if (Number(idActive) == 0 && !isNxt) {
    // Inf à 0
    const activeArticle = document.querySelector(
      `[data-id='${Number(nbItems)}']`
    );
console.log(activeArticle);
    activeArticle.setAttribute("data-active", true);
    allCarItem.forEach((item) => {
      item.style.transform = `translateX(calc(${nbItems*-1050}px))`;
      item.setAttribute("data-offset", `${nbItems*-1050}`);
    });
  } else {
    // Etat normal
    console.log(isNxt);
    const activeArticle = isNxt
      ? document.querySelector(`[data-id='${Number(idActive) + 1}']`)
      : document.querySelector(`[data-id='${Number(idActive) - 1}']`);
      console.log(activeArticle);
    oldActive && oldActive.removeAttribute("data-active");
    activeArticle.setAttribute("data-active", true);
    allCarItem.forEach((item) => {
      itemOffSet = item.getAttribute("data-offset");
      itemIndex = item.getAttribute("data-id");
      let calc = isNxt ? Number(itemOffSet) - 1050 : Number(itemOffSet) + 1050;
      item.style.transform = `translateX(${calc}px)`;
      item.setAttribute("data-offset", calc);
    });
  }
};

async function init() {
  const photographWp = document.querySelector(".photograph-wp");
  // Récupère les datas des photographes
  const getAuthor = new URLSearchParams(document.location.search);
  const idAuthor = Number(getAuthor.get("id"));
  const { media, photographers } = await getPhotographer();
  const authorImgs = getAuthorImgs(media, idAuthor);
  const author = getAuthorById(idAuthor, photographers);
  const allRadioFilter = document.querySelectorAll("input[name='filter']");
  const carPrev = document.querySelector("#prev");
  const carNext = document.querySelector("#next");

  document.addEventListener("keydown", e => { 
    const modalShow = document.querySelector(".modalwp-lightbox");
    
    if (modalShow.className.includes("modalwp--show")) {
      console.log(e.key);
      if (e.key == "ArrowLeft") {
        carouselArrow();
      }
      if (e.key == "ArrowRight") {
        carouselArrow(true);
      }
      if (e.key == "Escape") {
        modalShow.classList.remove("modalwp--show");
      }
    }
})
  displayData(authorImgs, author);

  allRadioFilter.forEach((radio) => {
    radio.addEventListener("input", (e) => {
      switch (radio.value) {
        case "popularite":
          console.log("pop");
          filterImgs(authorImgs, compareByPop, author, photographWp);
          break;
        case "date":
          console.log("date");
          filterImgs(authorImgs, compareByDate, author, photographWp);
          break;
        case "titre":
          console.log("titre");
          filterImgs(authorImgs, compareByTitle, author, photographWp);
          break;
        default:
          console.log("default");
          break;
      }
    });
  });

  carPrev.addEventListener("click", (e) => {
    carouselArrow();
  });
  carNext.addEventListener("click", (e) => {
    carouselArrow(true);
  });
}

init();
