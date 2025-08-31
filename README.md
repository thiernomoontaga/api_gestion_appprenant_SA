#  Projet API – Gestion des Apprenants

##  Description

Cette API a été développée en **TypeScript** avec **Express**, **Prisma**, **Zod** et **MySQL**.  
Elle permet de gérer les **apprenants, promotions, profils, compétences, référentiels, tags et niveaux** dans le cadre d’un projet de gestion de formation.  

L’objectif est de proposer une **API RESTful maintenable et modulaire**, avec une architecture claire et extensible.

---

## Technologies utilisées

- **[TypeScript](https://www.typescriptlang.org/)** – Typage fort et structuration du code  
- **[Express.js](https://expressjs.com/)** – Framework minimaliste pour Node.js  
- **[Prisma](https://www.prisma.io/)** – ORM moderne pour MySQL  
- **[Zod](https://zod.dev/)** – Validation des données côté serveur  
- **[MySQL](https://www.mysql.com/)** – Base de données relationnelle  
- **[Swagger-UI](https://swagger.io/tools/swagger-ui/)** – Documentation API interactive  
- **[Dotenv](https://www.npmjs.com/package/dotenv)** – Gestion des variables d’environnement  

---

##  Structure du projet

```bash
my-app/
├── prisma/
│   └── schema.prisma        # Schéma de la base (Prisma)
│
├── src/
│   ├── config/              # Config (DB, variables env)
│   ├── middlewares/         # Middlewares globaux (erreurs, validation)
│   ├── modules/             # Modules (users, promos, profils, etc.)
│   │   ├── users/
│   │   │   ├── user.model.ts
│   │   │   ├── user.schema.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.routes.ts
│   │   └── ...
│   ├── utils/               # Helpers (logger, etc.)
│   ├── app.ts               # Initialisation d’Express
│   └── server.ts            # Point d’entrée (listen)
│
├── .env                     # Variables d’environnement
├── package.json
├── tsconfig.json
└── README.md
```

---

##  Installation et configuration

### 1. Cloner le projet
```bash
git clone https://github.com/ton-compte/my-app.git
cd my-app
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d’environnement
Créer un fichier `.env` à la racine :
```env
DATABASE_URL="mysql://root:password@localhost:3306/mydb"
PORT=4000
```

### 4. Générer Prisma Client & Migrer la base
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Lancer le serveur
```bash
npm run dev
```

---

##  Endpoints disponibles (Sprint 01)

### 🔹 Users
- `GET /users` – Récupérer tous les utilisateurs
- `POST /users` – Créer un utilisateur
- `GET /users/:id` – Récupérer un utilisateur par ID
- `PUT /users/:id` – Mettre à jour un utilisateur
- `DELETE /users/:id` – Supprimer un utilisateur

### 🔹 Profiles
- `GET /profiles`
- `POST /profiles`
- ...

### 🔹 Promos
- `GET /promos`
- `POST /promos`
- `GET /promos/:id/formateurs`

### 🔹 Niveaux
- `GET /niveaux`
- `POST /niveaux`

### 🔹 Compétences
- `GET /competences`
- `POST /competences`
- `GET /competences/:id/niveaux`

### 🔹 Référentiels
- `GET /referentiels`
- `POST /referentiels`
- `GET /referentiels/:id/competences`

### 🔹 Tags
- `GET /tags`
- `POST /tags`

### 🔹 Profils de sortie
- `GET /profils-sortie`
- `POST /profils-sortie`

---

## Documentation API (Swagger)

L’API est documentée avec **Swagger-UI**.  
Une fois le projet lancé, tu peux accéder à la documentation interactive ici :

👉 [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

### Installation Swagger
```bash
npm install swagger-ui-express swagger-jsdoc
```

### Exemple de config Swagger (`src/config/swagger.ts`)
```ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gestion Apprenants",
      version: "1.0.0",
      description: "Documentation de l'API Gestion Apprenants avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
```

### Intégration dans `src/app.ts`
```ts
import express from "express";
import userRoutes from "./modules/users/user.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from "./config/swagger";

const app = express();
app.use(express.json());

// routes
app.use("/users", userRoutes);

// swagger
setupSwagger(app);

// gestion erreurs
app.use(errorHandler);

export default app;
```

---

## 🧪 Scripts NPM

- `npm run dev` – Lancer le serveur en mode développement  
- `npm run build` – Compiler TypeScript en JavaScript  
- `npm start` – Lancer le serveur en mode production  

---

##  Bonnes pratiques adoptées

- **Architecture feature-based** (chaque ressource = module indépendant)  
- **Validation avec Zod** pour sécuriser les entrées utilisateurs  
- **ORM Prisma** pour la gestion des données  
- **Gestion centralisée des erreurs** via un middleware global  
- **Documentation API interactive avec Swagger**  
- **Respect des standards RESTful**  

---

## 🚧 Roadmap

- [x] Sprint 01 : Endpoints CRUD basiques (sans authentification)  
- [x] Swagger : Documentation API interactive  
- [ ] Sprint 02 : Authentification & rôles (JWT, formateurs/apprenants/admin)  
- [ ] Sprint 03 : Tests unitaires & CI/CD  
- [ ] Sprint 04 : Déploiement (Docker + hébergeur cloud)  

---

## 👨‍💻 Auteur

Projet réalisé par **Thierno Segnane,Gorgui Marena , Maman Die,Abdourahmane Diallo,Amy colle,Moustapha seck (aka zaf)**  
📧 Contact : [ton.email@example.com]  
🌐 GitHub : [github.com/ton-compte](https://github.com/ton-compte)# api_gestion_appprenant_SA
