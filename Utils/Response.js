import { getLayout } from "./html.js"; // Importación arriba del todo

export function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
 
export function sendHtml(res, html, status = 200) {
  res.writeHead(status, { "Content-Type": "text/html" });
  res.end(html);
}
 
export function sendHtmlError(res, message, status = 500) {
  const content = `
    <h1>Error ${status}</h1>
    <p>${message}</p>
    <a href="/">Volver al inicio</a>
  `;
  const html = getLayout(`Error ${status}`, content);
  sendHtml(res, html, status);
} // <-- AGREGA ESTA LLAVE PARA CERRAR sendHtmlError
 
export function sendJsonError(res, message, status = 500) {
  sendJson(res, { error: message }, status);
}
