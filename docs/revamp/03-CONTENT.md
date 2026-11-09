# 03 · Content Inventory

The only source of facts about Abhiman for agents. **Facts here are fixed; wording is not.**
Copy will be rewritten with Abhiman, so agents should write short placeholder lines and put them in
`src/data/copy/*.yaml`. Anything marked `TODO` needs his input.

Sources: the live site (`main`, July 2026), older site versions in git history (April 2026, marked *[history]*),
the unpushed local `revamp` branch commit `21be3f3` (Oct 2026, marked *[draft]*), and Abhiman's brief (2026-11-09, marked *[brief]*).
Treat *[history]* items as probably true but not yet confirmed for the new site.

## Identity

- **Abhiman Gupta**, abhimangupta.com
- Third-year PhD student, Optical Sciences, University of Arizona (Wyant College of Optical Sciences) *[brief]*. PhD expected May 2029 *[history]*
- Polarization Lab, advisor Dr. Meredith Kupinski, co-advisor Dr. Matthew Kupinski
- BS Biomedical Engineering, University of Arizona, May 2024 *[history]*
- Based in Tucson, AZ
- Headshot: `images/headshot.jpg` (metadata stripped)

## Brand brief *[brief]*

Cool, not that nerdy. Attractive lifestyle/travel photographer and a meaningful, artistic one. Wants a minimal,
monochrome (black-and-white) site where the photographs carry the color. The home page opens with the PhD line,
then a brief, designed summary of his path (not a résumé).

## What he works on (one line for Home, longer for About)

Two phrasings exist; they describe the same work. `TODO`: Abhiman picks the plain-language one-liner.
- "Real-time computer rendering methods for applications in ophthalmology." (live site)
- "A polarimetric model of the eye for studying diseases including keratoconus, cataracts, and retinal
  degeneration, connecting optical engineering, ophthalmology, and computer graphics." (live `/academia/`)
- **Removed from the Home hero by Abhiman (2026-11-09):** the research one-liner, the "Tucson, Arizona" coordinates line, and
  "And for more than ten years, chasing light with a camera." The hero is name + PhD line + links until he writes new lines. `TODO(copy)`

## Path highlights (the Professional page, draft)

Shown as path cards on `/professional/` in the mockup: Alcon, Microvascular Therapeutics, FORGE, teaching award. Abhiman will
decide what stays; nothing here goes on Home.

| Frame | Facts | Source |
| --- | --- | --- |
| Lasers for eye surgery | Optical Engineering Intern, **Alcon Surgical**, May–Aug 2025. Optical fiber testing for glaucoma surgery systems using 2.7 µm nanosecond lasers; root-cause failure analysis, beam profiling, NA measurements of sapphire and germanium fiber joints | *[history]* + *[brief]* |
| Pharma / drug delivery | Biomedical Engineering Intern, **Microvascular Therapeutics Inc.**, Jan–Aug 2024. Engineered drug pressurization components (500+ vial tests/month); streamlined microbubble measurements (+20% data-collection efficiency) | *[history]* |
| Startups | Arizona FORGE Biomedical Entrepreneur Scholarship: $9,600 toward "Un-afflict," an AI-enabled health behavior-change startup concept. Described as "a former startup entrepreneur-in-residence" | live + *[history]* |
| Photography | Photographing for 10+ years; recent focus on portraits; "4× award-winning photographer" / "four local awards" | live + *[history]* |
| Teaching | Outstanding Teaching Assistant Award, University of Arizona, 2025 | live |
| Engineering design | Roche Tissue Diagnostics Award for Most Innovative Engineering Design, 2025 | live |

`TODO` from Abhiman:
- The brief says "pharma **companies**", plural. Only Microvascular Therapeutics is on record. Which others?
- Which startup accelerator programs, and where was he entrepreneur-in-residence?
- What are the four photography awards (name, year), and which photo is the award-winning frame?
- An image for each frame (photo of the work, a product shot, or his own photograph that fits the mood).

## About page material (compact, for academics)

**Peer-reviewed**
- 2023: [Heavy water coupling gel for short-wave infrared photoacoustic imaging](https://doi.org/10.1117/1.jbo.28.11.116001). C. M. Salinas, E. Reichel, **A. Gupta**, R. S. Witte · *Journal of Biomedical Optics*

**Presentations / posters**
- 2023: [Comparison of On-Body vs. Around-Body Systems for Assessment of Movement Abnormalities in Health and Disease](https://2023bmesannual.eventscribe.net/fsPopup.asp?PosterID=622154&mode=posterInfo). K. Rohrer, G. S. Pierre, …, **A. Gupta**, M. J. Slepian · BMES Annual Meeting
- *[history]* titles, venues/years `TODO`: "Hands-Free in Vivo Volumetric Photoacoustic Imaging for Assessing Skin Lesions"; "Novel Optoacoustic Window for Real-Time Monitoring of Ultrasound Stimulation"; "Optical Resolution Photoacoustic Microscopy for Biomedical Applications"

**Recognition**: Outstanding TA Award (2025); Roche Tissue Diagnostics Award (2025); Harrison H. Barrett Graduate
Student Scholarship (2024); Review Committee, Craig M. Berge Engineering Design Program (2024–25); Arizona FORGE
Biomedical Entrepreneur Scholarship (undergrad); Global Wildcat Tuition Award (2020); 3× Dean's List *[history]*

**Research path** *[history]*: undergrad researcher, Experimental Ultrasound & Neural Imaging Lab (Dr. Russell Witte), 2022–24;
PhD rotations in PS-OCT (Dr. Travis Sawyer, Fall 2024) and selective-illumination microscopy (Dr. Yeran Bai, Spring 2025).

**Elsewhere**: talk, [iVoices: Channeling Technology Experiences into Curricula, and Scholarship](https://www.youtube.com/watch?v=Sna2PdU9dNk&t=6s)
(Center for University Education Scholarship); lab, [Polarization Lab](https://sites.arizona.edu/pol-lab/);
[Google Scholar](https://scholar.google.com/citations?user=Y-umYyEAAAAJ&hl=en) *[history]*. `TODO`: CV PDF?

## Photography

- **No photos are uploaded yet.** Every gallery must ship with a designed empty state.
- New model: one folder per collection, e.g. `photography/collections/yosemite/` *[brief]*. The existing `portraits/` and `trips/` folders are empty shells.
- `TODO`: the first collections and their photos (Yosemite plus others), 3–5 hero/featured frames for Home.
- Export guide: sRGB JPEG, quality 80–90, long edge ~2400 px, **crop every photo to 4:3 or 3:4** *[brief]*. No separate cover crops.
- Instagram: [@abhimangupta](https://www.instagram.com/abhimangupta/). **Do not link @portraits.by.abhiman**: Abhiman is deleting
  that account *[brief]*. Portraits still appear on the site as a collection.

## Articles

- The menu item and page are called **Articles**. **No articles exist yet and the site shows no placeholder** *[brief]*.
- Style reference: **George Mack** *[brief]*: punchy, high-signal, memorable one-liners, simple visuals. Match the feel; never copy his text.
- A possible future article (not on the site, don't mention it): cold-emailing his way into internships in his last undergrad semester.
  **Abhiman writes articles; agents never draft them.**
- Older theme ideas (optional): life experiences; science & health; books & ideas. Interests: health, nutrition, lifestyle design, financial markets.

## Picks (cool stuff)

| Category | Items so far | Source |
| --- | --- | --- |
| Shark Tank pitches | **Polygons** (Rahul Agarwal): https://www.youtube.com/watch?v=xm1ShtnwIgU | *[draft]* |
| Websites | `TODO` | *[brief]* |
| Apps | `TODO` | *[brief]* |
| Books | `TODO`. Older idea: an annotated shelf across biology, nutrition, biochemistry, optics, medicine, creative practice, "only books I'd hand to a friend" | *[brief]* + live |

Each item needs: name, link, one-line "why" in his voice (`TODO(copy)`), plus a cover/icon/screenshot where relevant.

## Contact

- Email: abhimangupta@arizona.edu (live). `abhiman@abhimangupta.com` is a real Zoho mailbox on his domain (MX → Zoho). `TODO`: which is public?
- LinkedIn: https://www.linkedin.com/in/abhimangupta27/
- Instagram: @abhimangupta only (above)
- Purpose line (live): "For research, internships, content, or portraits." (Portrait inquiries are still welcome.)

## Brand assets

- Fonts: Source Sans 3 + Source Serif 4 variable woff2 with OFL licenses in `21be3f3:fonts/Source/` *[draft]*. The new system uses **DM Mono + DM Sans** instead (OFL); the Source fonts aren't needed.
- The lens/ray loader SVG is retired.
- Footer: "© 2026 Abhiman Gupta"
