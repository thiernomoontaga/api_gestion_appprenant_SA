import express from 'express';
// import cors from 'cors';
// import { profilesRoutes } from './routes/profiles.routes';
// import { utilisateurRoutes } from './routes/utilisateur.routes';
import { niveauRouter } from './modules/niveau/niveau.routes';

const app = express();

// Middlewares
// app.use(cors());
app.use(express.json());

// Routes API
// app.use('/api/profiles', profilesRoutes);
// app.use('/api/users', utilisateurRoutes);
app.use('/niveaux', niveauRouter);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

export default app;

