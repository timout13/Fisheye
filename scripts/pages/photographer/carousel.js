/**
 * @summary Handle the carousel prev/next logic.
 * @param isNxt
 */
export const carouselArrow = (isNxt = false) => {
  const allCarItem = document.querySelectorAll(".modal-wp-view");
  const oldActive = document.querySelector("[data-active='true']");

  if (!oldActive)
    return;
  oldActive.removeAttribute("data-active");

  const nbItems = allCarItem.length - 1;
  const idActive = Number(oldActive.getAttribute("data-id"));
  const direction = isNxt ? 1 : -1;
  let newActiveId= 0;
  if (idActive === nbItems && isNxt) {
    // Get to the start of the carousel
    allCarItem.forEach((item) => {
      item.style.transform = "translateX(0)";
      item.setAttribute("data-offset", "0");
    });
  } else if (idActive === 0 && !isNxt) {
    // Get to the end of the carousel
    newActiveId= nbItems;
    allCarItem.forEach((item) => {
      item.style.transform = `translateX(calc(${nbItems * -1050}px))`;
      item.setAttribute("data-offset", `${nbItems * -1050}`);
    });
  } else {
    // Normal state
    newActiveId = idActive + direction;
    allCarItem.forEach((item) => {
      const itemOffSet = Number(item.getAttribute("data-offset"));
      const calc = isNxt ? itemOffSet - 1050 : itemOffSet + 1050;
      item.style.transform = `translateX(${calc}px)`;
      item.setAttribute("data-offset", calc);
    });
  }
  const activeArticle = document.querySelector(`[data-id='${newActiveId}']`);
  activeArticle.setAttribute("data-active", true);
  const isVideo = document.querySelector("[data-active='true'] video");
  isVideo && isVideo.focus();
};