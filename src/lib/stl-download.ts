import JSZip from "jszip";
import type { StlFile } from "../types/stl";

const RAW_BASE =
  "https://raw.githubusercontent.com/eamars/OpenTrickler/main";

export async function downloadStlZip(
  files: StlFile[],
  onProgress: (downloaded: number, total: number) => void,
): Promise<void> {
  const zip = new JSZip();
  const total = files.length;
  let downloaded = 0;

  const fetches = files.map(async (file) => {
    const url = `${RAW_BASE}/${encodeURI(file.repoPath)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${file.filename}`);
    }
    const blob = await response.blob();
    zip.file(file.filename, blob);
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
