import { staticHandler } from "./Handlers/StaticHandler.js";
import { sendHtmlError, sendJsonError } from "./Utils/Response.js";
import { getHealth, getTime } from "./Handlers/ApiHandlers.js";
import { getHome, getNewContact, postContact } from "./Handlers/ViewHandlers.js";

export async function router(req, res) {
  const pathname = req.url;
  const method = req.method;

  try { // 2. ABRIMOS EL TRY AQUÍ
    
    // Rutas de API
    if (pathname === "/api/health") {
      return await getHealth(req, res);
    }
    if (pathname === "/api/time") {
      return await getTime(req, res);
    }

    // Rutas de Vistas
    if (pathname === "/") {
      return await getHome(req, res);
    }
    if (pathname === "/contact" && method === "GET") {
      return await getNewContact(req, res);
    }
    if (pathname === "/contact" && method === "POST") {
      return await postContact(req, res);
    }

    // Fallback: Archivos Estáticos
    return await staticHandler(req, res, pathname);

  } catch (err) { // 3. AGREGAMOS EL CATCH AQUÍ
    console.error("Router Error:", err);
    
    // Si el error tiene un status, lo usamos. Si no, usamos 500.
    const status = err.status || 500;
    // Si el status es 500, usamos un mensaje genérico. Si no, usamos el del error.
    const message = status === 500 ? "Error Interno del Servidor" : err.message;
    
  if (pathname.startsWith("/api")) {
   sendJsonError(res, message, status);
 } else {
   sendHtmlError(res, message, status);
 }
  }
}
