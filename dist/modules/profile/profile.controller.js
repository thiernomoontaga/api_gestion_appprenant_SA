import { ProfileService } from "./profile.service.js";
import { createProfileSchema, updateProfileSchema, } from "./profile.schema.js";
import BaseController from "../module/module.controller.js";
export default class ProfileController extends BaseController {
    constructor() {
        super(...arguments);
        this.service = new ProfileService();
        this.createSchema = createProfileSchema;
        this.updateSchema = updateProfileSchema;
        this.messages = {
            created: "Profil créé avec succès",
            updated: "Profil mis à jour avec succès",
            deleted: "Profil supprimé avec succès",
        };
    }
}
