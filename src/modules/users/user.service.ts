import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default {
  update: async (id: number, data: any) => {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
    if (!utilisateur) throw new Error("Utilisateur non trouvé");
    let updateData = { ...data };
    if (data.password && data.password !== utilisateur.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.utilisateur.update({
      where: { id },
      data: updateData,
      include: { profil: true },
    });
  },
  partialUpdate: async (id: number, data: any) => {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
    if (!utilisateur) throw new Error("Utilisateur non trouvé");
    let updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.utilisateur.update({
      where: { id },
      data: updateData,
      include: { profil: true },
    });
  },
  getAll: async () => {
    return await prisma.utilisateur.findMany({ include: { profil: true } });
  },
  getById: async (id: number) => {
    return await prisma.utilisateur.findUnique({
      where: { id },
      include: { profil: true },
    });
  },
  create: async (
    nom: string,
    prenom: string,
    email: string,
    login: string,
    password: string,
    profilId: number,
    statutUtilisateur: string = "ACTIF"
  ) => {
    const existingUtilisateur = await prisma.utilisateur.findFirst({
      where: {
        OR: [{ email }, { login }],
      },
    });
    if (existingUtilisateur) throw new Error("Utilisateur existe déjà");

    const profil = await prisma.profil.findUnique({ where: { id: profilId } });
    if (!profil) throw new Error("Profil non trouvé");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUtilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        login,
        password: hashedPassword,
        profilId,
        statutUtilisateur,
      },
      include: {
        profil: true,
      },
    });

    return newUtilisateur;
  },
  delete: async (id: number) => {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
    if (!utilisateur) throw new Error("Utilisateur non trouvé");
    await prisma.utilisateur.delete({ where: { id } });
    return { message: "Utilisateur supprimé" };
  },
};
