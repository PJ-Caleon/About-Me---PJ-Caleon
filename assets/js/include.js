// include.js
document.addEventListener("DOMContentLoaded", function () {
  includeHTML();
});

function getBasePath() {
  // Detect repo name from the first folder in the URL path
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  if (window.location.hostname.includes("github.io") && pathParts.length > 0) {
    return `/${pathParts[0]}/`;
  }
  // Localhost or root hosting
  return "/";
}

function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  const basePath = getBasePath();

  elements.forEach((el) => {
    const file = el.getAttribute("data-include");
    if (file) {
      const url = `${basePath}${file.replace(/^\/+/, "")}`; // remove leading slashes from file paths

      fetch(url)
        .then((response) => {
          if (response.ok) return response.text();
          throw new Error(`Page not found: ${url}`);
        })
        .then((html) => {
          el.innerHTML = html;
          el.removeAttribute("data-include");
          includeHTML(); // recursive load for nested includes
        })
        .catch((error) => {
          console.error(error);
          el.innerHTML = "Content not found.";
        });
    }
  });
}
