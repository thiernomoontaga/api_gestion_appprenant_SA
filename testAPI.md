GET http://localhost:3002/api/profiles

GET http://localhost:3002/api/profiles/1

POST http://localhost:3002/api/profiles
Content-Type: application/json

{
  "libelle": "Nouveau Profil"
}

PUT http://localhost:3002/api/profiles/1
Content-Type: application/json

{
  "libelle": "Profil Modifié"
}

DELETE http://localhost:3002/api/profiles/1

// avec filtre

GET http://localhost:3002/api/users?profile=1&statut=actif


GET http://localhost:3002/api/users/1


POST http://localhost:3002/api/users
Content-Type: application/json

{
  "nom": "Seck",
  "prenom": "Moustapha",
  "email": "test@example.com",
  "password": "password123",
  "login": "mseck",
  "statut": "actif",
  "profileId": 1
}