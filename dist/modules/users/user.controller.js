"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const user_schema_1 = require("./user.schema");
const userController = {
    getAll: async (req, res) => {
        try {
            const users = await user_service_1.default.getAll();
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getById: async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        try {
            const user = await user_service_1.default.getById(id);
            if (!user)
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            res.json(user);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    update: async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        const parseResult = user_schema_1.userUpdateSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const user = await user_service_1.default.update(id, parseResult.data);
            res.json(user);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    partialUpdate: async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        const parseResult = user_schema_1.userPatchSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const user = await user_service_1.default.partialUpdate(id, parseResult.data);
            res.json(user);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        const parseResult = user_schema_1.userSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const { nom, prenom, email, login, password, profilId, statutUtilisateur, } = parseResult.data;
            const user = await user_service_1.default.create(nom, prenom, email, login, password, profilId, statutUtilisateur);
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        try {
            const result = await user_service_1.default.delete(id);
            res.json(result);
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
};
exports.default = userController;
