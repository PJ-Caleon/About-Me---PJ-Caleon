(() => {
  if (window._projectsAlreadyLoaded) return;
  window._projectsAlreadyLoaded = true;

  const projectRoot = "/projects/";
  let _projectsRendered = false;

  async function loadProjects() {
    if (_projectsRendered) return;
    _projectsRendered = true;

    console.trace("📦 loadProjects called from:");
    
    const projectList = ["test", "test2"];
    const container = document.querySelector("main");
    if (!container) return;

    container.innerHTML = "<h1>My Projects</h1><br />";
    for (const name of projectList) {
      try {
        const res = await fetch(`${projectRoot}${name}/data.json`);
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

  // Global export
  window.loadProjects = loadProjects;

  // Optionally auto-invoke once
  window.addEventListener("DOMContentLoaded", () => {
    loadProjects();
  });
})();
