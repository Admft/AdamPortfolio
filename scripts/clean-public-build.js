// Personal source material is for authoring, not a public download.
const fs = require("node:fs");
const path = require("node:path");
const build = path.resolve(__dirname, "../build");
for (const name of [
  "Adam Docs",
  "Adam Moffat - Comprehensive Knowledge Base.txt",
  "Organized Vusion Brag Sheet.txt",
]) {
  fs.rmSync(path.join(build, name), { recursive: true, force: true });
}
console.log("Removed private authoring notes from production output.");
