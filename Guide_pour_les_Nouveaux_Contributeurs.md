# Guide de Cohérence des Réponses API

## Structure Standard des Réponses

### Réponses de Succès
```json
{
  "success": true,
  "data": {...}, // ou [...] pour les listes
  "message": "Description de l'action réussie"
}
```

### Réponses d'Erreur
```json
{
  "success": false,
  "error": "Message d'erreur utilisateur",
  "details": "Détails techniques (optionnel)"
}
```

## Codes de Status HTTP

| Code | Usage | Exemple |
|------|-------|---------|
| 200 | Succès (GET, PUT, DELETE) | Données récupérées |
| 201 | Ressource créée (POST) | Niveau créé avec succès |
| 400 | Erreur de validation | Données invalides |
| 404 | Ressource non trouvée | Niveau non trouvé |
| 409 | Conflit | Niveau déjà existant |
| 500 | Erreur serveur | Erreur base de données |

## Messages d'Erreur Standardisés

### Validation (400)
- `"Données invalides"` + détails de validation
- `"Paramètres invalides"` + détails des paramètres

### Ressource non trouvée (404)
- `"Niveau non trouvé"`
- `"La compétence spécifiée n'existe pas"`

### Conflits (409)
- `"Un niveau avec ces informations existe déjà"`

## Règles de Naming

### Endpoints
- Utilisez le pluriel : `/niveaux`, `/competences`
- Utilisez des tirets pour les mots composés : `/niveaux-competences`
- Restez cohérent : toujours en français OU toujours en anglais

### Champs JSON
- Utilisez camelCase : `competenceId`, `dateCreation`
- Soyez descriptifs : `libelle` plutôt que `nom`
- Gardez la cohérence linguistique

### Paramètres de Requête
- Utilisez camelCase : `?competenceId=1`
- Utilisez des noms clairs : `?search=` plutôt que `?q=`

## Validation et Sécurité

### Validation Input
```typescript
// Toujours valider avec Zod
const schema = z.object({
  libelle: z.string().min(1).max(100).trim(),
  competenceId: z.number().positive()
});
```

### Gestion d'Erreur
```typescript
try {
  // Logique métier
} catch (error) {
  if (error instanceof Error && error.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: 'Données invalides',
      details: error.message
    });
  }
  
  return res.status(500).json({
    success: false,
    error: 'Erreur serveur interne',
    details: error instanceof Error ? error.message : 'Erreur inconnue'
  });
}
```

## Checklist de Cohérence

- [ ] Structure de réponse uniforme
- [ ] Codes HTTP appropriés
- [ ] Messages d'erreur clairs
- [ ] Validation des données
- [ ] Documentation Swagger
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Gestion des cas d'erreur

---

# Guide pour les Nouveaux Contributeurs

## Bienvenue dans le projet API Gestion Apprenant !

Ce guide vous aidera à comprendre l'architecture, les conventions et le workflow de développement.

## Architecture du Projet

```
src/
├── config/          # Configuration (Prisma, env)
├── middlewares/     # Middlewares Express
├── modules/         # Modules métier (MVC)
│   └── niveau/
│       ├── index.ts
│       ├── niveau.controller.ts
│       ├── niveau.service.ts
│       ├── niveau.routes.ts
│       ├── niveau.schema.ts
│       └── __tests__/
└── test/           # Utilitaires de test
```

## Stack Technique

- **Runtime** : Node.js + TypeScript
- **Framework** : Express.js
- **Base de données** : PostgreSQL + Prisma ORM
- **Validation** : Zod
- **Tests** : Jest + Supertest
- **Documentation** : Swagger/OpenAPI
- **Linting** : ESLint + Prettier

## Setup Local

### 1. Prérequis
```bash
node >= 16
npm >= 8
postgresql >= 12
```

### 2. Installation
```bash
git clone <repo-url>
cd api-gestion-apprenant
npm install
cp .env.example .env
```

### 3. Base de données
```bash
# Configurer DATABASE_URL dans .env
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

### 4. Lancement
```bash
npm run dev        # Mode développement
npm run build      # Build production
npm run start      # Production
npm run test       # Tests
npm run test:watch # Tests en mode watch
```

## Conventions de Code

### Structure d'un Module

Chaque module suit le pattern MVC + Service :

1. **Schema** (`*.schema.ts`) : Validation Zod + Types
2. **Service** (`*.service.ts`) : Logique métier + DB
3. **Controller** (`*.controller.ts`) : Gestion HTTP
4. **Routes** (`*.routes.ts`) : Définition endpoints
5. **Tests** (`__tests__/*.test.ts`) : Tests unitaires/intégration
6. **Index** (`index.ts`) : Exports du module

### Exemple Complet

```typescript
// user.schema.ts
export const createUserSchema = z.object({
  email: z.string().email(),
  nom: z.string().min(1).max(50)
});

// user.service.ts
export class UserService {
  static async createUser(data: CreateUserDto) {
    return await prisma.user.create({ data });
  }
}

// user.controller.ts
export class UserController {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Créer un utilisateur
   */
  static async createUser(req: Request, res: Response) {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await UserService.createUser(data);
      
      return res.status(201).json({
        success: true,
        data: user,
        message: 'Utilisateur créé avec succès'
      });
    } catch (error) {
      // Gestion d'erreur standard
    }
  }
}
```

## Workflow de Développement

### 1. Nouvelle Fonctionnalité

```bash
git checkout -b feature/nouvelle-fonctionnalite
# Développement
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalité
# Créer Pull Request
```

### 2. Conventions Git

**Format des commits** :
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `test:` ajout/modification de tests
- `refactor:` refactoring
- `style:` formatage, style

**Exemple** :
```bash
git commit -m "feat(niveau): ajouter endpoint de création"
git commit -m "fix(niveau): corriger validation du libellé"
git commit -m "test(niveau): ajouter tests d'intégration"
```

### 3. Pull Request

**Checklist avant PR** :
- [ ] Tests passent (`npm test`)
- [ ] Code formaté (`npm run lint:fix`)
- [ ] Documentation Swagger mise à jour
- [ ] Tests de couverture > 80%
- [ ] README mis à jour si nécessaire

## Tests

### Tests Unitaires (Service)
```typescript
describe('UserService', () => {
  it('devrait créer un utilisateur', async () => {
    const userData = { email: 'test@test.com', nom: 'Test' };
    const result = await UserService.createUser(userData);
    
    expect(result).toHaveProperty('id');
    expect(result.email).toBe('test@test.com');
  });
});
```

### Tests d'Intégration (Controller)
```typescript
describe('POST /users', () => {
  it('devrait créer un utilisateur', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@test.com', nom: 'Test' })
      .expect(201);
    
    expect(response.body.success).toBe(true);
  });
});
```

## Documentation API

### Swagger/OpenAPI

Ajoutez des annotations pour chaque endpoint :

```typescript
/**
 * @swagger
 * /endpoint:
 *   method:
 *     summary: Description courte
 *     description: Description détaillée
 *     tags: [Module]
 *     parameters: [...]
 *     responses:
 *       200:
 *         description: Succès
 */
```

**Accès** : `http://localhost:3002/api-docs`

## Débogage

### Logs
```typescript
import { logger } from '../config/logger';

logger.info('Information');
logger.error('Erreur', error);
logger.debug('Debug', { data });
```

### Prisma Studio
```bash
npx prisma studio
```

### Base de données
```bash
# Voir les logs des requêtes
DATABASE_LOGGING=true npm run dev
```

## Ressources

- [Documentation Prisma](https://prisma.io/docs)
- [Documentation Express](https://expressjs.com)
- [Documentation Zod](https://zod.dev)
- [Documentation Jest](https://jestjs.io)
- [Guide TypeScript](https://www.typescriptlang.org/docs)

## Aide et Support

- **Slack** : #dev-api-gestion-apprenant
- **Issues** : GitHub Issues
- **Code Review** : Obligatoire avant merge
- **Questions** : N'hésitez pas à demander !

## Contribution

1. **Lisez** ce guide entièrement
2. **Configurez** votre environnement local
3. **Choisissez** une issue GitHub
4. **Développez** en suivant les conventions
5. **Testez** votre code
6. **Créez** une Pull Request
7. **Répondez** aux commentaires de review

Merci de contribuer au projet ! 🚀