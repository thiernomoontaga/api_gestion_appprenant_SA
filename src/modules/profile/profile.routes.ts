import { Router } from "express";
import { ProfileController } from "./profile.controller.js";

const ProfileRouter = Router();


ProfileRouter.post("/", ProfileController.create);
ProfileRouter.get("/", ProfileController.getAll);
ProfileRouter.get("/:id", ProfileController.getOne);
ProfileRouter.put("/:id", ProfileController.update);
ProfileRouter.delete("/:id", ProfileController.delete);

export default ProfileRouter;
