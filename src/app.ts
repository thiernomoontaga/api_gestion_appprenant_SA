import express from 'express';
import cors from 'cors';
import { profilesRoutes } from './routes/profiles.routes';
import { utilisateurRoutes } from './routes/utilisateur.routes';

const app = express();

// Middlewares
app.use(cors());
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

// Routes API
app.use('/api/profiles', profilesRoutes);
app.use('/api/users', utilisateurRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});


export default app;

