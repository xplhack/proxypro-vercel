export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("❌ Parámetro 'url' requerido.");
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("❌ No se pudo acceder al video.");

    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");

    response.body.pipe(res);
  } catch (error) {
    res.status(500).send(error.message || "❌ Error al obtener el archivo.");
  }
}
