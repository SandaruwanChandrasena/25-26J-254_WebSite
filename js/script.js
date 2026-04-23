/* ===============================
   SCROLL PROGRESS BAR
================================ */
const progressBar = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  if (progressBar) progressBar.style.width = pct + "%";
});

/* ===============================
   BACK TO TOP
================================ */
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTopBtn?.classList.add("show");
  else backToTopBtn?.classList.remove("show");
});

/* ===============================
   SCROLL REVEAL
================================ */
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.88;
  document.querySelectorAll(".reveal,.fade-up,.fade-in").forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) el.classList.add("active");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

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
    thumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
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

/* ===============================
   MILESTONES
================================ */
fetch("data/milestones.json")
  .then((r) => r.json())
  .then((data) => {
    const container = document.getElementById("milestonesAccordion");
    if (!container) return;
    data.forEach((item) => {
      const linksHTML = item.links
        .map((l) => createBtn(l.url, l.label))
        .join("");
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
            <div class="accordion-links">${linksHTML}</div>
          </div>
        </div>`;
      container.appendChild(div);
    });
  })
  .catch((err) => console.error("milestones.json:", err));

/* ===============================
   DOWNLOADS
================================ */
fetch("data/downloads.json")
  .then((r) => r.json())
  .then((data) => {
    const dg = document.getElementById("documentsGrid");
    const pg = document.getElementById("presentationsGrid");
    const mg = document.getElementById("markingGrid");
    data.documents?.forEach((i) => {
      if (dg) dg.innerHTML += createDownloadCard(i, "📄");
    });
    data.presentations?.forEach((i) => {
      if (pg) pg.innerHTML += createDownloadCard(i, "📊");
    });
    data.marking?.forEach((i) => {
      if (mg) mg.innerHTML += createDownloadCard(i, "📋");
    });
  })
  .catch((err) => console.error("downloads.json:", err));

function createDownloadCard(item, icon = "📄") {
  const links = (item.links || [])
    .map((l) => createBtn(l.url, l.label))
    .join("");
  return `
    <div class="glass-card download-card">
      <div class="download-top">
        <div class="download-icon">${icon}</div>
        <h3>${item.title}</h3>
      </div>
      <p>${item.description}</p>
      <div class="download-actions">${links}</div>
    </div>`;
}

function createBtn(url, label) {
  if (!url || url === "COMING_SOON")
    return `<span class="btn btn-small btn-outline btn-disabled">${label}</span>`;
  return `<a href="${url}" target="_blank" class="btn btn-small btn-primary">${label}</a>`;
}

/* ===============================
   TEAM
================================ */
fetch("data/team.json")
  .then((r) => r.json())
  .then((data) => {
    const container = document.getElementById("teamGrid");
    if (!container) {
      console.error("#teamGrid not found");
      return;
    }
    container.innerHTML = "";
    data.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("team-card");

      const linkedin = member.linkedin
        ? `<a href="${member.linkedin}" target="_blank" class="team-link">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
             LinkedIn
           </a>`
        : `<span class="team-link-disabled">LinkedIn</span>`;

      const email = member.email
        ? `<a href="mailto:${member.email}" class="team-link">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
             E-Mail
           </a>`
        : `<span class="team-link-disabled">E-Mail</span>`;

      card.innerHTML = `
        <div class="team-image">
          <img src="${member.image}" alt="${member.name}"
               onerror="this.style.display='none';this.parentElement.style.cssText='height:160px;background:#eef4fb;display:flex;align-items:center;justify-content:center;font-size:2.5rem;';" />
        </div>
        <div class="team-content">
          <div class="team-card-top">
            <span class="team-role">${member.role}</span>
          </div>
          <h3>${member.name}</h3>
          <p class="team-member-id">Student ID: ${member.id}</p>
          <p class="team-dept">Sri Lanka Institute of Information Technology</p>
        </div>
        <div class="team-footer">
          ${linkedin}
          ${email}
        </div>`;
      container.appendChild(card);
    });
    revealOnScroll();
  })
  .catch((err) => {
    console.error("team.json:", err);
    const c = document.getElementById("teamGrid");
    if (c)
      c.innerHTML = `<p style="grid-column:1/-1;color:#e53935;padding:16px 0;">⚠️ Could not load team data. Check <strong>data/team.json</strong> exists.</p>`;
  });
