import http from "node:http";
import { router } from "./Router.js";
 
const PORT = 3000;
 
const server = http.createServer((req, res) => {
  router(req, res);
});
 
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});