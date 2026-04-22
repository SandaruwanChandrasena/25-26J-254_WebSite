/* ===============================
   ACCORDION FUNCTIONALITY
================================ */
document.addEventListener("click", (event) => {
  const header = event.target.closest(".accordion-header");
  if (!header) return;

  const item = header.parentElement;
  const body = item.querySelector(".accordion-body");
  const allItems = document.querySelectorAll(".accordion-item");

  allItems.forEach((accordionItem) => {
    const accordionBody = accordionItem.querySelector(".accordion-body");

    if (accordionItem !== item) {
      accordionItem.classList.remove("active");
      if (accordionBody) {
        accordionBody.style.maxHeight = null;
      }
    }
  });

  item.classList.toggle("active");

  if (item.classList.contains("active")) {
    body.style.maxHeight = body.scrollHeight + "px";
  } else {
    body.style.maxHeight = null;
  }
});