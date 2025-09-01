
import app from "./app.js";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port http://localhost:${PORT}/`);

  console.log(` Serveur démarré sur le port ${PORT}`);
  console.log(` URL: http://localhost:${PORT}`);
});