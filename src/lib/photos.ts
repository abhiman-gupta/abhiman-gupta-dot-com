/**
 * Build-time photo loader. One folder per album in photography/collections/<slug>/ with a collection.json
 * ({ "title", "location"?, "order"? }) and photos named in viewing order (01.jpg, 02.jpg, ...).
 * Every photo must be 4:3 or 3:4; anything else fails the build with a clear message.
 */
import type { ImageMetadata } from "astro";

type Meta = { title: string; location?: string; order?: number };

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/photography/collections/*/*.{jpg,jpeg,png,webp,JPG,JPEG}",
  { eager: true }
);
const metaModules = import.meta.glob<{ default: Meta }>("/photography/collections/*/collection.json", { eager: true });

export type Photo = { image: ImageMetadata; file: string; orientation: "portrait" | "landscape" };
export type Album = { slug: string; title: string; location?: string; order: number; photos: Photo[] };

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

export function getAlbums(): Album[] {
  const albums: Album[] = [];
  for (const [path, mod] of Object.entries(metaModules)) {
    const slug = path.split("/").at(-2)!;
    if (slug.startsWith("_")) continue;
    const meta = mod.default;
    if (!meta?.title) throw new Error(`photography/collections/${slug}/collection.json needs a "title".`);
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
    albums.push({ slug, title: meta.title, location: meta.location, order: meta.order ?? 999, photos });
  }
  return albums.sort((a, b) => a.order - b.order || collator.compare(a.title, b.title));
}
