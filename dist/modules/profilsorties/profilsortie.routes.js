"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profilsortie_controller_1 = __importDefault(require("./profilsortie.controller"));
const router = (0, express_1.Router)();
router.get("/", profilsortie_controller_1.default.getAll);
router.post("/", profilsortie_controller_1.default.create);
router.get("/:id", profilsortie_controller_1.default.getById);
router.put("/:id", profilsortie_controller_1.default.update);
router.patch("/:id", profilsortie_controller_1.default.partialUpdate);
router.delete("/:id", profilsortie_controller_1.default.delete);
exports.default = router;
