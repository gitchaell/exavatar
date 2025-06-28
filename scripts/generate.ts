import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";
import { ensureDir } from "https://deno.land/std@0.224.0/fs/ensure_dir.ts";
import { join, basename } from "https://deno.land/std@0.224.0/path/mod.ts";
import { processAvatar } from "../src/infrastructure/image/SharpImageProcessor.ts";

// Sizes and formats to generate
const sizes = [64, 128, 256, 512, 1024];
const formats = ["png", "jpeg", "webp", "gif"] as const;

const assetsDir = join("src", "assets");
const outDir = join("public", "avatars");

async function generate() {
  for await (const entry of walk(join(assetsDir, "animals"), { maxDepth: 1, exts: [".png"] })) {
    if (!entry.isFile) continue;
    const base = basename(entry.path, ".png");
    const data = await Deno.readFile(entry.path);
    for (const size of sizes) {
      for (const fmt of formats) {
        const buf = await processAvatar(data, size, fmt, "square");
        const dir = join(outDir, "animals", String(size));
        await ensureDir(dir);
        await Deno.writeFile(join(dir, `${base}.${fmt}`), buf);
      }
    }
  }
}

if (import.meta.main) {
  generate();
}
