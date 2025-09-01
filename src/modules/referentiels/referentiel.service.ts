import prisma from "../../config/db";
import { CreateReferentielDto, UpdateReferentielDto } from "./referentiel.schema";

export class ReferentielService {
  static async getAllReferentiels() {
    return await prisma.referentiel.findMany({
      include: {
        promotion: true,
        profilsSortie: true
      }
    });
  }

  static async getReferentielById(id: number) {
    return await prisma.referentiel.findUnique({
      where: { id },
      include: {
        promotion: true,
        profilsSortie: true
      }
    });
  }

  static async createReferentiel(data: CreateReferentielDto) {
    return await prisma.referentiel.create({
      data,
      include: {
        promotion: true,
        profilsSortie: true
      }
    });
  }

  static async updateReferentiel(id: number, data: UpdateReferentielDto) {
    return await prisma.referentiel.update({
      where: { id },
      data,
      include: {
        promotion: true,
        profilsSortie: true
      }
    });
  }

  static async deleteReferentiel(id: number) {
    return await prisma.referentiel.delete({
      where: { id }
    });
  }

  static async getCompetencesByReferentielId(id: number) {
    const referentiel = await prisma.referentiel.findUnique({
      where: { id },
      include: {
        profilsSortie: {
          include: {
            // Note: Based on schema, there's no direct relation between ProfilSortie and Competence
            // This might need to be adjusted based on business logic
          }
        }
      }
    });
    
    // For now, returning all competences as the schema doesn't show direct relation
    // This should be adjusted based on actual business requirements
    return await prisma.competence.findMany({
      include: {
        niveaux: true,
        tags: true
      }
    });
  }
}
