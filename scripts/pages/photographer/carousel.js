export const carouselArrow = (isNxt = false) => {
  const allCarItem = document.querySelectorAll(".modal-wp-view");
  const oldActive = document.querySelector("[data-active='true']");
  const idActive = oldActive.getAttribute("data-id");
  const nbItems = allCarItem.length - 1;

  oldActive && oldActive.removeAttribute("data-active");
  if (Number(idActive) == nbItems && isNxt) {
    // Sup à 10
    const activeArticle = document.querySelector("[data-id='0']");
    activeArticle.setAttribute("data-active", true);
    allCarItem.forEach((item) => {
      item.style.transform = "translateX(0)";
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
      let itemOffSet = item.getAttribute("data-offset");
      let itemIndex = item.getAttribute("data-id");
      let calc = isNxt ? Number(itemOffSet) - 1050 : Number(itemOffSet) + 1050;
      item.style.transform = `translateX(${calc}px)`;
      item.setAttribute("data-offset", calc);
    });
  }
  const isVideo = document.querySelector("[data-active='true'] video");
  isVideo && isVideo.focus();
};