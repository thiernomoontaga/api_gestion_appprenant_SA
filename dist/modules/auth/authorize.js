"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const rbac_1 = require("./rbac");
const authorize = (ressource, action) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !user.profilLibelle) {
            return res.status(401).json({ message: "Non authentifié" });
        }
        if (!(0, rbac_1.hasPermission)(user.profilLibelle, ressource, action)) {
            return res.status(403).json({ message: "Accès refusé" });
        }
        next();
    };
};
exports.authorize = authorize;
