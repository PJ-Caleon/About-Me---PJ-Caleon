function getBasePath() {
  const repoName = "About-Me---PJ-Caleon"; // change to your repo name
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // Find the index of the repo in the URL
  const repoIndex = pathParts.indexOf(repoName);

  // Number of path segments after the repo folder
  const depthAfterRepo = pathParts.length - (repoIndex + 1);

  return depthAfterRepo > 0 ? "".repeat(depthAfterRepo) : "";
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
