/**
 * Build-time photo loader. One folder per location in photography/locations/<slug>/ with a location.json and photos
 * named in viewing order (01.jpg, 02.jpg, ...). Every photo must be 4:3 or 3:4; anything else fails the build.
 *
 * location.json needs only "country". Everything else is optional:
 *   { "country": "India" }                                          → marker in the middle of India
 *   { "country": "United States", "region": "Utah" }                → marker in the middle of Utah
 *   { "name": "Tucson", "region": "Arizona", "country": "United States", "lat": 32.22, "lon": -110.97 } → exact spot
 */
import type { ImageMetadata } from "astro";
import { geoArea, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, Geometry, MultiPolygon, Polygon } from "geojson";
import world from "world-atlas/countries-110m.json";
import us from "us-atlas/states-10m.json";

type Meta = { name?: string; region?: string; country: string; lat?: number; lon?: number };

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/photography/locations/*/*.{jpg,jpeg,png,webp,JPG,JPEG}",
  { eager: true }
);
const metaModules = import.meta.glob<{ default: Meta }>("/photography/locations/*/location.json", { eager: true });

export type Photo = { image: ImageMetadata; file: string; orientation: "portrait" | "landscape" };
export type Location = {
  slug: string;
  /** Heading shown for the place: the city if given, else the region, else the country. */
  name: string;
  region?: string;
  country: string;
  lat: number;
  lon: number;
  /** true when lat/lon were given; false when the marker sits in the middle of a country or state. */
  exact: boolean;
  photos: Photo[];
};

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

// ---------- Country / state centres ----------
const ALIASES: Record<string, string> = { "united states": "United States of America", usa: "United States of America", us: "United States of America" };
const norm = (s: string) => s.trim().toLowerCase();
type Named = Feature<Geometry, { name: string }>;
const wt = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const ut = us as unknown as Topology<{ states: GeometryCollection<{ name: string }> }>;
const countries = (feature(wt, wt.objects.countries) as unknown as { features: Named[] }).features;
const states = (feature(ut, ut.objects.states) as unknown as { features: Named[] }).features;

/** Centre of the largest piece, so e.g. Alaska or overseas islands don't drag the marker into the sea. */
function centre(f: Named): [number, number] {
  const g = f.geometry as Polygon | MultiPolygon;
  if (g.type !== "MultiPolygon") return geoCentroid(f) as [number, number];
  const parts = g.coordinates.map((c) => ({ type: "Polygon", coordinates: c }) as Polygon);
  const biggest = parts.reduce((a, b) => (geoArea(b) > geoArea(a) ? b : a));
  return geoCentroid(biggest) as [number, number];
}
function findCountry(name: string) {
  const want = norm(ALIASES[norm(name)] ?? name);
  return countries.find((c) => norm(c.properties.name) === want);
}
const isUS = (country: string) => findCountry(country)?.properties.name === "United States of America";

// ---------- Loader ----------
export function getLocations(): Location[] {
  const locations: Location[] = [];
  for (const [path, mod] of Object.entries(metaModules)) {
    const slug = path.split("/").at(-2)!;
    if (slug.startsWith("_")) continue;
    const meta = mod.default;
    const file = `photography/locations/${slug}/location.json`;
    if (!meta?.country) throw new Error(`${file} needs a "country".`);

    let lat = meta.lat, lon = meta.lon;
    const exact = typeof lat === "number" && typeof lon === "number";
    if (!exact) {
      if ((lat === undefined) !== (lon === undefined)) throw new Error(`${file}: give both "lat" and "lon", or neither.`);
      let shape: Named | undefined;
      if (meta.region && isUS(meta.country)) {
        shape = states.find((s) => norm(s.properties.name) === norm(meta.region!));
        if (!shape) throw new Error(`${file}: "${meta.region}" isn't a US state name. Fix the spelling or add "lat"/"lon".`);
      } else {
        shape = findCountry(meta.country);
        if (!shape) throw new Error(`${file}: can't find the country "${meta.country}" on the map. Use its common English name or add "lat"/"lon".`);
      }
      [lon, lat] = centre(shape);
    }

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

    const name = meta.name ?? meta.region ?? meta.country;
    locations.push({ slug, name, region: meta.region, country: meta.country, lat: lat!, lon: lon!, exact, photos });
  }
  return locations.sort((a, b) => collator.compare(a.name, b.name));
}

/** The line under a place's name: "Arizona, United States" for Tucson, "United States" for Utah, "" for India. */
export const placeLine = (l: Location) => [l.region, l.country].filter((s) => s && s !== l.name).join(", ");
