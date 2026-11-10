import type { APIRoute } from "astro";

// Every .astro page except the 404 and dynamic routes. New pages are picked up automatically.
const pages = Object.keys(import.meta.glob("./**/*.astro"))
  .filter((file) => !file.includes("404") && !file.includes("["))
  .map((file) => file.replace(/^\.\//, "").replace(/(index)?\.astro$/, "").replace(/([^/])$/, "$1/"))
  .map((path) => (path === "/" ? "" : path))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
