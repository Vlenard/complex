import fs from "fs";
import path from "path";

const storageDir = path.join(process.cwd(), "public", "storage");

export async function saveBeerImage(file: File): Promise<string> {
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `image-${uniqueSuffix}${path.extname(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  fs.writeFileSync(path.join(storageDir, filename), buffer);

  return `/storage/${filename}`;
}
