"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const profil_routes_1 = require("./modules/profil/profil.routes");
const user_routes_1 = require("./modules/users/user.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    return res.json({
        success: true,
        message: 'API Suivi des Apprenants - Service en ligne',
        timestamp: new Date().toISOString()
    });
});
app.use('/api/profiles', profil_routes_1.profilRoutes);
app.use('/api/users', user_routes_1.utilisateurRoutes);
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        error: 'Route non trouvée'
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map