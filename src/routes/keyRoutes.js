const express = require('express');
const { generateApiKey } = require('../controllers/keyController');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

// POST /api/generate-key
// Corps JSON attendu : { clientSecret: string }
// Protégé par JWT (utilisateur authentifié)
// Pour tests sans paiement, mais en gardant l'authentification JWT
templateRouter = require('express').Router();
router.post('/generate-key', authenticateUser, generateApiKey); // temporaire pour tests sans paiement

module.exports = router;