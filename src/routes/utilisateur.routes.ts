// src/routes/utilisateur.routes.ts
import { Router } from 'express';
import { UtilisateurController } from '../controllers/utilisateur.controller';

const userRouter = Router();

// Routes pour les utilisateurs
userRouter.get('/', UtilisateurController.getAllUtilisateurs);
userRouter.get('/:id', UtilisateurController.getUtilisateurById);
userRouter.post('/', UtilisateurController.createUtilisateur);
userRouter.put('/:id', UtilisateurController.updateUtilisateur);
userRouter.put('/:id/statut', UtilisateurController.updateStatutUtilisateur);
userRouter.delete('/:id', UtilisateurController.deleteUtilisateur);

export { userRouter as utilisateurRoutes };



