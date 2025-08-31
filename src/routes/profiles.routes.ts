import { Router } from 'express';
import { ProfilesController } from '../controllers/profiles.controller';

const router = Router();

// Routes pour les profils
router.get('/', ProfilesController.getAllProfiles);
router.get('/:id', ProfilesController.getProfileById);
router.post('/', ProfilesController.createProfile);
router.put('/:id', ProfilesController.updateProfile);
router.delete('/:id', ProfilesController.deleteProfile);

export { router as profilesRoutes };
