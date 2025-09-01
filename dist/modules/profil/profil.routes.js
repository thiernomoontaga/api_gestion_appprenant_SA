"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilRoutes = void 0;
const express_1 = require("express");
const profil_controller_1 = require("./profil.controller");
const profilRouter = (0, express_1.Router)();
exports.profilRoutes = profilRouter;
profilRouter.get('/', profil_controller_1.ProfilController.getAllProfils);
profilRouter.get('/:id', profil_controller_1.ProfilController.getProfilById);
profilRouter.post('/', profil_controller_1.ProfilController.createProfil);
profilRouter.put('/:id', profil_controller_1.ProfilController.updateProfil);
profilRouter.delete('/:id', profil_controller_1.ProfilController.deleteProfil);
//# sourceMappingURL=profil.routes.js.map