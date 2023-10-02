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
  lightboxWP.setAttribute("role", "list");
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
  lightboxArticle.forEach((article) => article.remove());
  authorImgs.forEach((img, i) => {
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

function caseSelect(toCompare, authorImgs, author, photographWp) {
  switch (toCompare) {
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
    activeArticle.setAttribute("data-active", true);
    allCarItem.forEach((item) => {
      item.style.transform = `translateX(calc(${nbItems * -1050}px))`;
      item.setAttribute("data-offset", `${nbItems * -1050}`);
    });
  } else {
    // Etat normal
    const activeArticle = isNxt
      ? document.querySelector(`[data-id='${Number(idActive) + 1}']`)
      : document.querySelector(`[data-id='${Number(idActive) - 1}']`);
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
  const isVideo = document.querySelector("[data-active='true'] video");
  isVideo && isVideo.focus();
};

const displaySelect = (cSelect) => {
  const cSelectList = document.querySelector(".custom-select-list");
  if (cSelectList.classList.contains("custom-select-list--show")) {
    cSelect.setAttribute("aria-expanded", false);
    cSelectList.classList.remove("custom-select-list--show");
  } else {
    cSelectList.classList.add("custom-select-list--show");
    cSelect.setAttribute("aria-expanded", true);
  }
};

const handleSort = (cSelect,labelSort, authorImgs, author, photographWp) => {
  const c = document.querySelector(".custom-select-list");
  console.log(c);
  console.log(cSelect);
  c.classList.remove("custom-select-list--show");
  cSelect.setAttribute("aria-expanded", false);
  let attr = labelSort.getAttribute("data-sort");
  caseSelect(attr, authorImgs, author, photographWp);
};

/* INIT PAGE */
async function init() {
  const photographWp = document.querySelector(".photograph-wp");
  // Récupère les datas des photographes
  const getAuthor = new URLSearchParams(document.location.search);
  const idAuthor = Number(getAuthor.get("id"));
  const { media, photographers } = await getPhotographer();
  const authorImgs = getAuthorImgs(media, idAuthor);
  const author = getAuthorById(idAuthor, photographers);
  const allLabelSort = document.querySelectorAll("label[data-sort]");
  const carPrev = document.querySelector("#prev");
  const carNext = document.querySelector("#next");
  const cSelect = document.querySelector(".custom-select-legend");

  // Display 
  displayData(authorImgs, author);

  /*  
    Init Modal behaviour 
    Keyboard mapping => Escape & ArrowLeft/ArrowRight
  */
  document.addEventListener("keydown", (e) => {
    const allModalShow = document.querySelectorAll(".modalwp");
    allModalShow.forEach((modalShow) => {
      if (modalShow.className.includes("modalwp--show")) {
        if (e.key == "Escape") {
          modalShow.classList.remove("modalwp--show");
          const main = document.querySelector("main");
          const header = document.querySelector(".header");
          const body = document.querySelector(".body");
          body.classList.remove("body--hidden");
          modalShow.setAttribute("aria-hidden", "true");
          header.setAttribute("aria-hidden", "false");
          main.setAttribute("aria-hidden", "false");
        }
        if (
          e.key == "ArrowLeft" &&
          modalShow.className.includes("modalwp-lightbox")
        ) {
          carouselArrow();
        }
        if (
          e.key == "ArrowRight" &&
          modalShow.className.includes("modalwp-lightbox")
        ) {
          carouselArrow(true);
        }
      }
    });
  });
 
  /* Carousel -- Arrow's behaviour on click */
  carPrev.addEventListener("click", (e) => {
    carouselArrow();
  });
  carNext.addEventListener("click", (e) => {
    carouselArrow(true);
  });

  /* Custom Select -- Hide/Show Dropdown Events */
  cSelect.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      displaySelect(cSelect);
    }
  });
  cSelect.addEventListener("click", (e) => {
    displaySelect(cSelect);
  });

  /* Custom Select Inputs -- Sort Events */
  allLabelSort.forEach((labelSort) => {
    labelSort.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        handleSort(cSelect, labelSort, authorImgs, author, photographWp);
      }
    });
    labelSort.addEventListener('click', (e) => {
      handleSort(cSelect, labelSort,authorImgs, author, photographWp);
    })
  });
}

init();
