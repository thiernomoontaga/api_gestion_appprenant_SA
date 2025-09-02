export type Action = "read" | "write" | "update" | "delete" | "create";
export type Resource = string;

export interface Permission {
  resource: Resource;
  action: Action;
}

export interface Role {
  profilLibelle: string;
  permissions: Permission[];
}

export const profilsRBAC: Role[] = [
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

export function hasPermission(
  profilLibelle: string,
  resource: Resource,
  action: Action
): boolean {
  const profil = profilsRBAC.find((p) => p.profilLibelle === profilLibelle);
  if (!profil) return false;
  return profil.permissions.some(
    (perm) => perm.resource === resource && perm.action === action
  );
}
