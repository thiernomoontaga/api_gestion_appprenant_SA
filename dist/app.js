"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Initialisation d’Express
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const profilsortie_routes_1 = __importDefault(require("./modules/profilsorties/profilsortie.routes"));
const swagger_1 = __importDefault(require("./middlewares/swagger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(swagger_1.default);
app.use("/utilisateurs", user_routes_1.default);
app.use("/profilsorties", profilsortie_routes_1.default);
exports.default = app;
