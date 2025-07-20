// include.js — Dynamically loads HTML components
async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Load all components
window.addEventListener("DOMContentLoaded", () => {
  loadComponent("nav-slot", "components/nav.html");
  loadComponent("header-slot", "components/header.html");
  loadComponent("footer-slot", "components/footer.html");
});
