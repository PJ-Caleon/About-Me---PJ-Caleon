(() => {
  // ✅ Prevent redeclaration if script is injected again
  if (window._projectsAlreadyLoaded) return;
  window._projectsAlreadyLoaded = true;

  const projectRoot = "/projects/";

  async function loadProjects() {
    console.log("📦 Loading project cards...");
    
    const projectList = ["test"]; // 🔧 Add more folder names here
    const container = document.querySelector("main");

    if (!container) {
      console.warn("⚠️ <main> container not found.");
      return;
    }

    container.innerHTML = "<h1>My Projects</h1><br />"; // Clear or set header

    for (const name of projectList) {
      try {
        const res = await fetch(`${projectRoot}${name}/data.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
          <h2>${data.title}</h2>
          <img src="${projectRoot}${name}/${data.image}" alt="${data.title}" class="project-image" />
          <p>${data.description}</p>
          ${data.materials ? `<p><strong>Materials:</strong> ${data.materials}</p>` : ""}
          ${data.github ? `<a href="${data.github}" target="_blank">🔗 GitHub</a>` : ""}
          <hr />
        `;

        container.appendChild(card);
      } catch (err) {
        console.error(`❌ Failed to load project "${name}":`, err);
      }
    }
  }

  // ✅ Make it available globally so nav.js can call it
  window.loadProjects = loadProjects;
})();
