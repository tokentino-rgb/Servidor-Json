import { readFile } from "node:fs/promises";
import mime from "mime-types";
import path from "node:path";
import { sendHtmlError } from "../Utils/Response.js"; 
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
    let status = 500;
    let message = "Error interno del servidor";
    
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      status = 404;
      message = "Recurso no encontrado";
    } else if (error.code === "EACCES") {
      status = 403;
      message = "Acceso prohibido";
    }
 
    return sendHtmlError(res, message, status); // Cambio aplicado
  }
   }