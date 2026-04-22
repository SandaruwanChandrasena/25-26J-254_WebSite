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
  const triggerBottom = window.innerHeight * 0.88;

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
          <div class="accordion-title-wrap">
            <span class="accordion-title">${item.title}</span>
            <div class="accordion-meta">
              <span class="accordion-chip">📅 ${item.date}</span>
              <span class="accordion-chip">🎯 ${item.marks}</span>
            </div>
          </div>
          <span class="accordion-icon">+</span>
        </div>
        <div class="accordion-body">
          <div class="accordion-content">
            <p>${item.description}</p>
            <div class="accordion-links">
              ${item.links
                .map(
                  (link) =>
                    `<a href="${link.url}" target="_blank" class="btn btn-small btn-outline">${link.label}</a>`,
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

      container.appendChild(div);
    });
  })
  .catch((err) => console.error("Failed to load milestones:", err));

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
      docGrid.innerHTML += createDownloadCard(item, "📄");
    });

    data.presentations.forEach((item) => {
      presGrid.innerHTML += createDownloadCard(item, "📊");
    });

    data.marking.forEach((item) => {
      markGrid.innerHTML += createDownloadCard(item, "📋");
    });
  })
  .catch((err) => console.error("Failed to load downloads:", err));

function createDownloadCard(item, icon = "📄") {
  const linksHTML = item.links
    .map((link) => {
      if (link.url === "COMING_SOON") {
        return `<span class="btn btn-small btn-outline" style="opacity:0.5;cursor:not-allowed;">Coming Soon</span>`;
      }
      return `<a href="${link.url}" target="_blank" class="btn btn-small btn-primary">${link.label}</a>`;
    })
    .join("");

  return `
    <div class="glass-card download-card">
      <div class="download-top">
        <div class="download-icon">${icon}</div>
        <h3>${item.title}</h3>
      </div>
      <p>${item.description}</p>
      <div class="download-actions">
        ${linksHTML}
      </div>
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

    if (!container) {
      console.error("teamGrid element not found");
      return;
    }

    container.innerHTML = ""; // clear any placeholder content

    data.forEach((member) => {
      const card = document.createElement("div");

      card.classList.add("team-card");

      card.innerHTML = `
  <div class="team-image">
    <img src="${member.image}" alt="${member.name}" 
         onerror="this.src='images/team/placeholder.jpg'" />
  </div>

  <div class="team-content">
    <h3>${member.name}</h3>

    <span class="team-role">${member.role}</span>

    <p><strong>Undergraduate</strong><br>
    Sri Lanka Institute of Information Technology</p>

    <p><strong>Department</strong><br>
    Software Engineering</p>
  </div>

  <div class="team-footer">
    <a href="${member.linkedin || "#"}" target="_blank">LinkedIn</a>
    <a href="mailto:${member.email || ""}">E-Mail</a>
  </div>
`;

      container.appendChild(card);
    });
  })
  .catch((err) => console.error("Failed to load team:", err));

/* ===============================
   OVERVIEW SWITCHER
================================ */
const thumbs = document.querySelectorAll(".overview-thumb");
const mainImage = document.getElementById("overviewMainImage");
const mainTitle = document.getElementById("overviewTitle");
const mainBadge = document.getElementById("overviewBadge");
const mainDesc = document.getElementById("overviewDescription");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    // Remove active from all
    thumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");

    // Fade out
    if (mainImage) {
      mainImage.style.opacity = "0";
      mainImage.style.transform = "scale(0.98)";
    }

    setTimeout(() => {
      if (mainImage) {
        mainImage.src = thumb.dataset.image;
        mainImage.alt = thumb.dataset.badge;
        mainImage.style.opacity = "1";
        mainImage.style.transform = "scale(1)";
      }
      if (mainTitle) mainTitle.textContent = thumb.dataset.title;
      if (mainBadge) mainBadge.textContent = thumb.dataset.badge;
      if (mainDesc) mainDesc.textContent = thumb.dataset.description;
    }, 280);
  });
});
