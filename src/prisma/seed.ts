import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du seeding...');

  // Nettoyage des données existantes
  await prisma.utilisateur.deleteMany();
  await prisma.profiles.deleteMany();

  // Création des profils
  console.log('Création des profils...');
  const adminProfile = await prisma.profiles.create({
    data: {
      libelle: 'Administrateur'
    }
  });

  const formateurProfile = await prisma.profiles.create({
    data: {
      libelle: 'Formateur'
    }
  });

  const apprenantProfile = await prisma.profiles.create({
    data: {
      libelle: 'Apprenant'
    }
  });

  const cmProfile = await prisma.profiles.create({
    data: {
      libelle: 'Community Manager'
    }
  });

  console.log('Profils créés:', {
    admin: adminProfile.id,
    formateur: formateurProfile.id,
    apprenant: apprenantProfile.id,
    cm: cmProfile.id
  });

  // Création des utilisateurs
  console.log('Création des utilisateurs...');
  
  // Administrateur
  const adminUser = await prisma.utilisateur.create({
    data: {
      nom: 'Seck',
      prenom: 'Moustapha',
      email: 'moustapha@sonatel.sn',
      login: 'admin',
      password: await bcrypt.hash('Admin2024!', 10),
      statut: 'actif',
      profileId: adminProfile.id
    }
  });

  // Formateurs
  const formateur1 = await prisma.utilisateur.create({
    data: {
      nom: 'Marra',
      prenom: 'Ousmane',
      email: 'marra@sonatel.sn',
      login: 'marra',
      password: await bcrypt.hash('Formateur2024!', 10),
      statut: 'actif',
      profileId: formateurProfile.id
    }
  });

  const formateur2 = await prisma.utilisateur.create({
    data: {
      nom: 'Niang',
      prenom: 'Dié',
      email: 'die@sonatel.sn',
      login: 'die',
      password: await bcrypt.hash('Formateur2024!', 10),
      statut: 'actif',
      profileId: formateurProfile.id
    }
  });

  // Apprenants
  const apprenants = await Promise.all([
    prisma.utilisateur.create({
      data: {
        nom: 'Fall',
        prenom: 'Modou',
        email: 'modou@student.sonatel.sn',
        login: 'modou',
        password: await bcrypt.hash('Apprenant2024!', 10),
        statut: 'actif',
        profileId: apprenantProfile.id
      }
    }),
    prisma.utilisateur.create({
      data: {
        nom: 'Ba',
        prenom: 'Aïssatou',
        email: 'aissatou.ba@student.sonatel.sn',
        login: 'aba',
        password: await bcrypt.hash('Apprenant2024!', 10),
        statut: 'actif',
        profileId: apprenantProfile.id
      }
    }),
    prisma.utilisateur.create({
      data: {
        nom: 'Sy',
        prenom: 'Mamadou',
        email: 'mamadou.sy@student.sonatel.sn',
        login: 'msy',
        password: await bcrypt.hash('Apprenant2024!', 10),
        statut: 'actif',
        profileId: apprenantProfile.id
      }
    }),
    prisma.utilisateur.create({
      data: {
        nom: 'Cissé',
        prenom: 'Mariama',
        email: 'cisse@student.sonatel.sn',
        login: 'mcisse',
        password: await bcrypt.hash('Apprenant2024!', 10),
        statut: 'suspendu',
        profileId: apprenantProfile.id
      }
    }),
    prisma.utilisateur.create({
      data: {
        nom: 'Diouf',
        prenom: 'Ibrahima',
        email: 'diouf@student.sonatel.sn',
        login: 'idiouf',
        password: await bcrypt.hash('Apprenant2024!', 10),
        statut: 'abandon',
        profileId: apprenantProfile.id
      }
    })
  ]);

  // Community Manager
  const cmUser = await prisma.utilisateur.create({
    data: {
      nom: 'Thiam',
      prenom: 'Khadija',
      email: 'thiam@sonatel.sn',
      login: 'kthiam',
      password: await bcrypt.hash('CM2024!', 10),
      statut: 'actif',
      profileId: cmProfile.id
    }
  });

  console.log('Utilisateurs créés:');
  console.log(`  - Admin: ${adminUser.email} (login: ${adminUser.login})`);
  console.log(`  - Formateurs: ${formateur1.email}, ${formateur2.email}`);
  console.log(`  - Apprenants: ${apprenants.length} créés`);
  console.log(`  - CM: ${cmUser.email} (login: ${cmUser.login})`);

  // Statistiques finales
  const stats = await prisma.profiles.findMany({
    include: {
      _count: {
        select: { utilisateurs: true }
      }
    }
  });

  console.log('\n Statistiques finales:');
  stats.forEach(profile => {
    console.log(`  ${profile.libelle}: ${profile._count.utilisateurs} utilisateur(s)`);
  });

  // Statistiques par statut
  const statutStats = await prisma.utilisateur.groupBy({
    by: ['statut'],
    _count: {
      statut: true
    }
  });

  console.log('\n Répartition par statut:');
  statutStats.forEach(stat => {
    console.log(`  ${stat.statut}: ${stat._count.statut} utilisateur(s)`);
  });

  console.log('\n Seeding terminé avec succès!');
  console.log('\n Comptes de test:');
  console.log('  Admin: amadou.diallo@sonatel.sn / admin / Admin2024!');
  console.log('  Formateur: fatou.ndiaye@sonatel.sn / fndiaye / Formateur2024!');
  console.log('  Apprenant: ousmane.fall@student.sonatel.sn / ofall / Apprenant2024!');
  console.log('  CM: khadija.thiam@sonatel.sn / kthiam / CM2024!');
}

main()
  .catch((e) => {
    console.error(' Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });