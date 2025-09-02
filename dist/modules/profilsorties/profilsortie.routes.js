"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profilsortie_controller_1 = __importDefault(require("./profilsortie.controller"));
const authorize_1 = require("../auth/authorize");
const router = (0, express_1.Router)();
router.get("/", (0, authorize_1.authorize)("profilsortie", "read"), profilsortie_controller_1.default.getAll.bind(profilsortie_controller_1.default));
router.post("/", (0, authorize_1.authorize)("profilsortie", "create"), profilsortie_controller_1.default.create.bind(profilsortie_controller_1.default));
router.get("/:id", (0, authorize_1.authorize)("profilsortie", "read"), profilsortie_controller_1.default.getById.bind(profilsortie_controller_1.default));
router.put("/:id", (0, authorize_1.authorize)("profilsortie", "update"), profilsortie_controller_1.default.update.bind(profilsortie_controller_1.default));
router.patch("/:id", (0, authorize_1.authorize)("profilsortie", "update"), profilsortie_controller_1.default.partialUpdate.bind(profilsortie_controller_1.default));
router.delete("/:id", (0, authorize_1.authorize)("profilsortie", "delete"), profilsortie_controller_1.default.delete.bind(profilsortie_controller_1.default));
exports.default = router;
