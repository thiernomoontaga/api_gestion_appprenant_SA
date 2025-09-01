import { CreateProfilDto, UpdateProfilDto } from './profil.schema';
export declare class ProfilService {
    static getAllProfils(): Promise<any>;
    static getProfilById(id: number): Promise<any>;
    static createProfil(data: CreateProfilDto): Promise<any>;
    static updateProfil(id: number, data: UpdateProfilDto): Promise<any>;
    static deleteProfil(id: number): Promise<any>;
    static checkProfilExists(id: number): Promise<boolean>;
    static checkProfilUsage(id: number): Promise<boolean>;
}
//# sourceMappingURL=profil.service.d.ts.map