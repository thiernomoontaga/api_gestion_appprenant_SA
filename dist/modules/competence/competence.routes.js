import { Router } from "express";
import { CompetenceController } from "./competence.controller.js";
const competenceRouter = Router();
competenceRouter.post("/", CompetenceController.create);
competenceRouter.get("/", CompetenceController.getAll);
competenceRouter.get("/test", (req, res) => {
    res.json({ message: "test reussi" });
});
competenceRouter.get("/:id", CompetenceController.getOne);
competenceRouter.put("/:id", CompetenceController.update);
competenceRouter.delete("/:id", CompetenceController.delete);
export default competenceRouter;
