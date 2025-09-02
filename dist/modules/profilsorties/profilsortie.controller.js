"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profilsortie_service_1 = __importDefault(require("./profilsortie.service"));
const profilsortie_schema_1 = require("./profilsortie.schema");
class ProfilSortieController {
    async getAll(_req, res) {
        try {
            const items = await profilsortie_service_1.default.getAll();
            res.json(items);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getById(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "ID invalide" });
        try {
            const item = await profilsortie_service_1.default.getById(id);
            if (!item)
                return res.status(404).json({ error: "Non trouvé" });
            res.json(item);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async create(req, res) {
        const parseResult = profilsortie_schema_1.profilSortieSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const item = await profilsortie_service_1.default.create(parseResult.data);
            res.status(201).json(item);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async update(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "ID invalide" });
        const parseResult = profilsortie_schema_1.profilSortieSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const item = await profilsortie_service_1.default.update(id, parseResult.data);
            res.json(item);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async partialUpdate(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "ID invalide" });
        const parseResult = profilsortie_schema_1.profilSortieUpdateSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const item = await profilsortie_service_1.default.update(id, parseResult.data);
            res.json(item);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "ID invalide" });
        try {
            const result = await profilsortie_service_1.default.delete(id);
            res.json(result);
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}
exports.default = new ProfilSortieController();
