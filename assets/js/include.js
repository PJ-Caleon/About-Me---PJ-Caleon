// include.js — Dynamically loads HTML components
async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Get the GitHub repo name from the URL
const base = window.location.pathname.split("/")[1]; // e.g., "pj-portfolio"
const root = `/${base}/`; // Ensures there's a leading + trailing slash

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("nav-slot", `${root}components/nav.html`);
  loadComponent("header-slot", `${root}components/header.html`);
  loadComponent("footer-slot", `${root}components/footer.html`);
});
