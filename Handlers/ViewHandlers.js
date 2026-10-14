import { HttpError } from "../Utils/Errors.js";
import { getLayout } from "../Utils/html.js";
import { sendHtml, sendHtmlError } from "../Utils/Response.js";
import path from "node:path";
import fs from "node:fs/promises";
import { parseUrlEncoded } from "../Utils/BodyParser.js";
 
const DATA_DIR = path.join(import.meta.dirname, "../data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
 
export async function postContact(req, res) {
  let body;
 try {
    body = await parseUrlEncoded(req);
  } catch {
    return sendHtmlError(res, "Error interno del servidor", 500); // Cambio aplicado
  }
 
  const { name, email, message } = body;
 
  if (!name || !email || !message) {
  throw new HttpError("Faltan campos requeridos", 400);
}
  let messages = [];
 
  // Intentamos leer los mensajes existentes del archivo JSON.
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    messages = JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // Si el archivo no existe, solo nos aseguramos de que el directorio
      // data existe para la futura escritura (messages ya se inicializó como `[]`)
      await fs.mkdir(DATA_DIR, { recursive: true });
    } else {
      // Cualquier otro error se trata como un error de servidor.
      const status = 500; // Internal Server Error
      res.writeHead(status);
      return res.end();
    }
  }
 
  // Añadimos el nuevo mensaje al array.
  messages.push({
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  });
 
  // Guardamos el array actualizado en el archivo JSON para persistencia.
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
 
  // Devolvemos una confirmación.
  const content = `
    <h1>Mensaje Recibido</h1>
    <p>Gracias <strong>${name}</strong> (${email}). Hemos recibido tu mensaje.</p>
    <a href="/">Volver al inicio</a>
  `;
 
  const html = getLayout("Confirmación", content);
  sendHtml(res, html);
}
 
export async function getHome(_req, res) {
  const content = `
    <h1>Bienvenido a Vanilla Node Web Server</h1>
    <section>
      <h2>Conoce a la mascota</h2>
      <figure>
        <img src="/node-mascot.svg" alt="Mascota de Node.js" width="120" />
        <figcaption>Mascota de Node.js</figcaption>
      </figure>
    </section>
    <section>
      <h2>Prueba la API</h2>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/api/time">/api/time</a></li>
      </ul>
    </section>
  `;
 
  const html = getLayout("Inicio", content);
  sendHtml(res, html);
}

 
export async function getNewContact(_req, res) {
  const content = `
    <section>
      <h2>Formulario de Contacto</h2>
      <form action="/contact" method="POST">
        <div>
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="message">Mensaje:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  `;
 
  const html = getLayout("Nuevo Contacto", content);
  sendHtml(res, html);
}