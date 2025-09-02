import { PrismaClient, ProfilSortie } from "@prisma/client";

export interface IProfilSortieService {
  getAll(): Promise<ProfilSortie[]>;
  getById(id: number): Promise<ProfilSortie | null>;
  create(data: any): Promise<ProfilSortie>;
  update(id: number, data: any): Promise<ProfilSortie>;
  delete(id: number): Promise<{ message: string }>;
}

class ProfilSortieService implements IProfilSortieService {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async getAll() {
    return this.prisma.profilSortie.findMany({
      include: { referentiel: true },
    });
  }

  async getById(id: number) {
    return this.prisma.profilSortie.findUnique({
      where: { id },
      include: { referentiel: true },
    });
  }

  async create(data: any) {
    return this.prisma.profilSortie.create({
      data,
      include: { referentiel: true },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.profilSortie.update({
      where: { id },
      data,
      include: { referentiel: true },
    });
  }

  async delete(id: number) {
    await this.prisma.profilSortie.delete({ where: { id } });
    return { message: "ProfilSortie supprimé" };
  }
}

const profilSortieService = new ProfilSortieService();
export default profilSortieService;
