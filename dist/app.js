"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const profilsortie_routes_1 = __importDefault(require("./modules/profilsorties/profilsortie.routes"));
const swagger_1 = __importDefault(require("./middlewares/swagger"));
const competence_routes_js_1 = __importDefault(require("./modules/competence/competence.routes.js"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const auth_middleware_1 = require("./modules/auth/auth.middleware");
const niveau_1 = require("./modules/niveau");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(swagger_1.default);
app.use("/auth", auth_routes_1.default);
app.use((req, res, next) => {
    if (req.path.startsWith("/auth"))
        return next();
    (0, auth_middleware_1.protectRoute)(req, res, next);
});
app.use("/utilisateurs", user_routes_1.default);
app.use("/profilsorties", profilsortie_routes_1.default);
app.use("/competences", competence_routes_js_1.default);
app.use("/niveaux", niveau_1.niveauRouter);
exports.default = app;
