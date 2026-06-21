# Charleson Davis — Portfolio

Personal portfolio website for **Charleson Davis**, an AI Engineer and Full Stack Developer based in Göttingen, Germany.

🌐 **Live:** [charleson.dev](https://normandy17.github.io/) *(replace with your actual URL)*

---

## About

This site is the professional home for Charleson's work — 5 years of enterprise full-stack engineering at Sapiens International, now converging with a deep specialisation in AI and machine learning from Ironhack Berlin (2026). It covers his background, technical skills, featured projects, work history, and a direct contact form.

---

## Features

- **Bilingual (EN / DE)** — full German localisation toggle, persisted to `localStorage`
- **Light / Dark mode** — system-aware, persisted to `localStorage`
- **Animated particle background** — canvas-based floating particles with cursor interaction, respects `prefers-reduced-motion`
- **Project showcase** — era-based tabs (AI 2026 / Web 2021) with media carousels (images, YouTube, Vimeo) inside modals
- **Smooth scroll navigation** — active section highlighting in the navbar via IntersectionObserver
- **Contact form** — sends email directly via the Base44 integration
- **Fully responsive** — mobile-first layout, PWA-ready

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router v6 |
| State | React hooks + Context API |
| Animations | CSS keyframes + canvas API |
| Icons | Lucide React + Devicon CDN |
| Email | Base44 Core integration |
| Fonts | Inter (UI) · JetBrains Mono (code tags) |

---

## Projects

### AI Projects (2026)

| Project | Description | Stack |
|---|---|---|
| **BabyOS** | Multi-agent AI pregnancy companion with RAG over medical + Germany-specific knowledge | LangChain, LangGraph, ChromaDB, React, Supabase |
| **ReviewSense** | Sentiment classification + generative buying-guide engine | Python, NLP, Generative AI, Streamlit, Scikit-Learn |
| **Poetic Justice** | Fake news detector benchmarking DistilBERT against classic ML via ensemble modelling | Python, DistilBERT, HuggingFace, Scikit-Learn |

### Web Projects (2021)

| Project | Description | Stack |
|---|---|---|
| **Super Shopper** | Full-stack MERN e-commerce with cart, checkout, and payments | React, Redux, Node.js, Express, MongoDB |
| **Prime Video Clone** | Streaming platform clone with auth and Razorpay subscription payments | React, Node.js, Express, MongoDB, Razorpay |
| **Google Keep PWA** | Offline-capable note-taking PWA installable on mobile and desktop | React, Redux, PWA, Service Worker |

---

## Project Structure

```
src/
├── components/
│   └── portfolio/       # All portfolio section components
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Skills.jsx
│       ├── Projects.jsx
│       ├── ProjectCard.jsx
│       ├── ProjectModal.jsx
│       ├── MediaCarousel.jsx
│       ├── Experience.jsx
│       ├── Education.jsx
│       ├── Contact.jsx
│       ├── Footer.jsx
│       ├── Navbar.jsx
│       ├── ParticleBackground.jsx
│       ├── SectionHeading.jsx
│       └── skillIcons.js
├── data/
│   ├── projects.js      # All project data (EN + DE)
│   ├── experience.js    # Work history (EN + DE)
│   ├── education.js     # Education entries (EN + DE)
│   ├── skills.js        # Skill tracks
│   └── translations.js  # All UI strings in EN and DE
├── hooks/
│   ├── useTheme.js      # Dark/light mode
│   └── useScrollFade.js # IntersectionObserver fade-in
├── lib/
│   └── LanguageContext.jsx  # i18n context + toggle
└── pages/
    └── Home.jsx
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Personalisation Checklist

- [ ] Replace `live_url` and `github_url` in `src/data/projects.js` with real links
- [ ] Add a real CV PDF at `public/assets/resume/charleson_davis_resume.pdf`
- [ ] Update the live site URL at the top of this README
- [ ] Add real project screenshots to the `media` arrays in `src/data/projects.js`

---

## Contact

**Charleson Davis**
- Email: [charlesondavis@gmail.com](mailto:charlesondavis@gmail.com)
- LinkedIn: [linkedin.com/in/charlz1717](https://www.linkedin.com/in/charleson-davis-marokey-2161b0b1/)
- GitHub: [github.com/normandy17](https://github.com/normandy17)