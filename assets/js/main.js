/* ===============================
   Easy & Light Recipes - Main JS
   Purpose: UX + Tracking (Safe)
================================ */

(function () {
  "use strict";

  /* ===============================
     1. CTA Click Tracking
     (Local only – no external tools)
  ================================ */
  const ctaButton = document.querySelector(".cta-button");

  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      try {
        let count = localStorage.getItem("cta_clicks");
        count = count ? parseInt(count, 10) + 1 : 1;
        localStorage.setItem("cta_clicks", count);
      } catch (e) {
        // Fail silently
      }
    });
  }

  /* ===============================
     2. Simple Page View Counter
     (Per page – local)
  ================================ */
  try {
    const pageKey = "views_" + window.location.pathname;
    let views = localStorage.getItem(pageKey);
    views = views ? parseInt(views, 10) + 1 : 1;
    localStorage.setItem(pageKey, views);
  } catch (e) {
    // Fail silently
  }

  /* ===============================
     3. External Links Safety
     (Open in new tab)
  ================================ */
  const links = document.querySelectorAll("a[href^='http']");

  links.forEach(function (link) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

})();


document.addEventListener("DOMContentLoaded", function () {
  const recipesPerPage = 6;
  const grid = document.getElementById("recipesGrid");
  const items = Array.from(grid.children);
  const pagination = document.getElementById("pagination");

  const totalPages = Math.ceil(items.length / recipesPerPage);
  let currentPage = 1;

  function showPage(page) {
    currentPage = page;

    items.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * recipesPerPage &&
        index < page * recipesPerPage
          ? "block"
          : "none";
    });

    renderPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPagination() {
    pagination.innerHTML = "";

    // Prev button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => showPage(currentPage - 1);
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => showPage(i);
      pagination.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next →";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => showPage(currentPage + 1);
    pagination.appendChild(nextBtn);
  }

  showPage(1);
});
