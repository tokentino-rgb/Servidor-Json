import { readFile } from "node:fs/promises";
import path from "node:path";
import mime from "mime-types";
 
// La ruta se resuelve relativa al Directorio de Trabajo Actual (CWD)
const PUBLIC_DIR = path.resolve("public");
 
export async function staticHandler(_req, res, pathname) {
  try {
    // Se asume riesgo de Directory Traversal
    const filePath = path.join(PUBLIC_DIR, pathname);
 
    // Intentar leer el archivo
    const data = await readFile(filePath);
 
    // Intentar deducir el tipo MIME, fallback a binario genérico
    const mimeType = mime.lookup(filePath) || "application/octet-stream";
 
    // Escribir la cabecera y enviar el archivo
    res.writeHead(200, { "Content-Type": mimeType });
    return res.end(data);
  } catch (error) {
    // Determinar el código de estado basado en el error de sistema
    let status = 500;
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      status = 404;
    } else if (error.code === "EACCES") {
      status = 403;
    }
 
    res.writeHead(status);
    return res.end();
  }
}