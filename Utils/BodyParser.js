// utils/bodyParser.js
export function parseUrlEncoded(req) {
  return new Promise((resolve, reject) => {
    let body = "";
 
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
 
    req.on("end", () => {
      try {
        const params = new URLSearchParams(body);
        const result = Object.fromEntries(params); // Convierte a objeto JS
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
 
    req.on("error", (err) => reject(err));
  });
}