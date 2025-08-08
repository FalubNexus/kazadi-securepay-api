# Kazadi SecurePay API (version sans paiement)

## Installation
1. `git clone <url>`
2. `cd kazadi-securepay-api`
3. Copier `.env.example` → `.env` et remplir les clés
4. `npm install`
5. `npm run dev`

## Endpoints

- `POST /api/users/register`    : Création de compte utilisateur  
- `POST /api/users/login`       : Connexion (renvoie JWT)  
- `POST /api/generate-key`      : Génération de clé API (sans paiement)  
- `POST /api/transaction`       : Traitement d’une transaction (`x-api-key` + `x-client-secret`)  
- `POST /api/rebind-device`     : Réassociation clé ↔ device (`x-api-key` + `x-client-secret`)

Voir docs internes pour plus de détails.
