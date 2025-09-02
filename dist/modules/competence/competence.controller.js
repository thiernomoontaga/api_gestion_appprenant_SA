"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetenceController = void 0;
const competence_service_js_1 = require("./competence.service.js");
const competence_schema_js_1 = require("./competence.schema.js");
class CompetenceController {
    static async create(req, res) {
        try {
            const data = competence_schema_js_1.createCompetenceSchema.parse(req.body);
            const competence = await competence_service_js_1.CompetenceService.create(data);
            res.status(201).json(competence);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async getAll(req, res) {
        const competences = await competence_service_js_1.CompetenceService.findAll();
        res.status(200).json(competences);
    }
    static async getOne(req, res) {
        const { id } = req.params;
        const competence = await competence_service_js_1.CompetenceService.findById(Number(id));
        if (!competence)
            return res.status(404).json({ error: "Compétence introuvable" });
        res.status(200).json(competence);
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = competence_schema_js_1.updateCompetenceSchema.parse(req.body);
            const competence = await competence_service_js_1.CompetenceService.update(Number(id), data);
            res.status(200).json(competence);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async delete(req, res) {
        const { id } = req.params;
        await competence_service_js_1.CompetenceService.delete(Number(id));
        res.status(204).send();
    }
}
exports.CompetenceController = CompetenceController;
