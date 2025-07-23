console.log("✅ download.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("downloadBtn");

  if (!button) {
    console.error("❌ Download button not found");
    return;
  }

  console.log("✅ Button found");

  button.addEventListener("click", () => {
    console.log("📄 Button clicked!");

    const element = document.querySelector(".resume-container");
    if (!element) {
      console.error("❌ Resume container not found");
      return;
    }

    const opt = {
      margin:       0.5,
      filename:     'Philip_Jeremiah_Caleon_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  });
});
