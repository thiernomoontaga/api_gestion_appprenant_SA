"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurController = void 0;
const user_schema_1 = require("./user.schema");
const user_service_1 = require("./user.service");
class UtilisateurController {
    static async getAllUtilisateurs(req, res) {
        try {
            const { profile, statut } = req.query;
            const utilisateurs = await user_service_1.UtilisateurService.getAllUtilisateurs(profile, statut);
            return res.json({
                success: true,
                data: utilisateurs,
                message: 'Utilisateurs récupérés avec succès'
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la récupération des utilisateurs',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async getUtilisateurById(req, res) {
        try {
            const { id } = user_schema_1.utilisateurParamsSchema.parse(req.params);
            const utilisateur = await user_service_1.UtilisateurService.getUtilisateurById(id);
            if (!utilisateur) {
                return res.status(404).json({
                    success: false,
                    error: 'Utilisateur non trouvé'
                });
            }
            return res.json({
                success: true,
                data: utilisateur,
                message: 'Utilisateur récupéré avec succès'
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
                error: 'Erreur lors de la récupération de l\'utilisateur',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async createUtilisateur(req, res) {
        try {
            const data = user_schema_1.createUtilisateurSchema.parse(req.body);
            const utilisateur = await user_service_1.UtilisateurService.createUtilisateur(data);
            return res.status(201).json({
                success: true,
                data: utilisateur,
                message: 'Utilisateur créé avec succès'
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
            if (error instanceof Error && error.message.includes('Le profil spécifié n\'existe pas')) {
                return res.status(400).json({
                    success: false,
                    error: error.message
                });
            }
            if (error instanceof Error && error.message.includes('Unique constraint')) {
                if (error.message.includes('email')) {
                    return res.status(409).json({
                        success: false,
                        error: 'Un utilisateur avec cet email existe déjà'
                    });
                }
                if (error.message.includes('login')) {
                    return res.status(409).json({
                        success: false,
                        error: 'Un utilisateur avec ce login existe déjà'
                    });
                }
                return res.status(409).json({
                    success: false,
                    error: 'Un utilisateur avec ces informations existe déjà'
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la création de l\'utilisateur',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async updateUtilisateur(req, res) {
        try {
            const { id } = user_schema_1.utilisateurParamsSchema.parse(req.params);
            const data = user_schema_1.updateUtilisateurSchema.parse(req.body);
            const utilisateur = await user_service_1.UtilisateurService.updateUtilisateur(id, data);
            return res.json({
                success: true,
                data: utilisateur,
                message: 'Utilisateur mis à jour avec succès'
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
            if (error instanceof Error && error.message.includes('Utilisateur non trouvé')) {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            }
            if (error instanceof Error && error.message.includes('Le profil spécifié n\'existe pas')) {
                return res.status(400).json({
                    success: false,
                    error: error.message
                });
            }
            if (error instanceof Error && error.message.includes('Unique constraint')) {
                if (error.message.includes('email')) {
                    return res.status(409).json({
                        success: false,
                        error: 'Un utilisateur avec cet email existe déjà'
                    });
                }
                if (error.message.includes('login')) {
                    return res.status(409).json({
                        success: false,
                        error: 'Un utilisateur avec ce login existe déjà'
                    });
                }
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la mise à jour de l\'utilisateur',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async deleteUtilisateur(req, res) {
        try {
            const { id } = user_schema_1.utilisateurParamsSchema.parse(req.params);
            await user_service_1.UtilisateurService.deleteUtilisateur(id);
            return res.json({
                success: true,
                message: 'Utilisateur supprimé avec succès'
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
            if (error instanceof Error && error.message.includes('Utilisateur non trouvé')) {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la suppression de l\'utilisateur',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    static async updateStatutUtilisateur(req, res) {
        try {
            const { id } = user_schema_1.utilisateurParamsSchema.parse(req.params);
            const { statut } = req.body;
            if (!['actif', 'abandon', 'renvoyer', 'decede', 'suspendu'].includes(statut)) {
                return res.status(400).json({
                    success: false,
                    error: 'Statut invalide. Valeurs acceptées: actif, abandon, renvoyer, decede, suspendu'
                });
            }
            const utilisateur = await user_service_1.UtilisateurService.updateStatutUtilisateur(id, statut);
            return res.json({
                success: true,
                data: utilisateur,
                message: 'Statut utilisateur mis à jour avec succès'
            });
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('Record to update not found')) {
                return res.status(404).json({
                    success: false,
                    error: 'Utilisateur non trouvé'
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de la mise à jour du statut',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
}
exports.UtilisateurController = UtilisateurController;
//# sourceMappingURL=user.controller.js.map