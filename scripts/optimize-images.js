const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function convert(file) {
  const ext = path.extname(file).toLowerCase();

  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const output = file.replace(ext, ".avif");

  await sharp(file)
    .avif({
      quality: 75,
      effort: 9,
    })
    .toFile(output);

  console.log(`✓ ${output}`);
}

async function walk(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const full = path.join(dir, item);

    if (fs.statSync(full).isDirectory()) {
      await walk(full);
    } else {
      await convert(full);
    }
  }
}

walk("assets");
