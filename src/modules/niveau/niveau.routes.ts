import { Router } from 'express';
import { NiveauController } from './niveau.controller';
import { validate } from '../../middlewares/validate';
import { createNiveauSchema, updateNiveauSchema } from './niveau.schema';

const niveauRouter = Router();

niveauRouter.get('/', NiveauController.getAllNiveaux);
niveauRouter.get('/:id', NiveauController.getNiveauById);
niveauRouter.post('/', validate(createNiveauSchema), NiveauController.createNiveau);
niveauRouter.put('/:id', validate(updateNiveauSchema), NiveauController.updateNiveau);
niveauRouter.delete('/:id', NiveauController.deleteNiveau);
niveauRouter.get('/competence/:competenceId', NiveauController.getNiveauxByCompetence);

export { niveauRouter };
