"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilisateurRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
exports.utilisateurRoutes = userRouter;
userRouter.get('/', user_controller_1.UtilisateurController.getAllUtilisateurs);
userRouter.get('/:id', user_controller_1.UtilisateurController.getUtilisateurById);
userRouter.post('/', user_controller_1.UtilisateurController.createUtilisateur);
userRouter.put('/:id', user_controller_1.UtilisateurController.updateUtilisateur);
userRouter.put('/:id/statut', user_controller_1.UtilisateurController.updateStatutUtilisateur);
userRouter.delete('/:id', user_controller_1.UtilisateurController.deleteUtilisateur);
//# sourceMappingURL=user.routes.js.map