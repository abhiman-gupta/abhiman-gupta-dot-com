# Photography workflow

The Photography page is a globe. Each **location** is one folder and shows up as a red marker; clicking it lists that place's photos.
Clicking a photo opens it full screen. Adding photos means adding files; no code changes.

## Add photos to a location

1. In Lightroom, crop however you like. 4:3 or 3:4 is the usual, but any shape works: every tile in a location's list is the
   same width and shows the whole photo, so a wider or taller crop just makes a shorter or longer tile.
2. Export as sRGB JPEG, quality 80–90, long edge about 2000–2400 px. Turn off location metadata in the export settings.
3. Name the files in viewing order: `01.jpg`, `02.jpg`, `03.jpg`, … (numbers sort naturally, so `10.jpg` comes after `09.jpg`).
4. Put them in the location's folder, e.g. `photography/locations/tucson/`.
5. Commit and push to `main`. The site rebuilds and deploys by itself.

A location with no photos yet still gets a marker (white with a red ring) and says "No photos yet".

## Add a new location

1. Make a folder with a short, lowercase, hyphenated name: `photography/locations/tashkent/`.
2. Add a `location.json`. Only `country` is required; add as much as you know.

   - **Just a country** (marker goes in the middle of it):

     ```json
     { "country": "India" }
     ```

   - **A US state** (marker goes in the middle of the state):

     ```json
     { "country": "United States", "region": "Utah" }
     ```

   - **An exact city** (marker goes on the spot; right-click a place in Google Maps to copy its coordinates):

     ```json
     { "name": "Tashkent", "country": "Uzbekistan", "lat": 41.2995, "lon": 69.2401 }
     ```

     For a US city add the state too: `"region": "Arizona"`.

   Use the country's common English name. If the build can't find it on the map, it stops and tells you which file to fix.
3. Add photos as above.

## Preview before publishing

The dev server (`npm run dev`) inlines styles, which the site's Content-Security-Policy blocks, so preview the real build:

```bash
npm install
npm run build
npm run preview
```

Then open http://localhost:4321/photography/.
