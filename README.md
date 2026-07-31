# Portfolio Architecture & Analysis

A blazing-fast, custom-built portfolio designed to showcase Full-Stack and AI Pipeline capabilities. This project eschews heavy framework overhead for raw performance and precision UI control.

## 🏗️ System Architecture

This project is built using a **Vite + Vanilla Web Stack** architecture.

- **Frontend Core:** HTML5, modern CSS3 (Custom Properties, Flexbox/Grid), and Vanilla ES6+ JavaScript.
- **Build Tooling:** [Vite](https://vitejs.dev/), configured for lightning-fast HMR during development and aggressive minification (HTML, CSS, JS) for production.
- **Styling:** Highly custom CSS with fluid typography, logical properties, and hardware-accelerated animations (no Tailwind overhead).
- **Interactions:** Custom cursor logic, scroll-driven animations (Intersection Observer), and dynamic DOM injection (Command Palette, Modals).

---

## ⚖️ Architectural Trade-offs (The Good & The Bad)

### ✅ The Good (Pros)
- **Zero-Dependency Core:** Aside from Vite (which only runs at build time) and a lightweight EmailJS CDN link, there are no runtime dependencies. This translates to near-instant page load times.
- **Total Creative Control:** Writing vanilla CSS and JS allows for bespoke, microscopic animations and a completely unique aesthetic that component libraries often restrict.
- **SEO & Accessibility:** Fully static HTML means search engine crawlers can index every word effortlessly without needing JS hydration.

### ❌ The Bad (Cons)
- **Scalability Limitations:** Without a frontend framework (like React or Vue) and a router, adding complex multi-page features or global state management becomes verbose and difficult to maintain.
- **Manual DOM Manipulation:** Heavy reliance on `document.getElementById` and imperative UI updates can lead to "spaghetti code" if the application logic grows beyond a simple portfolio.
- **Asset Management:** Without a component-based structure, CSS and JS files can become monolithic over time (e.g., a single 4,000-line CSS file).

---

## 🚀 Solutions & Future Roadmap

To address the scalability limits while maintaining performance, the following solutions are planned:

1. **Vite Build Optimization (Implemented):** Transitioned to Vite to automatically hash assets, minify code, and start breaking the monolithic CSS/JS into modular imports.
2. **Component Migration:** If the site expands (e.g., adding a blog or client portal), the logical next step is migrating the static HTML into **Astro** or **Next.js**. Astro would allow keeping the static performance while introducing modular components.
3. **Automated Asset Pipelines:** Implementing WebP conversion scripts to ensure large `.png` and `.jpg` files don't bottleneck the First Contentful Paint (FCP).

---

## 🛠️ Setup & Development

Make sure you have [Node.js](https://nodejs.org/) installed.

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Start Development Server**
   ```bash
   npm run dev
   ```
3. **Build for Production**
   ```bash
   npm run build
   ```
4. **Preview Production Build**
   ```bash
   npm run preview
   ```

---

*Designed and engineered by Bhumit Vasava.*
