async function loadPage(page) {
  const main = document.querySelector("main");

  main.classList.remove("show", "slide-in");
  main.classList.add("slide-out");
  await new Promise((r) => setTimeout(r, 400));

  const res = await fetch(`${getBasePath()}pages/${page}.html`);
  const html = await res.text();

  // Create a temp DOM from the HTML string
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Fix <link> CSS paths before adding to DOM
  temp.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    if (!link.href.startsWith("http")) {
      link.href = getBasePath() + link.getAttribute("href").replace(/^\/+/, "");
    }
    document.head.appendChild(link);
    link.remove(); // remove from temp so it’s not in main.innerHTML
  });

  // Fix <script> paths before adding to DOM
  temp.querySelectorAll("script").forEach((script) => {
    const newScript = document.createElement("script");
    if (script.src) {
      if (!script.src.startsWith("http")) {
        newScript.src = getBasePath() + script.getAttribute("src").replace(/^\/+/, "");
      } else {
        newScript.src = script.src;
      }
    } else {
      newScript.textContent = script.textContent;
    }
    document.body.appendChild(newScript);
    script.remove();
  });

  // Now insert the cleaned HTML into main
  main.innerHTML = temp.innerHTML;

  main.classList.remove("slide-out");
  main.classList.add("slide-in");
  setTimeout(() => {
    main.classList.remove("slide-in");
    main.classList.add("show");
  }, 50);
}
