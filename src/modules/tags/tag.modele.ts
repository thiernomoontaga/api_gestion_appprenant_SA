export interface Tag {
  id: number;
  libelle: string;
  description?: string;
  competenceId: number;
  competence?: {
    id: number;
    libelle: string;
    description?: string;
  };
}
