import { StatutUtilisateur } from '@prisma/client';
import { CreateUtilisateurDto, UpdateUtilisateurDto } from './user.schema';
export declare class UtilisateurService {
    static getAllUtilisateurs(profile?: string, statut?: string): Promise<any>;
    static getUtilisateurById(id: number): Promise<any>;
    static createUtilisateur(data: CreateUtilisateurDto): Promise<any>;
    static updateUtilisateur(id: number, data: UpdateUtilisateurDto): Promise<any>;
    static deleteUtilisateur(id: number): Promise<boolean>;
    static updateStatutUtilisateur(id: number, statut: StatutUtilisateur): Promise<any>;
    static checkUtilisateurExists(id: number): Promise<boolean>;
}
//# sourceMappingURL=user.service.d.ts.map