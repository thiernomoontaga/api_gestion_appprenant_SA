import prisma from '../../config/prisma';
import type { CreateNiveauDto, UpdateNiveauDto } from './niveau.schema';

export class NiveauService {
  static async getAllNiveaux(competenceId?: number) {
    const where = competenceId ? { competenceId } : {};
    
    return await prisma.niveau.findMany({
      where,
      select: {
        id: true,
        libelle: true,
        competence: {
          select: {
            id: true,
            libelle: true
          }
        }
      },
      orderBy: {
        libelle: 'asc'
      }
    });
  }

  static async getNiveauById(id: number) {
    return await prisma.niveau.findUnique({
      where: { id },
      select: {
        id: true,
        libelle: true,
        competence: {
          select: {
            id: true,
            libelle: true,
            description: true
          }
        }
      }
    });
  }

  static async createNiveau(data: CreateNiveauDto) {
    const competence = await prisma.competence.findUnique({
      where: { id: data.competenceId }
    });
    
    if (!competence) {
      throw new Error('La compétence spécifiée n\'existe pas');
    }

    return await prisma.niveau.create({
      data,
      select: {
        id: true,
        libelle: true,
        competence: {
          select: {
            id: true,
            libelle: true
          }
        }
      }
    });
  }

  static async updateNiveau(id: number, data: UpdateNiveauDto) {
    const existingNiveau = await prisma.niveau.findUnique({
      where: { id }
    });
    
    if (!existingNiveau) {
      throw new Error('Niveau non trouvé');
    }

    if (data.competenceId) {
      const competence = await prisma.competence.findUnique({
        where: { id: data.competenceId }
      });
      
      if (!competence) {
        throw new Error('La compétence spécifiée n\'existe pas');
      }
    }

    return await prisma.niveau.update({
      where: { id },
      data,
      select: {
        id: true,
        libelle: true,
        competence: {
          select: {
            id: true,
            libelle: true
          }
        }
      }
    });
  }

  static async deleteNiveau(id: number) {
    const existingNiveau = await prisma.niveau.findUnique({
      where: { id }
    });
    
    if (!existingNiveau) {
      throw new Error('Niveau non trouvé');
    }

    await prisma.niveau.delete({
      where: { id }
    });
    
    return true;
  }

  static async checkNiveauExists(id: number): Promise<boolean> {
    const niveau = await prisma.niveau.findUnique({
      where: { id }
    });
    
    return niveau !== null;
  }

  static async getNiveauxByCompetence(competenceId: number) {
    const competence = await prisma.competence.findUnique({
      where: { id: competenceId }
    });
    
    if (!competence) {
      throw new Error('La compétence spécifiée n\'existe pas');
    }

    return await prisma.niveau.findMany({
      where: { competenceId },
      select: {
        id: true,
        libelle: true
      },
      orderBy: {
        libelle: 'asc'
      }
    });
  }
}
