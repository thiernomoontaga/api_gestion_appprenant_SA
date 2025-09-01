import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  getAll: async () => {
    return await prisma.profilSortie.findMany({
      include: { referentiel: true },
    });
  },
  getById: async (id: number) => {
    return await prisma.profilSortie.findUnique({
      where: { id },
      include: { referentiel: true },
    });
  },
  create: async (data: any) => {
    return await prisma.profilSortie.create({
      data,
      include: { referentiel: true },
    });
  },
  update: async (id: number, data: any) => {
    return await prisma.profilSortie.update({
      where: { id },
      data,
      include: { referentiel: true },
    });
  },
  delete: async (id: number) => {
    await prisma.profilSortie.delete({ where: { id } });
    return { message: "ProfilSortie supprimé" };
  },
};

