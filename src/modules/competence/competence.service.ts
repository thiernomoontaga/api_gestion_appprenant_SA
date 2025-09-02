import { PrismaClient } from "@prisma/client";
import { CreateCompetenceInput, UpdateCompetenceInput } from "./competence.schema.js";

const prisma = new PrismaClient();

export const CompetenceService = {
  async create(data: CreateCompetenceInput) {
    return prisma.competence.create({ data });
  },

  async findAll() {
    return prisma.competence.findMany({
      include: {
        niveaux: true,
        tags: true,
      },
    });
  },

  async findById(id: number) {
    return prisma.competence.findUnique({
      where: { id },
      include: {
        niveaux: true,
        tags: true,
      },
    });
  },

  async update(id: number, data: UpdateCompetenceInput) {
    return prisma.competence.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.competence.delete({
      where: { id },
    });
  },
};
