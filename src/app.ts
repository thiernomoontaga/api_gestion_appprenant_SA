<<<<<<< HEAD
import express from 'express';
// import cors from 'cors';
// import { profilesRoutes } from './routes/profiles.routes';
// import { utilisateurRoutes } from './routes/utilisateur.routes';
import { niveauRouter } from './modules/niveau/niveau.routes';
=======

import express from "express";
import userRoutes from "./modules/users/user.routes.js";
import profilSortieRoutes from "./modules/profilsorties/profilsortie.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import swaggerDoc from "./middlewares/swagger.js";
import competenceRouter from "./modules/competence/competence.routes.js";
import permissionHandle from "./middlewares/permission.js";
>>>>>>> origin/gorgui_work

const app = express();

// Middlewares
<<<<<<< HEAD
// app.use(cors());
app.use(express.json());

// Routes API
// app.use('/api/profiles', profilesRoutes);
// app.use('/api/users', utilisateurRoutes);
app.use('/niveaux', niveauRouter);
=======
app.use(express.json());
app.use(permissionHandle);
// Route de santé
app.get('/health', (req, res) => {
  return res.json({
    success: true,
    message: 'API Suivi des Apprenants - Service en ligne',
    timestamp: new Date().toISOString()
  });
});

app.use("/utilisateurs", userRoutes);
app.use("/profilsorties", profilSortieRoutes);
app.use("/competences", competenceRouter);
app.use("/profiles", profileRoutes);
>>>>>>> origin/gorgui_work

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

export default app;

