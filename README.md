# Adam Moffat — portfolio

A sales-engineering portfolio with two deliberately separate experiences:

- **Default:** responsive editorial portfolio, career evidence, accessible case-study dialogs, résumé, research, and contact.
- **Car mode:** explicitly launched, lazy-loaded React Three Fiber / Drei scene with the existing C63 asset, custom GLSL, GSAP ScrollTrigger camera choreography, instanced artifacts, wireframe deconstruction, GPU-textured project holograms, particle headlights, terminal contact, and optional synthesized audio.

## Run

```sh
npm ci
npm start
npm run build
CI=true npm test -- --watchAll=false
```

Production output is `build/`. The postbuild script removes the raw Adam authoring documents from that output. Keep those source documents out of public deployments; deploy the built output rather than the repository's `public/` directory. `/stats` remains available and the existing visitor tracking runs on non-local deployments.

## Where things live

- `src/portfolio/content.js`: curated case studies and capabilities, sourced from Adam's provided documents.
- `src/portfolio/Portfolio.js`: default layout, navigation, case-study dialogs.
- `src/portfolio/ContactForm.js`: shared validated email-draft form. It opens the visitor's email app; there is no server-side message delivery or false “sent” state.
- `src/experience/CarExperience.js`: mode controls, scroll stages, keyboard-accessible project tabs, fallback and terminal interface.
- `src/experience/Scene.js`: camera, normalized model, per-material deconstruction, GPU-instanced artifacts, interactive holograms, adaptive resolution.
- `src/experience/shaders/`: custom GLSL and material injection.
- `src/experience/Burnout.js`: scroll-speed-driven rear-wheel rotation and a bounded smoke pool anchored to the actual tire contact patches. Both scroll directions generate smoke; spin and emission ease off at rest. Reduced-motion preferences disable the effects.
- `src/experience/HeadlightBeams.js`: GPU particle beams activated over case studies.
- `src/experience/RenderActivity.js`: input-driven render scheduling and sustained-frame-cost resolution fallback.
- `src/experience/ProjectHolograms.js`: reusable GPU panel textures with pointer interaction; keyboard access remains in the project tabs.
- `src/experience/useAudio.js`: user-initiated audio, transition cues, visibility suspension, cleanup.

## Performance and accessibility

The default experience requests neither the car model nor the WebGL bundle. Car mode uses demand rendering: scrolling, pointer input, keyboard input, and resize wake the renderer, which sleeps after a five-second settling window for the camera and burnout smoke. Hidden tabs pause rendering and audio. Mobile uses 180 artifacts (desktop 650), a smaller smoke pool, and lower material texture resolution.

The balanced preset uses antialiasing and pixel ratios of 1.5 on desktop and 1.25 on mobile. Sustained slow active frames lower resolution to 1, never below native CSS resolution. This keeps the earlier performance work without the visibly soft 0.75 fallback. Project holograms are canvas textures on GPU meshes instead of per-frame transformed HTML. Full-screen SVG grain and backdrop blur were removed; transparent model materials use single-pass rendering. Rear-wheel transforms only update the relevant ancestor chains when smoke needs a spawn position; settled smoke pools stop uploading buffers.

`public/c63-balanced.glb` is the active asset: 6,069,672 bytes and 81,676 triangles, versus the original's 12,072,704 bytes and 117,203 triangles. The balanced model preserves more detail than the previous 4.83 MB lightweight variant, retains named wheel nodes and attribution, and uses 1024-pixel WebP textures at quality 90. Mobile texture uploads are capped at 768 pixels. The original and previous lightweight asset remain unchanged.

The blueprint transition uses barycentric edge shading and a gradual screen-door surface dissolve in the existing material pass. Owned non-indexed geometry preserves skinning and UV attributes, and is disposed on unmount. No binary wireframe toggle or duplicate wireframe draw pass is used. Explosion and reassembly use broad scroll ranges and damped interpolation, with frame delta clamped after idle. Text panels are opaque with larger, higher-contrast body copy, and heading backplates protect text from the white car.

Reduced-motion preferences disable wheel spin, smoke, orbiting particles, model motion, animated camera journeys, and CSS transitions. A text-first fallback retains all case studies and contact when WebGL or assets fail. Navigation, dialogs, and tabs support keyboard operation. Sound starts muted and needs an explicit user gesture. Frame rates still depend on the visitor's hardware; desktop browser checks are not physical-device benchmarks.

### Reproducing the optimized model

Run each command in order with glTF Transform CLI 4.5.0 (the CLI is an asset-authoring tool, not a runtime dependency):

```sh
npx @gltf-transform/cli@4.5.0 weld public/c63.glb /tmp/c63-weld.glb
npx @gltf-transform/cli@4.5.0 simplify /tmp/c63-weld.glb /tmp/c63-light.glb --ratio 0.65 --error 0.001
npx @gltf-transform/cli@4.5.0 resize /tmp/c63-light.glb /tmp/c63-resized.glb --width 1024 --height 1024
npx @gltf-transform/cli@4.5.0 webp /tmp/c63-resized.glb public/c63-balanced.glb --quality 90
```

### Topstock case-study provenance

The featured Vusion Topstock Operations case study was checked against `Admft/TopstockDashboard` at commit `8730c91`: README, `dashboard/app.js` (readiness definitions, Captana filtering, history and field views), and `refresh.py` (classification, snapshot publishing, and historical backfill). It describes Python, KQL, vanilla JavaScript, and static Vercel snapshots—not a live Azure query running in the visitor's browser.

The 29-store deployment scope comes from Adam. `public/TopstockOperations.jpg` is a captured view of the supplied dashboard on September 19, showing its September 18 reporting snapshot of 28 stores. The case study explicitly distinguishes reporting coverage from deployment scope and distinguishes actionable readiness from fully-online status. No cloud credentials or raw device datasets were copied into this portfolio.

- [Create React App](https://github.com/facebook/create-react-app)
- [React](https://reactjs.org/)

## Causey decision questionnaire

Share `/causey-decisions` on the deployed site (or `/causey-decisions.html` locally). The standalone page preserves all 90 supplied questions and works without a backend.

1. Start with the launch-critical questions. Choose Agree, Change, or Unsure.
2. For Change, explain the replacement rule. Check the scope, then press Next.
3. Use Overview to revisit answers, or Review & copy answers to finish at any time.
4. Press **Copy answers**, paste into a message to Adam or an email to **arm393@cornell.edu**, and send. Nothing is submitted automatically.
5. If copying is blocked, manually copy the preview or download the `.txt` file and send it.

Progress is saved in localStorage on the same browser/device when available. Private browsing or clearing browser data can remove it. Exported responses include question numbers, decisions, scopes, notes, and unanswered question numbers. Draft rules are proposals, not published Causey policy.
## Asset attribution and release notes

The existing **2018 Mercedes-AMG C63 AMG Cabriolet** model is by **Ddiaz Design**, distributed under **CC BY-NC-SA 4.0**:
https://sketchfab.com/3d-models/2018-mercedes-amg-c63-amg-cabriolet-af1793cf9d0946dda4e35e82c9ff518f

Credit is visible in car mode. The license includes a noncommercial restriction; verify permission for the intended deployment or replace it with a suitably licensed model. The portfolio's shader animation does not replace the original model's license. The bundled model and HDR are pre-existing assets.

This repository still uses React Scripts 5 / Create React App and has inherited dependency audit findings. The build may report the pre-existing missing MediaPipe source map. Address the dependency baseline before describing a public release as fully security-audited. 

## Validation

Unit tests cover the default recruiting experience, modal case-study lifecycle, and honest contact handoff. Browser smoke checks cover desktop and 390px mobile layouts, mode entry/exit, no model request in default mode, case-study selection, mobile menu, reduced motion, and WebGL fallback. Measure frame times on your target hardware before increasing scene effects or asset fidelity.

## Annual GitHub activity

Causey is the flagship project in the shared project list, so it leads both modes. The annual GitHub section fetches the latest public snapshot from the `master` branch on raw.githubusercontent.com, with a five-second timeout and bundled `/github-contributions.json` fallback; it does not put credentials or GitHub API requests in the browser. The full calendar appears in the default portfolio, with compact annual statistics in car mode.

Run `npm run fetch-contributions` using an authenticated local `gh` session, or set `GH_TOKEN` / `GITHUB_TOKEN` for automation. The GitHub Actions workflow runs at 12:17 UTC on odd-numbered dates (roughly every two days) and uses the official GraphQL API with its built-in token. It publishes only aggregate counts and dates, never repository names or credentials. Failed/incomplete refreshes keep the prior file intact. The date window is the last 365 UTC calendar dates including today, shown explicitly alongside the snapshot date.

`commits` is GitHub's `totalCommitContributions`; `total` is the contribution-calendar sum across the same date window. Restricted/private activity is not guessed to be commits. The public UI shows only the complete contribution total and calendar. The API-visible commit subset is retained in the source snapshot for internal reference, but is not presented as a second, misleading headline or labeled as verified. See [GitHub's ContributionsCollection reference](https://docs.github.com/en/graphql/reference/users#contributionscollection).

Updated activity appears after the scheduled GitHub snapshot commit and GitHub CDN propagation, on the next page load, without requiring another Vercel deployment. GitHub scheduling can be delayed. The workflow can also be run manually.
