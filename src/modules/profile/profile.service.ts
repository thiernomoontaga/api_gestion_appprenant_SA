import { PrismaClient } from "@prisma/client";
import { CreateProfileInput, UpdateProfileInput } from "./profile.schema.js";

const prisma = new PrismaClient();

export const ProfileService = {
  async create(data: CreateProfileInput) {
    return prisma.profil.create({
      data,
    });
  },

  async findAll() {
    return prisma.profil.findMany();
  },

  async findById(id: number) {
    return prisma.profil.findUnique({
      where: { id },
    });
  },

  async update(id: number, data: UpdateProfileInput) {
    return prisma.profil.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.profil.delete({
      where: { id },
    });
  },
};
