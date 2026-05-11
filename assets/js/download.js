function setupDownloadButton() {
  console.log("✅ download.js loaded");

  const button = document.getElementById("downloadBtn");
  if (!button) {
    console.error("Download button not found.");
    return;
  }

  button.addEventListener("click", () => {
    console.log("📄 Downloading resume PDF...");
    const link = document.createElement("a");
    link.href = "/assets/images/PhilipJeremiahCaleon_RESUME.pdf";
    link.download = "PhilipJeremiahCaleon_RESUME.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
