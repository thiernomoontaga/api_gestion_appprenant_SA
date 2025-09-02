import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  static async getProfilLibelle(user: any): Promise<string | undefined> {
    if (user.profil?.libelle) return user.profil.libelle;

    const profil = await prisma.profil.findUnique({
      where: { id: user.profilId },
    });
    return profil?.libelle;
  }

  static async getUserByEmail(email: string) {
    if (!email) return null;
    return await prisma.utilisateur.findFirst({
      where: { email },
    });
  }

  async authenticateUser(email: string, password: string) {
    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
