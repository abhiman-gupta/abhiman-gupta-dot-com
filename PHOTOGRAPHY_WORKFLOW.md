# Photography workflow

The Photography page is a globe. Each **location** is one folder and shows up as a red marker; clicking it lists that place's photos.
Adding photos means adding files; no code changes.

## Add photos to a location

1. In Lightroom, crop every photo to **4:3 or 3:4** (the build stops with an error if a photo is any other shape).
2. Export as sRGB JPEG, quality 80–90, long edge about 2000–2400 px. Turn off location metadata in the export settings.
3. Name the files in viewing order: `01.jpg`, `02.jpg`, `03.jpg`, … (numbers sort naturally, so `10.jpg` comes after `09.jpg`).
4. Put them in the location's folder, e.g. `photography/locations/tucson/`.
5. Commit and push to `main`. The site rebuilds and deploys by itself.

A location with no photos yet still gets a marker (white with a red ring) and says "No photos yet".

## Add a new location

1. Make a folder with a short, lowercase, hyphenated name: `photography/locations/tashkent/`. That name becomes the photo
   viewer's address (`abhimangupta.com/photography/tashkent/`).
2. Add a `location.json`. `lat`/`lon` place the marker (right-click a spot in Google Maps to copy them); `region` is optional.

   ```json
   {
     "name": "Tashkent",
     "country": "Uzbekistan",
     "lat": 41.2995,
     "lon": 69.2401
   }
   ```

   For US places add the state as `"region": "Arizona"`.
3. Add photos as above.

## Preview before publishing

The dev server (`npm run dev`) inlines styles, which the site's Content-Security-Policy blocks, so preview the real build:

```bash
npm install
npm run build
npm run preview
```

Then open http://localhost:4321/photography/.
