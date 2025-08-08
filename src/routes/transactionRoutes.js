// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { processTransaction } = require('../controllers/transactionController');
const authenticateApi = require('../middleware/authenticateApi');

// Déclaration de la route POST /api/transaction
// Sécurité : Clé API via authenticateApi
router.post('/transaction', authenticateApi, processTransaction);

module.exports = router;
