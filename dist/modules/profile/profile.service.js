import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class ProfileService {
    async create(data) {
        return prisma.profil.create({
            data,
        });
    }
    async findAll() {
        return prisma.profil.findMany();
    }
    async findById(id) {
        return prisma.profil.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return prisma.profil.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        await prisma.profil.delete({
            where: { id },
        });
    }
}
