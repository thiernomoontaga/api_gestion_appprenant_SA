import { ProfileService } from "./profile.service.js";
import {
  createProfileSchema,
  UpdateProfileInput,
  updateProfileSchema,
} from "./profile.schema.js";
import BaseController from "../module/module.controller.js";
import { ProfileMessage } from "../../enums/profile.messages.js";

export default class ProfileController extends BaseController<UpdateProfileInput> {
  protected service = new ProfileService();
  protected createSchema = createProfileSchema;
  protected updateSchema = updateProfileSchema;
  protected messages = {
    created: ProfileMessage.Created,
    updated: ProfileMessage.Updated,
    deleted: ProfileMessage.Deleted,
  };
}

