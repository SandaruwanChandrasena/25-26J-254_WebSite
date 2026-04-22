/* ===============================
   SCROLL PROGRESS BAR
================================ */
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }
});

/* ===============================
   BACK TO TOP BUTTON
================================ */
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

/* ===============================
   SCROLL REVEAL ANIMATION
================================ */
const revealElements = document.querySelectorAll(".reveal, .fade-up, .fade-in");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ===============================
   LOAD MILESTONES FROM JSON
================================ */
fetch("data/milestones.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("milestonesAccordion");

    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("accordion-item");

      div.innerHTML = `
        <div class="accordion-header">
          ${item.title}
        </div>
        <div class="accordion-body">
          <p><strong>Date:</strong> ${item.date}</p>
          <p><strong>Marks:</strong> ${item.marks}</p>
          <p>${item.description}</p>
          <div class="accordion-links">
            ${item.links
              .map(
                (link) =>
                  `<a href="${link.url}" target="_blank" class="btn btn-small">${link.label}</a>`
              )
              .join("")}
          </div>
        </div>
      `;

      container.appendChild(div);
    });
  });

/* ===============================
   LOAD DOWNLOADS FROM JSON
================================ */
fetch("data/downloads.json")
  .then((res) => res.json())
  .then((data) => {
    const docGrid = document.getElementById("documentsGrid");
    const presGrid = document.getElementById("presentationsGrid");
    const markGrid = document.getElementById("markingGrid");

    data.documents.forEach((item) => {
      docGrid.innerHTML += createDownloadCard(item);
    });

    data.presentations.forEach((item) => {
      presGrid.innerHTML += createDownloadCard(item);
    });

    data.marking.forEach((item) => {
      markGrid.innerHTML += createDownloadCard(item);
    });
  });

function createDownloadCard(item) {
  return `
    <div class="glass-card download-card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank" class="btn btn-primary btn-small">
        Open
      </a>
    </div>
  `;
}

/* ===============================
   LOAD TEAM FROM JSON
================================ */
fetch("data/team.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("teamGrid");

    data.forEach((member) => {
      container.innerHTML += `
        <div class="person-card glass-card">
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.id}</p>
          <p class="role">${member.role}</p>
        </div>
      `;
    });
  });