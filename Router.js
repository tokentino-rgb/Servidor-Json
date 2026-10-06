import { staticHandler } from "./Handlers/StaticHandler.js";
import { getHealth, getTime } from "./Handlers/ApiHandlers.js";
import { getHome, getNewContact, postContact } from "./Handlers/ViewHandlers.js"; // Única línea para ViewHandlers

export async function router(req, res) {
  const pathname = req.url;
  const method = req.method; // 2. Extraemos el método para usarlo en las rutas

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
  
  // 3. Movemos las rutas de contacto dentro de esta única función
  if (pathname === "/contact" && method === "GET") {
    return await getNewContact(req, res);
  }
  
  if (pathname === "/contact" && method === "POST") {
    return await postContact(req, res);
  }

  // Fallback: Archivos Estáticos
  return await staticHandler(req, res, pathname);
}