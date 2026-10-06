export function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
 
export function sendHtml(res, html, status = 200) {
  res.writeHead(status, { "Content-Type": "text/html" });
  res.end(html);
}