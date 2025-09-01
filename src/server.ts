<<<<<<< HEAD
import app from "./app.js";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
=======
import app from './app';
import dotenv from 'dotenv';

>>>>>>> 97db8ef858034e8e33723dcfa1616f970f8e832a
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(errorHandler)
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Serveur démarré sur le port http://localhost:${PORT}/`);
=======
  console.log(` Serveur démarré sur le port ${PORT}`);
  console.log(` URL: http://localhost:${PORT}`);
>>>>>>> 97db8ef858034e8e33723dcfa1616f970f8e832a
});