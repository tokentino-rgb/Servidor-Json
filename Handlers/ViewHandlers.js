import { HttpError } from "../Utils/Errors.js";
import path from "node:path";
import fs from "node:fs/promises";

const DATA_DIR = path.join(import.meta.dirname, "../data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

export async function postContact(req, res) {
  // 1. Extraer datos con el middleware de Express
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new HttpError("Faltan campos requeridos", 400);
  }

  let messages = [];

  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    messages = JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } else {
      throw error; // Dejamos fluir los errores a Express
    }
  }

  messages.push({
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  });

  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  // 2. Renderizar la vista pasando las variables
  res.render("contact-success", { name, email });
}

export async function getHome(_req, res) {
  // 3. Renderizar la vista home.ejs
  res.render("home");
}

export async function getNewContact(_req, res) {
  // 4. Renderizar la vista new-contact.ejs
  res.render("new-contact");
}