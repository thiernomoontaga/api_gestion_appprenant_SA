import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Suppression dans l'ordre des dépendances pour éviter les erreurs de contraintes
  await prisma.niveau.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.competence.deleteMany();
  await prisma.profilSortie.deleteMany();
  await prisma.utilisateur.deleteMany();
  await prisma.referentiel.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.profil.deleteMany();
  // Création de profils (5)
  const profils = await prisma.profil.createMany({
    data: [
      { libelle: "Administrateur" },
      { libelle: "Apprenant" },
      { libelle: "Formateur" },
    ],
  });
  const allProfils = await prisma.profil.findMany();

  // Création d'utilisateurs (5) avec mot de passe hashé
  const utilisateursSeed = [
    {
      nom: "Doe",
      prenom: "John",
      email: "john.doe@example.com",
      password: "password123",
      login: "johndoe",
      statutUtilisateur: "actif",
      profilId: allProfils[0].id,
    },
    {
      nom: "Smith",
      prenom: "Anna",
      email: "anna.smith@example.com",
      password: "password123",
      login: "annasmith",
      statutUtilisateur: "actif",
      profilId: allProfils[1].id,
    },
    {
      nom: "Martin",
      prenom: "Paul",
      email: "paul.martin@example.com",
      password: "password123",
      login: "paulmartin",
      statutUtilisateur: "abandon",
      profilId: allProfils[2].id,
    },
    {
      nom: "Dupont",
      prenom: "Julie",
      email: "julie.dupont@example.com",
      password: "password123",
      login: "juliedupont",
      statutUtilisateur: "suspendu",
      profilId: allProfils[3].id,
    },
    {
      nom: "Nguyen",
      prenom: "Linh",
      email: "linh.nguyen@example.com",
      password: "password123",
      login: "linhnguyen",
      statutUtilisateur: "actif",
      profilId: allProfils[4].id,
    },
  ];

  for (const utilisateur of utilisateursSeed) {
    const hashedPassword = await bcrypt.hash(utilisateur.password, 10);
    await prisma.utilisateur.create({
      data: {
        ...utilisateur,
        password: hashedPassword,
      },
    });
  }

  // Création de promotions (5)
  const promotions: Awaited<ReturnType<typeof prisma.promotion.create>>[] = [];
  for (let i = 0; i < 5; i++) {
    const promo = await prisma.promotion.create({
      data: {
        date_debut: new Date(`2025-09-0${i + 1}`),
        duree: `${6 + i} mois`,
      },
    });
    promotions.push(promo);
  }

  // Création de référentiels (5)
  const referentiels: Awaited<ReturnType<typeof prisma.referentiel.create>>[] =
    [];
  const refLabels = [
    "Développement Web",
    "Data Science",
    "DevOps",
    "Cybersécurité",
    "Mobile",
  ];
  for (let i = 0; i < 5; i++) {
    const ref = await prisma.referentiel.create({
      data: {
        libelle: refLabels[i],
        description: `Formation en ${refLabels[i]}`,
        promotionId: promotions[i].id,
      },
    });
    referentiels.push(ref);
  }

  // Création de profils de sortie (5)
  await prisma.profilSortie.createMany({
    data: [
      {
        libelle: "Développeur Web",
        description: "Peut travailler comme développeur web",
        referentielId: referentiels[0].id,
      },
      {
        libelle: "Data Analyst",
        description: "Peut travailler comme analyste de données",
        referentielId: referentiels[1].id,
      },
      {
        libelle: "Ingénieur DevOps",
        description: "Peut travailler comme ingénieur DevOps",
        referentielId: referentiels[2].id,
      },
      {
        libelle: "Expert Cybersécurité",
        description: "Peut travailler comme expert cybersécurité",
        referentielId: referentiels[3].id,
      },
      {
        libelle: "Développeur Mobile",
        description: "Peut travailler comme développeur mobile",
        referentielId: referentiels[4].id,
      },
    ],
  });

  // Création de compétences (5) avec niveaux et tags
  const competencesData = [
    {
      libelle: "JavaScript",
      description: "Maîtrise du langage JavaScript",
      niveaux: ["Débutant", "Intermédiaire", "Avancé"],
      tags: [
        { libelle: "Frontend", description: "Développement côté client" },
        { libelle: "Backend", description: "Développement côté serveur" },
      ],
    },
    {
      libelle: "Python",
      description: "Maîtrise du langage Python",
      niveaux: ["Débutant", "Intermédiaire", "Avancé"],
      tags: [
        { libelle: "Data Science", description: "Analyse de données" },
        { libelle: "Automatisation", description: "Scripts et automatisation" },
      ],
    },
    {
      libelle: "SQL",
      description: "Langage de requête pour bases de données",
      niveaux: ["Débutant", "Intermédiaire"],
      tags: [
        { libelle: "Base de données", description: "Gestion des données" },
      ],
    },
    {
      libelle: "Docker",
      description: "Conteneurisation d'applications",
      niveaux: ["Débutant", "Intermédiaire", "Avancé"],
      tags: [{ libelle: "DevOps", description: "Outils DevOps" }],
    },
    {
      libelle: "Android",
      description: "Développement mobile Android",
      niveaux: ["Débutant", "Intermédiaire", "Avancé"],
      tags: [{ libelle: "Mobile", description: "Développement mobile" }],
    },
  ];
  for (const comp of competencesData) {
    await prisma.competence.create({
      data: {
        libelle: comp.libelle,
        description: comp.description,
        niveaux: {
          create: comp.niveaux.map((n) => ({ libelle: n })),
        },
        tags: {
          create: comp.tags,
        },
      },
    });
  }

  console.log("Seed terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
