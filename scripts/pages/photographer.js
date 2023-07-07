//Mettre le code JavaScript lié à la page photographer.html

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

async function displayData(authorImgs, author) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographWP = document.querySelector(".photograph-wp");
  const photographerModel = photographerTemplate(author);
  const { img, h2, location, catchPhrase, priceTag } =
  photographerModel.getAuthorBlock();
  photographersSection.append(img, h2, location, catchPhrase, priceTag);
  authorImgs.forEach(img => {
    const imgElement = imageTemplate(img);
    photographWP.appendChild(imgElement);
  })
}

async function init() {
  // Récupère les datas des photographes
  const getAuthor = new URLSearchParams(document.location.search);
  const idAuthor = Number(getAuthor.get("id"));
  const { media, photographers } = await getPhotographer();
  const authorImgs = getAuthorImgs(media, idAuthor);

  const author = getAuthorById(idAuthor, photographers);
  displayData(authorImgs, author);
}

init();
