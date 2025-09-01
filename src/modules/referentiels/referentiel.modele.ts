export interface Referentiel {
  id: number;
  libelle: string;
  description?: string;
  promotionId: number;
  promotion?: {
    id: number;
    date_debut: Date;
    duree: string;
  };
  profilsSortie?: ProfilSortie[];
}

export interface ProfilSortie {
  id: number;
  libelle: string;
  description?: string;
  referentielId: number;
}
