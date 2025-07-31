(() => {
  const projectRoot = "/projects/";
  
  async function loadProjects() {
    // Always allow, unless you want to cache on the same page instance.
    console.trace("📦 loadProjects called from:");

    const projectList = [
      "CarParkingCounter",
      "DownCounter",
      "FaceTracker",
      "SmartIOTTrashbin",
      "GloveController",
      "SuperSonic"
    ];
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
          ${data.document ? `<a href="${data.document}" target="_blank">🔗 Documentation</a>` : ""}
          <hr />
        `;
        container.appendChild(card);
      } catch (err) {
        console.error(`❌ Failed to load project "${name}":`, err);
      }
    }
  }
  window.loadProjects = loadProjects;
  window.addEventListener("DOMContentLoaded", () => {
    loadProjects();
  });
})();