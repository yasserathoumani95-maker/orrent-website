const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const dir = __dirname + "/";

const files = [
  "og-home", "og-services", "og-formations", "og-blog",
  "og-ebooks", "og-tiktok", "og-psychologie", "og-tunnel"
];

(async () => {
  for (const name of files) {
    const svg = fs.readFileSync(dir + name + ".svg");
    await sharp(svg)
      .resize(1200, 630)
      .png()
      .toFile(dir + name + ".png");
    console.log("PNG: " + name + ".png");
  }
})();
