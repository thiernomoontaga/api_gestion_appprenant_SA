"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const authorize_1 = require("../auth/authorize");
const router = (0, express_1.Router)();
router.get("/utilisateurs", (0, authorize_1.authorize)("utilisateur", "read"), user_controller_1.default.getAll);
router.post("/utilisateurs", (0, authorize_1.authorize)("utilisateur", "create"), user_controller_1.default.create);
// Protéger toutes les routes REST par le RBAC
router.get("/", (0, authorize_1.authorize)("utilisateur", "read"), user_controller_1.default.getAll);
router.post("/", (0, authorize_1.authorize)("utilisateur", "create"), user_controller_1.default.create);
router.get("/:id", (0, authorize_1.authorize)("utilisateur", "read"), user_controller_1.default.getById);
router.put("/:id", (0, authorize_1.authorize)("utilisateur", "update"), user_controller_1.default.update);
router.patch("/:id", (0, authorize_1.authorize)("utilisateur", "update"), user_controller_1.default.partialUpdate);
router.delete("/:id", (0, authorize_1.authorize)("utilisateur", "delete"), user_controller_1.default.delete);
exports.default = router;
