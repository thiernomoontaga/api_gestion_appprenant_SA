
import express from "express";
import userRoutes from "./modules/users/user.routes.js";
import profilSortieRoutes from "./modules/profilsorties/profilsortie.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import swaggerDoc from "./middlewares/swagger.js";
import competenceRouter from "./modules/competence/competence.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé
app.get('/health', (req, res) => {
  return res.json({
    success: true,
    message: 'API Suivi des Apprenants - Service en ligne',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

app.use("/utilisateurs", userRoutes);
app.use("/profilsorties", profilSortieRoutes);
app.use("/competences", competenceRouter);
app.use("/profiles", profileRoutes);

export default app;

