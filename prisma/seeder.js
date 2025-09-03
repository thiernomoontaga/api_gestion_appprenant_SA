import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const profilAdmin = await prisma.profil.create({
    data: {
      libelle: 'Administrateur'
    }
  })

  const profilFormateur = await prisma.profil.create({
    data: {
      libelle: 'Formateur'
    }
  })

  const profilApprenant = await prisma.profil.create({
    data: {
      libelle: 'Apprenant'
    }
  })

  await prisma.utilisateur.createMany({
    data: [
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'admin@example.com',
        password: '$2b$10$examplehashedpassword',
        login: 'jdupont',
        statutUtilisateur: 'actif',
        profilId: profilAdmin.id
      },
      {
        nom: 'Martin',
        prenom: 'Marie',
        email: 'formateur@example.com',
        password: '$2b$10$examplehashedpassword2',
        login: 'mmartin',
        statutUtilisateur: 'actif',
        profilId: profilFormateur.id
      },
      {
        nom: 'Bernard',
        prenom: 'Pierre',
        email: 'apprenant1@example.com',
        password: '$2b$10$examplehashedpassword3',
        login: 'pbernard',
        statutUtilisateur: 'actif',
        profilId: profilApprenant.id
      },
      {
        nom: 'Dubois',
        prenom: 'Sophie',
        email: 'apprenant2@example.com',
        password: '$2b$10$examplehashedpassword4',
        login: 'sdubois',
        statutUtilisateur: 'suspendu',
        profilId: profilApprenant.id
      }
    ]
  })

  const promotion2024 = await prisma.promotion.create({
    data: {
      date_debut: new Date('2024-01-15'),
      duree: '6 mois'
    }
  })

  const promotion2023 = await prisma.promotion.create({
    data: {
      date_debut: new Date('2023-09-01'),
      duree: '9 mois'
    }
  })

  const referentielDevWeb = await prisma.referentiel.create({
    data: {
      libelle: 'Développement Web Fullstack',
      description: 'Formation complète en développement web frontend et backend',
      promotionId: promotion2024.id
    }
  })

  const referentielDataScience = await prisma.referentiel.create({
    data: {
      libelle: 'Data Science',
      description: 'Formation en analyse de données et machine learning',
      promotionId: promotion2023.id
    }
  })

  await prisma.profilSortie.createMany({
    data: [
      {
        libelle: 'Développeur Frontend',
        description: 'Spécialiste en développement d\'interfaces utilisateur',
        referentielId: referentielDevWeb.id
      },
      {
        libelle: 'Développeur Backend',
        description: 'Spécialiste en développement serveur et bases de données',
        referentielId: referentielDevWeb.id
      },
      {
        libelle: 'Data Analyst',
        description: 'Spécialiste en analyse et visualisation de données',
        referentielId: referentielDataScience.id
      },
      {
        libelle: 'Machine Learning Engineer',
        description: 'Spécialiste en modèles prédictifs et IA',
        referentielId: referentielDataScience.id
      }
    ]
  })

  const competenceFrontend = await prisma.competence.create({
    data: {
      libelle: 'Développement Frontend',
      description: 'Compétences en développement d\'interfaces utilisateur'
    }
  })

  const competenceBackend = await prisma.competence.create({
    data: {
      libelle: 'Développement Backend',
      description: 'Compétences en développement serveur'
    }
  })

  const competenceData = await prisma.competence.create({
    data: {
      libelle: 'Analyse de données',
      description: 'Compétences en traitement et analyse de données'
    }
  })

  await prisma.niveau.createMany({
    data: [
      {
        libelle: 'Débutant',
        competenceId: competenceFrontend.id
      },
      {
        libelle: 'Intermédiaire',
        competenceId: competenceFrontend.id
      },
      {
        libelle: 'Avancé',
        competenceId: competenceFrontend.id
      },
      
      {
        libelle: 'Débutant',
        competenceId: competenceBackend.id
      },
      {
        libelle: 'Intermédiaire',
        competenceId: competenceBackend.id
      },
      {
        libelle: 'Avancé',
        competenceId: competenceBackend.id
      },
      
      {
        libelle: 'Débutant',
        competenceId: competenceData.id
      },
      {
        libelle: 'Intermédiaire',
        competenceId: competenceData.id
      },
      {
        libelle: 'Avancé',
        competenceId: competenceData.id
      }
    ]
  })

  await prisma.tag.createMany({
    data: [
      {
        libelle: 'React',
        description: 'Bibliothèque JavaScript pour interfaces utilisateur',
        competenceId: competenceFrontend.id
      },
      {
        libelle: 'Vue.js',
        description: 'Framework JavaScript progressif',
        competenceId: competenceFrontend.id
      },
      {
        libelle: 'Node.js',
        description: 'Environnement d\'exécution JavaScript côté serveur',
        competenceId: competenceBackend.id
      },
      {
        libelle: 'Python',
        description: 'Langage de programmation pour le backend et la data science',
        competenceId: competenceBackend.id
      },
      {
        libelle: 'SQL',
        description: 'Langage de requête pour bases de données relationnelles',
        competenceId: competenceData.id
      },
      {
        libelle: 'Pandas',
        description: 'Bibliothèque Python pour l\'analyse de données',
        competenceId: competenceData.id
      }
    ]
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })