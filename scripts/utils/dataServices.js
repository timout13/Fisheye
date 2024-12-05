async function getPhotographerData(idAuthor) {

  const {media, photographers} = await fetchAll();
  const authorImgs = getAuthorImgs(media, idAuthor);
  const author = getAuthorById(idAuthor, photographers);
  return {authorImgs, author};
}
async function getPhotographersData() {

  const {media, photographers} = await fetchAll();
  return {media, photographers};
}
async function fetchAll(){
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
  } catch(err) {
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
export {getPhotographerData, getPhotographersData};