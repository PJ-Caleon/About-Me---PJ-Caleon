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
    link.href = "/assets/images/Philip_Jeremiah_Caleon_Resume.pdf";
    link.download = "Philip_Jeremiah_Caleon_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
