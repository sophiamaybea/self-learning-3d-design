# Offline-ready catalogue gallery

Open `index.html` locally or serve it as a static page. It includes the full embedded 41-item snapshot (no CORS, build tools or JavaScript framework needed). Filter/search/sort licences and references and copy a GitHub-aware ChatGPT design brief.

The graphics and interface code are original CSS/DOM work; they do **not** bundle the 41 third-party repositories. To refresh the embedded catalogue after upstream changes, regenerate the `DATA` constant from `design-kit/catalog.json`.

It is an information/briefing interface, not a claim of working runtime integration for every linked project. The React example is in `design-kit/examples/react-immersive/`.
