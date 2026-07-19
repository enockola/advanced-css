# Enoch Olayemi — Developer Portfolio

**Student:** Enoch Olayemi  
**Semester:** Spring 2026  
**Course:** WDD 331R Advanced CSS  
**Live Site:** [Visit Site](https://enockola.github.io/advanced-css/)

## About

This repository contains my personal developer portfolio and the work I completed for WDD 331R: Advanced CSS. I am majoring in Computer Science, minoring in AI Engineering, and completing a certificate in Full-Stack Web Design and Development. The portfolio presents selected projects first, with the complete semester archive available on a separate coursework page.

The site is built using a layered CSS architecture with semantic design tokens, reusable components, responsive layouts, accessible light and dark themes, and a generated production CSS file.

## Pages

- [Portfolio homepage](https://enockola.github.io/advanced-css/) — personal introduction, selected work, skills, and contact call to action
- [Coursework archive](https://enockola.github.io/advanced-css/assignments.html) — every assignment grouped by CSS topic
- [Résumé](https://enockola.github.io/advanced-css/resume.html) — responsive and print-friendly professional résumé
- [Contact](https://enockola.github.io/advanced-css/contact.html) — direct contact links and an email-based contact form

## Organization

The homepage acts as the portfolio front door and highlights four representative projects. The coursework archive preserves access to every semester assignment while grouping the work by concept rather than presenting it as a homework log. Shared navigation, theme controls, typography, tokens, and footer styles connect the main portfolio pages into one visual system. Individual experiments remain in their original `unit-*` folders.

## Build Tool

This project uses **Lightning CSS** as the build tool.

I chose Lightning CSS because it is fast and handles several CSS build steps in one tool, including:

- Bundling CSS imports
- CSS nesting support
- Vendor prefixes
- Minification
- Browser target support

The main source CSS file is:

```txt
css/main.css
```

Install the development dependencies and build the bundled stylesheet with:

```sh
npm install
npm run build
```
