# web-designer

Collection of website sources and assets used for small web projects and themes.

This repository contains local copies of a theme (clapat.ro - "nanotech") and a set of static assets (JS libraries, images, CSS). It's organized as a static website workspace rather than a build-system project.

## Quick overview

- Location: this workspace root (open this folder in your editor).
- Main theme: `clapat.ro/themes/nanotech/` — contains HTML pages, CSS, images and JS used by the theme.
- Local assets: `cdnjs.cloudflare.com/` — local copies of several third-party libraries (gsap, three.js, imagesloaded, smooth-scrollbar, etc.).
- Other files: `hts-log.txt`, `winprofile.ini`, `hts-cache/` — site/tooling artifacts.

## Previewing the site (recommended)

Because this is a static website, the easiest way to preview is to run a simple local HTTP server from the workspace root and open a browser.

PowerShell (Windows) — using Python:

```powershell
# from the repository root
py -3 -m http.server 8000
# or if 'py' is not available:
python -m http.server 8000

# then open the site in your default browser:
Start-Process "http://localhost:8000"
```

Alternatives:

- Use the VS Code Live Server extension to preview files with hot reload.
- Open an HTML file directly in a browser (File → Open), but some features depending on XHR/fetch or relative imports may not work correctly when loaded via the file:// protocol, so use an HTTP server when possible.

## File structure (high level)

- `index.html` — top-level landing page (if present).
- `clapat.ro/themes/nanotech/` — theme directory with:
  - `index.html`, `about.html`, other page templates
  - `css/` — theme CSS files
  - `js/` — theme JavaScript files (e.g., `clapat.js`, `plugins.js`)
  - `images/` and `webfonts/`
- `cdnjs.cloudflare.com/` — local vendor libraries (kept offline-friendly)
- `hts-cache/`, `hts-log.txt` — tool logs/cache

## Third-party libraries

This repository holds local copies of several third-party libraries under `cdnjs.cloudflare.com/`. Notable items:

- GSAP (Flip, ScrollTrigger)
- three.js (r128)
- imagesloaded
- smooth-scrollbar

Check the subfolders under `cdnjs.cloudflare.com/ajax/libs/` for exact filename and versions.

## How to edit

- Open the workspace folder in VS Code (or your preferred editor).
- Edit HTML/CSS/JS files inside `clapat.ro/themes/nanotech/`.
- Use Live Server or the Python HTTP server above to preview changes.

## Contribution & next steps

If you want to contribute or extend this repository, helpful additions include:

- Add a `LICENSE` file to clarify reuse permissions.
- Add `CONTRIBUTING.md` with branch/PR workflow.
- Add a minimal `package.json` and build scripts if you plan to introduce tooling (Sass, bundlers).
- Add screenshots or a small `docs/` folder with usage examples.

## Notes

- There is currently no build system configured — this is a static file collection. If you plan to modernize the project, consider adding a small npm toolchain.
- If you need help setting up a development workflow (live reload, sass, bundling), open an issue or ask for guidance and I can add a small scaffold.

---

If anything in this README should be adjusted (more details about a folder or commands), tell me which parts to expand and I'll update the file.
