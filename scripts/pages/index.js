async function getPhotographers() {
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

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
