/**
 * Build-time photo loader. One folder per location in photography/locations/<slug>/ with a location.json
 * ({ "name", "region"?, "country", "lat", "lon" }) and photos named in viewing order (01.jpg, 02.jpg, ...).
 * Every photo must be 4:3 or 3:4; anything else fails the build with a clear message.
 */
import type { ImageMetadata } from "astro";

type Meta = { name: string; region?: string; country: string; lat: number; lon: number };

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/photography/locations/*/*.{jpg,jpeg,png,webp,JPG,JPEG}",
  { eager: true }
);
const metaModules = import.meta.glob<{ default: Meta }>("/photography/locations/*/location.json", { eager: true });

export type Photo = { image: ImageMetadata; file: string; orientation: "portrait" | "landscape" };
export type Location = { slug: string; name: string; region?: string; country: string; lat: number; lon: number; photos: Photo[] };

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

export function getLocations(): Location[] {
  const locations: Location[] = [];
  for (const [path, mod] of Object.entries(metaModules)) {
    const slug = path.split("/").at(-2)!;
    if (slug.startsWith("_")) continue;
    const meta = mod.default;
    const file = `photography/locations/${slug}/location.json`;
    if (!meta?.name) throw new Error(`${file} needs a "name".`);
    if (!meta.country) throw new Error(`${file} needs a "country".`);
    if (typeof meta.lat !== "number" || typeof meta.lon !== "number") throw new Error(`${file} needs numeric "lat" and "lon".`);
    const photos: Photo[] = Object.entries(imageModules)
      .filter(([p]) => p.split("/").at(-2) === slug)
      .sort(([a], [b]) => collator.compare(a, b))
      .map(([p, m]) => {
        const { width, height } = m.default;
        const ratio = width / height;
        const portrait = Math.abs(ratio - 3 / 4) < 0.01;
        const landscape = Math.abs(ratio - 4 / 3) < 0.01;
        if (!portrait && !landscape) {
          throw new Error(`${p} is ${width}×${height}. Photos must be cropped to 4:3 or 3:4.`);
        }
        return { image: m.default, file: p.split("/").at(-1)!, orientation: portrait ? "portrait" : "landscape" };
      });
    locations.push({ slug, name: meta.name, region: meta.region, country: meta.country, lat: meta.lat, lon: meta.lon, photos });
  }
  return locations.sort((a, b) => collator.compare(a.name, b.name));
}

/** "Arizona, United States" / "Uzbekistan" */
export const placeLine = (l: Location) => [l.region, l.country].filter(Boolean).join(", ");
