async function loadPage(page) {
  const main = document.querySelector("main");

  // Slide out
  main.classList.remove("show", "slide-in");
  main.classList.add("slide-out");

  // Wait for animation to finish
  await new Promise(r => setTimeout(r, 400));

  // Load new content
  const res = await fetch(`/pages/${page}.html`);
  const html = await res.text();
  main.innerHTML = html;

  // Slide in
  main.classList.remove("slide-out");
  main.classList.add("slide-in");

  setTimeout(() => {
    main.classList.remove("slide-in");
    main.classList.add("show");
  }, 50);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.classList.remove("slide-in");
      main.classList.add("show");
    });
  });
}

// Handle clicks on nav items
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-page]");
  if (!link) return;
  e.preventDefault();
  const page = link.getAttribute("data-page");
  loadPage(page);
});
