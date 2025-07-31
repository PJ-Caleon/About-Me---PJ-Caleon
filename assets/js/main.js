async function loadProjects() {
  const container = document.getElementById('project-list');
  const folders = ['project1', 'project2']; // or fetched via JS if hosted dynamically

  for (const folder of folders) {
    const res = await fetch(`/${folder}/data.json`);
    const data = await res.json();

    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <img src="${folder}/${data.image}" width="100%">
      <p><a href="${data.github}" target="_blank">View on GitHub</a></p>
    `;
    container.appendChild(card);
  }
}

if (window.location.pathname.includes('/projects.html')) {
  loadProjects();
}