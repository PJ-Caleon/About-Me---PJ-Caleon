function getBasePath() {
  const repoName = "portfolio"; // change to your repo name
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // If running locally (no repo name in path), depth is length - 1
  let depth;
  if (!pathParts.includes(repoName)) {
    depth = pathParts.length - 1;
  } else {
    depth = pathParts.length - pathParts.indexOf(repoName) - 1;
  }

  return depth > 0 ? "../".repeat(depth) : "";
}

async function loadComponent(id, path) {
  const res = await fetch(getBasePath() + path);
  if (!res.ok) {
    console.error(`Failed to load ${path}: ${res.status}`);
    return;
  }
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("nav-slot", "components/nav.html");
  loadComponent("header-slot", "components/header.html");
  loadComponent("footer-slot", "components/footer.html");
});
