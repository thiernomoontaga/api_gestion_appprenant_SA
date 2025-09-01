import { ProfileService } from "./profile.service.js";
import { createProfileSchema, updateProfileSchema, } from "./profile.schema.js";
export class ProfileController {
    static async create(req, res) {
        try {
            const data = createProfileSchema.parse(req.body);
            const competence = await ProfileService.create(data);
            res.status(201).json(competence);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async getAll(req, res) {
        const competences = await ProfileService.findAll();
        res.status(200).json(competences);
    }
    static async getOne(req, res) {
        const { id } = req.params;
        const competence = await ProfileService.findById(Number(id));
        if (!competence)
            return res.status(404).json({ error: "Compétence introuvable" });
        res.status(200).json(competence);
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = updateProfileSchema.parse(req.body);
            const competence = await ProfileService.update(Number(id), data);
            res.status(200).json(competence);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async delete(req, res) {
        const { id } = req.params;
        await ProfileService.delete(Number(id));
        res.status(204).send();
    }
}
