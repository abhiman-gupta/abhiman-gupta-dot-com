# Photography workflow

Each album is one folder. Adding photos means adding files; no code changes.

## Add photos to an album

1. In Lightroom, crop every photo to **4:3 or 3:4** (the build stops with an error if a photo is any other shape).
2. Export as sRGB JPEG, quality 80–90, long edge about 2000–2400 px. Turn off location metadata in the export settings.
3. Name the files in viewing order: `01.jpg`, `02.jpg`, `03.jpg`, … (numbers sort naturally, so `10.jpg` comes after `09.jpg`).
4. Put them in the album's folder, e.g. `photography/collections/tucson-light/`.
5. Commit and push to `main`. The site rebuilds and deploys by itself.

The drying-line strip always shows 4 frames. If an album has fewer than 4 photos, the empty frames say **COMING SOON**.

## Start a new album

1. Make a folder with a short, lowercase, hyphenated name: `photography/collections/yosemite/`. That name becomes the address
   (`abhimangupta.com/photography/yosemite/`).
2. Add a `collection.json`:

   ```json
   {
     "title": "Yosemite",
     "location": "California",
     "order": 3
   }
   ```

   `order` sets its position on the drying line (1 is leftmost).
3. Add photos as above.

## Preview before publishing

```bash
npm install
npm run dev
```

Then open http://localhost:4321/photography/.

## Notes

- The website makes smaller WebP copies automatically; your original JPEGs are never served directly.
- The repository is public: anything you commit is visible on GitHub, so only add photos you're happy to publish.
