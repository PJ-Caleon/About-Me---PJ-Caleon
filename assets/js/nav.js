async function loadPage(page) {
  const main = document.querySelector("main");

  // Slide out
  main.classList.remove("show", "slide-in");
  main.classList.add("slide-out");

  // Wait for animation to finish
  await new Promise((r) => setTimeout(r, 400));

  // Load new page HTML
  const res = await fetch(`pages/${page}.html`);
  const html = await res.text();
  main.innerHTML = html;

  // ✅ If loading resume, manually inject download.js
  if (page === "resume") {
    const script = document.createElement("script");
    script.src = "assets/js/download.js";
    script.onload = () => {
      console.log("✅ download.js loaded manually");
      if (typeof setupDownloadButton === "function") {
        console.log("💡 Running setupDownloadButton()...");
        setupDownloadButton();
      } else {
        console.warn("❌ setupDownloadButton is not defined");
      }
    };
    script.onerror = () => {
      console.error("❌ Failed to load /assets/js/download.js");
    };
    document.body.appendChild(script);
  }

  // ✅ Also handle inline or other script tags in loaded HTML
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const scripts = temp.querySelectorAll("script");

  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");

    if (oldScript.src) {
      // Resolve relative paths
      let resolvedSrc = oldScript.src;
      if (!resolvedSrc.startsWith("http") && !resolvedSrc.startsWith("")) {
        resolvedSrc = `assets/js/${resolvedSrc.split("/").pop()}`;
      }
      newScript.src = resolvedSrc;
    } else {
      newScript.textContent = oldScript.textContent;
    }

    document.body.appendChild(newScript);

    if (page === "projects") {
  const script = document.createElement("script");
  script.src = "assets/js/project.js";
  script.onload = () => {
    console.log("✅ project.js loaded manually");
    if (typeof loadProjects === "function") {
      console.log("💡 Running loadProjects()...");
      loadProjects();
    } else {
      console.warn("❌ loadProjects is not defined");
    }
  };
  script.onerror = () => {
    console.error("❌ Failed to load /assets/js/project.js");
  };
  document.body.appendChild(script);
}

  });

  // Slide in animation
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

// Handle clicks on navigation items
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-page]");
  if (!link) return;
  e.preventDefault();
  const page = link.getAttribute("data-page");
  loadPage(page);
});
