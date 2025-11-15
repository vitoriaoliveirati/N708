import { put, head } from "@vercel/blob";

const PREFIX = "biblioconecta-data/";

export async function loadJson(name: string) {
  try {
    const filePath = PREFIX + name;

    // Verifica se existe
    const info = await head(filePath);
    if (!info) return null;

    // Baixa o JSON
    const res = await fetch(info.url);
    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("Erro ao carregar arquivo:", err);
    return null;
  }
}

export async function saveJson(name: string, data: any) {
  try {
    await put(PREFIX + name, JSON.stringify(data, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
  } catch (err) {
    console.error("Erro ao salvar arquivo:", err);
  }
}
git add .
git commit -m "Corrigido blobStorage - compatível com head()"
git push -u origin main
