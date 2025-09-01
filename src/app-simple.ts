import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API Gestion Apprenant SA - Sprint 01" });
});

// Test routes simples
app.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

export default app;
