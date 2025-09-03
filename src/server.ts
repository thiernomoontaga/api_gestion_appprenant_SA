import app from './app';
import dotenv from 'dotenv';



dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Serveur démarré sur le port ${PORT}`);
  console.log(` URL: http://localhost:${PORT}`);
});