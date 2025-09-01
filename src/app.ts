import express from "express";
import dotenv from "dotenv";
import referentielRoutes from "./modules/referentiels/referentiel.routes";
import tagRoutes from "./modules/tags/tag.routes";
import userRoutes from "./modules/users/user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.use("/referentiels", referentielRoutes);
app.use("/tags", tagRoutes);
app.use("/users", userRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API Gestion Apprenant SA - Sprint 01" });
});




if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
}

export default app;
