import prisma from '../../config/prisma';
import type { CreateNiveauDto, UpdateNiveauDto, NiveauQueryDto } from './niveau.schema';
import { NIVEAU_SORTABLE_FIELDS } from './niveau.schema';
import { calculatePaginationOffsets, createPaginationResult, type PaginationResult } from '../../utils/pagination';
import { createOrderBy, validateSortField } from '../../utils/sorting';

export class NiveauService {
  static async getAllNiveaux(
    options: Partial<NiveauQueryDto> = {}
  ): Promise<PaginationResult<any>> {
    const { page = 1, pageSize = 10, q, competenceId, sortBy, sortOrder = 'asc' } = options;
    
    // Validation du champ de tri
    if (sortBy && !validateSortField(sortBy, [...NIVEAU_SORTABLE_FIELDS])) {
      throw new Error(`Le champ de tri '${sortBy}' n'est pas autorisé. Champs autorisés: ${NIVEAU_SORTABLE_FIELDS.join(', ')}`);
    }

    // Construction des conditions WHERE
    const where: any = {};
    
    if (competenceId) {
      where.competenceId = competenceId;
    }
    
    if (q) {
      where.OR = [
        { libelle: { contains: q, mode: 'insensitive' } },
        { competence: { libelle: { contains: q, mode: 'insensitive' } } }
      ];
    }

    // Pagination
    const { skip, take } = calculatePaginationOffsets(page, pageSize);

    // Exécution des requêtes en parallèle
    const [niveaux, total] = await Promise.all([
      prisma.niveau.findMany({
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
        orderBy: createOrderBy(sortBy, sortOrder),
        skip,
        take
      }),
      prisma.niveau.count({ where })
    ]);

    return createPaginationResult(niveaux, total, { page, pageSize });
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
