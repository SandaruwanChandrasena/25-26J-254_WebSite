/* ===============================
   TABS FUNCTIONALITY (Downloads)
================================ */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    // Remove active from all buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Hide all contents
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    // Show selected tab
    const activeContent = document.getElementById(target);
    if (activeContent) {
      activeContent.classList.add("active");
    }
  });
});