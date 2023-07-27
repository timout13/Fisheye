async function getPhotographer() {
  let url = "../../data/photographers.json";
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
  const { priceTag } = photographerModel.getAuthorBlock();
  let totalLikes = 0;
  authorImgs.forEach((img) => {
    let srcMedia = getMediaPath(author, img);
    imageTemplate(photographWP,img, srcMedia);
    totalLikes += img.likes;
  });
  getPriceAndLikesBlock(totalLikes, priceTag);
}
 function displaySortedData(authorImgs, author) {
  const photographWP = document.querySelector(".photograph-wp");
  let divWpArray = [];
  authorImgs.forEach((img) => {
    let srcMedia = getMediaPath(author, img);
    divWpArray.push(imageTemplate(photographWP,img, srcMedia,true));
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
  }
  else if (titleA > titleB) {
    return -1;
  }
  return 0;
}
function compareByDate(a, b) {
  const titleA = a.date;
  const titleB = b.date;

  if (titleA < titleB) {
    return 1;
  }
  else if (titleA > titleB) {
    return -1;
  }
  return 0;
}

const filterImgs = (authorImgs ,compareFunc, author, photographWp) => {
  authorImgs.sort(compareFunc);
  let dataSorted = displaySortedData(authorImgs, author);
  photographWp.replaceChildren(...dataSorted);
}

async function init() {
  const selectSim = document.querySelector(".click");
  const photographWp = document.querySelector(".photograph-wp");
  // Récupère les datas des photographes
  const getAuthor = new URLSearchParams(document.location.search);
  const idAuthor = Number(getAuthor.get("id"));
  const { media, photographers } = await getPhotographer();
  const authorImgs = getAuthorImgs(media, idAuthor);
  
  const author = getAuthorById(idAuthor, photographers);
  displayData(authorImgs, author);

  const allRadioFilter = document.querySelectorAll("input[name='filter']");
  allRadioFilter.forEach(radio => {   
    radio.addEventListener("input",(e)=> {
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
        default:console.log("default");
          break;
      }
    })
  })
}

init();
