"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const competence_controller_js_1 = require("./competence.controller.js");
const competenceRouter = (0, express_1.Router)();
competenceRouter.post("/", competence_controller_js_1.CompetenceController.create);
competenceRouter.get("/", competence_controller_js_1.CompetenceController.getAll);
competenceRouter.get("/test", (req, res) => {
    res.json({ message: "test reussi" });
});
competenceRouter.get("/:id", competence_controller_js_1.CompetenceController.getOne);
competenceRouter.put("/:id", competence_controller_js_1.CompetenceController.update);
competenceRouter.delete("/:id", competence_controller_js_1.CompetenceController.delete);
exports.default = competenceRouter;
