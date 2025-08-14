
---

## 📦 Folders & Files

### **Assets**
- **`assets/css/`** — All stylesheets (modular, page-specific, plus `style.css` for shared styles).
- **`assets/images/`** — All static images and documents (profile picture, resume PDF, thumbnails).
- **`assets/js/`** — JavaScript logic:
  - `main.js` — Core scripts for page behavior.
  - `nav.js` — Handles dynamic page navigation with animations.
  - `include.js` — Injects reusable HTML components.
  - `download.js` — Manages resume download functionality.
  - `project.js` — Loads and displays project data dynamically.

---

### **Components**
Reusable HTML blocks:
- `header.html` — Website header/banner.
- `nav.html` — Navigation menu.
- `footer.html` — Footer section.

---

### **Pages**
Full content pages (loaded dynamically via `nav.js`):
- `about.html` — Personal bio & skill highlights.
- `resume.html` — Education, work experience, and downloadable resume.
- `projects.html` — Portfolio of projects.
- `socials.html` — Links to social platforms.

---

### **Projects**
- Contains individual project folders, each with:
  - `data.json` — Project metadata (title, description, tech stack).
  - Thumbnail images or other project-specific media.

---

## 🚀 Features
- **Dynamic navigation** (no full-page reloads) using `nav.js`.
- **Reusable components** with `include.js`.
- **Smooth CSS animations** via `transitions.css`.
- **GitHub Pages friendly** — all asset paths relative.
- **Mobile responsive** with clean, minimalist design.

---

## 📌 Usage
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/About-Me---PJ-Caleon.git
