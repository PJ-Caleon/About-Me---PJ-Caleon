function getBasePath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (window.location.hostname.includes("github.io") && parts.length > 0) {
    return `/${parts[0]}/`; // Repo name
  }
  return "/";
}

async function loadPage(page) {
  const main = document.querySelector("main");

  main.classList.remove("show", "slide-in");
  main.classList.add("slide-out");
  await new Promise((r) => setTimeout(r, 400));

  const res = await fetch(`${getBasePath()}pages/${page}.html`);
  const html = await res.text();
  main.innerHTML = html;

  // Parse HTML for scripts & styles
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Load styles
  const links = temp.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => {
    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    if (link.href.startsWith("http")) {
      newLink.href = link.href;
    } else {
      newLink.href = getBasePath() + link.getAttribute("href").replace(/^\/+/, "");
    }
    document.head.appendChild(newLink);
  });

  // Load scripts
  const scripts = temp.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    if (oldScript.src) {
      if (oldScript.src.startsWith("http")) {
        newScript.src = oldScript.src;
      } else {
        newScript.src = getBasePath() + oldScript.getAttribute("src").replace(/^\/+/, "");
      }
    } else {
      newScript.textContent = oldScript.textContent;
    }
    document.body.appendChild(newScript);
  });

  // Special case for resume
  if (page === "resume") {
    const script = document.createElement("script");
    script.src = `${getBasePath()}assets/js/download.js`;
    document.body.appendChild(script);
  }

  // Special case for projects
  if (page === "projects") {
    const script = document.createElement("script");
    script.src = `${getBasePath()}assets/js/project.js`;
    document.body.appendChild(script);
  }

  main.classList.remove("slide-out");
  main.classList.add("slide-in");
  setTimeout(() => {
    main.classList.remove("slide-in");
    main.classList.add("show");
  }, 50);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-page]");
  if (!link) return;
  e.preventDefault();
  const page = link.getAttribute("data-page");
  loadPage(page);
});
