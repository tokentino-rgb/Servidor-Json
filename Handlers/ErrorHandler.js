export function globalErrorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;
 
  // Decidimos si responder con JSON o HTML igual que antes
  // Usamos req.path (propio de Express) en vez de req.url para ignorar query strings
  if (req.path.startsWith("/api")) {
    res.status(status).json({ error: message });
  } else {
    // ... lógica de HTML (la simplificamos aquí para el ejemplo)
    res.status(status).send(`<h1>Error ${status}</h1><p>${message}</p>`);
  }
}