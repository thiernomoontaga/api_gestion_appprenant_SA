// swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestion Apprenant',
      version: '1.0.0',
      description: 'API pour la gestion des niveaux et compétences des apprenants',
      contact: {
        name: 'Équipe de développement',
        email: 'dev@gestion-apprenant.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Serveur de développement',
      },
      {
        url: 'https://api.gestion-apprenant.com',
        description: 'Serveur de production',
      },
    ],
    components: {
      schemas: {
        Niveau: {
          type: 'object',
          required: ['id', 'libelle', 'competence'],
          properties: {
            id: {
              type: 'integer',
              description: 'Identifiant unique du niveau'
            },
            libelle: {
              type: 'string',
              description: 'Libellé du niveau',
              example: 'N1 - Débutant'
            },
            competence: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  description: 'ID de la compétence'
                },
                libelle: {
                  type: 'string',
                  description: 'Nom de la compétence'
                },
                description: {
                  type: 'string',
                  description: 'Description de la compétence'
                }
              }
            }
          }
        },
        CreateNiveau: {
          type: 'object',
          required: ['libelle', 'competenceId'],
          properties: {
            libelle: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              description: 'Libellé du niveau',
              example: 'N2 - Intermédiaire'
            },
            competenceId: {
              type: 'integer',
              minimum: 1,
              description: 'ID de la compétence associée',
              example: 1
            }
          }
        },
        UpdateNiveau: {
          type: 'object',
          properties: {
            libelle: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              description: 'Nouveau libellé du niveau',
              example: 'N1 - Débutant Modifié'
            },
            competenceId: {
              type: 'integer',
              minimum: 1,
              description: 'Nouvel ID de la compétence associée',
              example: 2
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indique si la requête a réussi'
            },
            data: {
              description: 'Données de la réponse'
            },
            message: {
              type: 'string',
              description: 'Message descriptif de la réponse'
            }
          }
        },
        ApiError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Message d\'erreur'
            },
            details: {
              type: 'string',
              description: 'Détails techniques de l\'erreur'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Ressource non trouvée',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiError'
              },
              example: {
                success: false,
                error: 'Niveau non trouvé'
              }
            }
          }
        },
        ValidationError: {
          description: 'Erreur de validation des données',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiError'
              },
              example: {
                success: false,
                error: 'Données invalides',
                details: 'Le libellé est requis'
              }
            }
          }
        },
        ServerError: {
          description: 'Erreur serveur interne',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiError'
              },
              example: {
                success: false,
                error: 'Erreur serveur interne',
                details: 'Une erreur inattendue s\'est produite'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/modules/*/**.ts', './src/routes/**.ts'], // Chemins vers vos fichiers avec annotations
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Gestion Apprenant - Documentation'
  }));
  
  // Endpoint pour récupérer la spec JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  
  console.log(' Documentation Swagger disponible sur : http://localhost:3002/api-docs');
};