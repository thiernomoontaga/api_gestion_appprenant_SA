"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilController = void 0;
const profil_schema_1 = require("./profil.schema");
const profil_service_1 = require("./profil.service");
class ProfilController {
    static async getAllProfils(req, res) {
        try {
            const profils = await profil_service_1.ProfilService.getAllProfils();
            return res.json({
                success: true,
                data: profils,
                message: 'Profils récupérés avec succès'
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la récupération des profils',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async getProfilById(req, res) {
        try {
            const { id } = profil_schema_1.profilParamsSchema.parse(req.params);
            const profil = await profil_service_1.ProfilService.getProfilById(id);
            if (!profil) {
                return res.status(404).json({
                    success: false,
                    error: 'Profil non trouvé'
                });
            }
            return res.json({
                success: true,
                data: profil,
                message: 'Profil récupéré avec succès'
            });
        }
        catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({
                    success: false,
                    error: 'Paramètres invalides',
                    details: error.message
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la récupération du profil',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async createProfil(req, res) {
        try {
            const data = profil_schema_1.createProfilSchema.parse(req.body);
            const profil = await profil_service_1.ProfilService.createProfil(data);
            return res.status(201).json({
                success: true,
                data: profil,
                message: 'Profil créé avec succès'
            });
        }
        catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({
                    success: false,
                    error: 'Données invalides',
                    details: error.message
                });
            }
            if (error instanceof Error && error.message.includes('Unique constraint')) {
                return res.status(409).json({
                    success: false,
                    error: 'Un profil avec ce libellé existe déjà'
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la création du profil',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async updateProfil(req, res) {
        try {
            const { id } = profil_schema_1.profilParamsSchema.parse(req.params);
            const data = profil_schema_1.updateProfilSchema.parse(req.body);
            const exists = await profil_service_1.ProfilService.checkProfilExists(id);
            if (!exists) {
                return res.status(404).json({
                    success: false,
                    error: 'Profil non trouvé'
                });
            }
            const profil = await profil_service_1.ProfilService.updateProfil(id, data);
            return res.json({
                success: true,
                data: profil,
                message: 'Profil mis à jour avec succès'
            });
        }
        catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({
                    success: false,
                    error: 'Données invalides',
                    details: error.message
                });
            }
            if (error instanceof Error && error.message.includes('Unique constraint')) {
                return res.status(409).json({
                    success: false,
                    error: 'Un profil avec ce libellé existe déjà'
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la mise à jour du profil',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async deleteProfil(req, res) {
        try {
            const { id } = profil_schema_1.profilParamsSchema.parse(req.params);
            const exists = await profil_service_1.ProfilService.checkProfilExists(id);
            if (!exists) {
                return res.status(404).json({
                    success: false,
                    error: 'Profil non trouvé'
                });
            }
            const isUsed = await profil_service_1.ProfilService.checkProfilUsage(id);
            if (isUsed) {
                return res.status(409).json({
                    success: false,
                    error: 'Impossible de supprimer ce profil car il est utilisé par des utilisateurs'
                });
            }
            await profil_service_1.ProfilService.deleteProfil(id);
            return res.json({
                success: true,
                message: 'Profil supprimé avec succès'
            });
        }
        catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({
                    success: false,
                    error: 'Paramètres invalides',
                    details: error.message
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la suppression du profil',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
}
exports.ProfilController = ProfilController;
//# sourceMappingURL=profil.controller.js.map