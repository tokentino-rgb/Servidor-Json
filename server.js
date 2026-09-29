import http from "node:http";
 
function requestListener(_req, res) {
  res.end("Hola Codeable");
}
 console.log("¡Aquí se construirá un servidor web increíble! :)");
 
const server = http.createServer(requestListener);
server.listen(3000);