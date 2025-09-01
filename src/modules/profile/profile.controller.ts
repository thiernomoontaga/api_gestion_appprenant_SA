import { ProfileService } from "./profile.service.js";
import {
  createProfileSchema,
  UpdateProfileInput,
  updateProfileSchema,
} from "./profile.schema.js";
import BaseController from "../module/module.controller.js";

export default class ProfileController extends BaseController<UpdateProfileInput> {
  protected service = new ProfileService();
  protected createSchema = createProfileSchema;
  protected updateSchema = updateProfileSchema;
  protected messages = {
    created: "Profil créé avec succès",
    updated: "Profil mis à jour avec succès",
    deleted: "Profil supprimé avec succès",
  };
}

