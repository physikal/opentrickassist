import JSZip from "jszip";
import type { StlFile } from "../types/stl";

const RAW_BASE =
  "https://raw.githubusercontent.com/eamars/OpenTrickler/main";

function resolveEntries(
  files: StlFile[],
): { file: StlFile; entry: string }[] {
  const counts = new Map<string, number>();
  for (const f of files) {
    counts.set(f.filename, (counts.get(f.filename) ?? 0) + 1);
  }
  return files.map((file) => {
    const collides = (counts.get(file.filename) ?? 0) > 1;
    if (!collides) return { file, entry: file.filename };
    const folder = file.repoPath.split("/").slice(0, -1).join("/");
    return { file, entry: `${folder}/${file.filename}` };
  });
}

export async function downloadStlZip(
  files: StlFile[],
  onProgress: (downloaded: number, total: number) => void,
): Promise<void> {
  const zip = new JSZip();
  const total = files.length;
  let downloaded = 0;

  const entries = resolveEntries(files);

  const fetches = entries.map(async ({ file, entry }) => {
    const url = `${RAW_BASE}/${encodeURI(file.repoPath)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${file.filename}`);
    }
    const blob = await response.blob();
    zip.file(entry, blob);
    downloaded += 1;
    onProgress(downloaded, total);
  });

  await Promise.all(fetches);

  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = "opentrickler-stl-files.zip";
  link.click();
  URL.revokeObjectURL(link.href);
}
