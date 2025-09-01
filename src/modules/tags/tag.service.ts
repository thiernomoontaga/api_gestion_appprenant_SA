import prisma from "../../config/db";
import { CreateTagDto, UpdateTagDto } from "./tag.schema";

export class TagService {
  static async getAllTags() {
    return await prisma.tag.findMany({
      include: {
        competence: true
      }
    });
  }

  static async getTagById(id: number) {
    return await prisma.tag.findUnique({
      where: { id },
      include: {
        competence: true
      }
    });
  }

  static async createTag(data: CreateTagDto) {
    return await prisma.tag.create({
      data,
      include: {
        competence: true
      }
    });
  }

  static async updateTag(id: number, data: UpdateTagDto) {
    return await prisma.tag.update({
      where: { id },
      data,
      include: {
        competence: true
      }
    });
  }

  static async deleteTag(id: number) {
    return await prisma.tag.delete({
      where: { id }
    });
  }

  static async getTagsByCompetenceId(competenceId: number) {
    return await prisma.tag.findMany({
      where: { competenceId },
      include: {
        competence: true
      }
    });
  }
}
