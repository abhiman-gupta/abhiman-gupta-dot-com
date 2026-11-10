// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://abhimangupta.com",
  trailingSlash: "always",
  build: {
    format: "directory",
    // Keep CSS in files so the Content-Security-Policy can stay strict (style-src 'self').
    inlineStylesheets: "never",
  },
  // Never inline scripts into HTML, so script-src 'self' holds without 'unsafe-inline'.
  vite: { build: { assetsInlineLimit: 0 } },
  redirects: {
    "/academia/": "/professional/",
    "/recommendations/": "/recommended/",
    "/cool-stuff/": "/recommended/",
    "/notes/": "/",
    "/contact/": "/#contact",
    // Old per-album film-roll pages; photos now open from the globe.
    "/photography/tucson-light/": "/photography/",
    "/photography/albuquerque-balloon-festival/": "/photography/",
  },
});
