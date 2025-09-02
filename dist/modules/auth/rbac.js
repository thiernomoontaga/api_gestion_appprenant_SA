"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilsRBAC = void 0;
exports.hasPermission = hasPermission;
exports.profilsRBAC = [
    {
        profilLibelle: "Administrateur",
        permissions: [
            { resource: "utilisateur", action: "read" },
            { resource: "utilisateur", action: "write" },
            { resource: "utilisateur", action: "update" },
            { resource: "utilisateur", action: "delete" },
            { resource: "utilisateur", action: "create" },
            { resource: "profilsortie", action: "read" },
            { resource: "profilsortie", action: "write" },
            { resource: "profilsortie", action: "update" },
            { resource: "profilsortie", action: "delete" },
            { resource: "profilsortie", action: "create" },
        ],
    },
    {
        profilLibelle: "Formateur",
        permissions: [
            { resource: "utilisateur", action: "read" },
            { resource: "profilsortie", action: "read" },
        ],
    },
    {
        profilLibelle: "CM",
        permissions: [
            { resource: "utilisateur", action: "read" },
            { resource: "profilsortie", action: "read" },
        ],
    },
    {
        profilLibelle: "Apprenant",
        permissions: [{ resource: "utilisateur", action: "read" }],
    },
];
function hasPermission(profilLibelle, resource, action) {
    const profil = exports.profilsRBAC.find((p) => p.profilLibelle === profilLibelle);
    if (!profil)
        return false;
    return profil.permissions.some((perm) => perm.resource === resource && perm.action === action);
}
