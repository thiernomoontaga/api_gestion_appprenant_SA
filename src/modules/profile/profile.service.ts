import { PrismaClient } from "@prisma/client";
import { CreateProfileInput, UpdateProfileInput } from "./profile.schema.js";
import IModuleService from "../module/IModule.service.js";

const prisma = new PrismaClient();

export class ProfileService implements IModuleService<UpdateProfileInput, CreateProfileInput, UpdateProfileInput>
{
  async create(data: CreateProfileInput): Promise<UpdateProfileInput> {
    return prisma.profil.create({
      data,
    });
  }

  async findAll(): Promise<UpdateProfileInput[]> {
    return prisma.profil.findMany();
  }

  async findById(id: number): Promise<UpdateProfileInput | null> {
    return prisma.profil.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateProfileInput): Promise<UpdateProfileInput> {
    return prisma.profil.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.profil.delete({
      where: { id },
    });
  }
}
