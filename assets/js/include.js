// include.js — Dynamically loads HTML components
async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Load all components
window.addEventListener("DOMContentLoaded", () => {
  loadComponent("nav-slot", "/About-Me---PJ-Caleon/components/nav.html");
  loadComponent("header-slot", "/About-Me---PJ-Caleon/components/header.html");
  loadComponent("footer-slot", "/About-Me---PJ-Caleon/components/footer.html");
});
