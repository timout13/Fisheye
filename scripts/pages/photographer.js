//Mettre le code JavaScript lié à la page photographer.html
let params = new URLSearchParams(document.location.search);

async function getPhotographer() {
    let url = "../../data/photographers.json";
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
      body:{id:params.get("id")}
    };
    try {
      let allMembersOrigin = await fetch(url, options);
      let allMembers = await allMembersOrigin.json();
      return allMembers;
    } catch {
      console.log(err);
    }
}
  
async function init() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographer();
    //displayData(photographers);
    console.log(photographer);
  }
  
  init();