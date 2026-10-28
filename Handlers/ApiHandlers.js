import { sendJson } from "../Utils/Response.js";
 
export async function getHealth(req, res) {
 res.json({ status: "ok" })
}
 
export async function getTime(req, res) {
  res.json({ time: new Date().toISOString() });
}