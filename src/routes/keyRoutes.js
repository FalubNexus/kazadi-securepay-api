// src/routes/keyRoutes.js
// Rôle : endpoint POST /api/generate-key protégé par JWT

const express = require('express');
const router = express.Router();

// Import des contrôleurs et middleware
const { generateApiKey } = require('../controllers/keyController');
const authenticateUser = require('../middleware/authenticateUser');

// Déclaration de la route POST /api/generate-key
// Attente dans req.body : { clientSecret: string }
// Sécurité : JWT via authenticateUser
router.post(
  '/generate-key',
  authenticateUser,
  generateApiKey
);

module.exports = router;
