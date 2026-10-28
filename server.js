import express from "express";
import expressLayouts from "express-ejs-layouts"; 
// Importamos tus handlers
import { getHome, getNewContact, postContact } from "./Handlers/ViewHandlers.js";
import { getHealth, getTime } from "./Handlers/ApiHandlers.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); 
app.use(expressLayouts); 

// 3. MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// 4. RUTAS DE VISTAS
app.get("/", getHome);
app.get("/contact", getNewContact);
app.post("/contact", postContact);

// 5. RUTAS DE API
app.get("/api/health", getHealth);
app.get("/api/time", getTime);

// 6. INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});