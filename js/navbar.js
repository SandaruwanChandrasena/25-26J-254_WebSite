/* ===============================
   NAVBAR TOGGLE (MOBILE)
================================ */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
  });
}

/* Close menu when a link is clicked */
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("open");
    navToggle?.classList.remove("open");
  });
});

/* ===============================
   ACTIVE LINK ON SCROLL
================================ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* Active section highlight */
  let current = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  /* Elevated shadow when scrolled */
  const header = document.querySelector(".header");
  if (header) {
    if (scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});
