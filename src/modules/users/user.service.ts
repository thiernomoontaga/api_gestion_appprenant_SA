import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class UserService {
  static async update(id: number, data: any) {
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
  }

  static async partialUpdate(id: number, data: any) {
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
  }

  static async getAll() {
    return await prisma.utilisateur.findMany({ include: { profil: true } });
  }

  static async getById(id: number) {
    return await prisma.utilisateur.findUnique({
      where: { id },
      include: { profil: true },
    });
  }

  static async create(
    nom: string,
    prenom: string,
    email: string,
    login: string,
    password: string,
    profilId: number,
    statutUtilisateur: string = "ACTIF"
  ) {
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
  }

  static async delete(id: number) {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
    if (!utilisateur) throw new Error("Utilisateur non trouvé");
    await prisma.utilisateur.delete({ where: { id } });
    return { message: "Utilisateur supprimé" };
  }
}

export default UserService;
