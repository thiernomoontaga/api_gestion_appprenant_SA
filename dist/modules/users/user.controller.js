import userService from "./user.service.js";
import { userSchema, userUpdateSchema, userPatchSchema } from "./user.schema.js";
const userController = {
    getAll: async (req, res) => {
        try {
            const users = await userService.getAll();
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
            const user = await userService.getById(id);
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
        const parseResult = userUpdateSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const user = await userService.update(id, parseResult.data);
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
        const parseResult = userPatchSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const user = await userService.partialUpdate(id, parseResult.data);
            res.json(user);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        const parseResult = userSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: parseResult.error.issues });
        }
        try {
            const { nom, prenom, email, login, password, profilId, statutUtilisateur, } = parseResult.data;
            const user = await userService.create(nom, prenom, email, login, password, profilId, statutUtilisateur);
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
            const result = await userService.delete(id);
            res.json(result);
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
};
export default userController;
