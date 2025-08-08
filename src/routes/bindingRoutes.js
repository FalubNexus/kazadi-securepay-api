const express = require('express');
const { rebindDevice } = require('../controllers/bindingController');
const router = express.Router();

/**
 * POST /api/rebind-device
 * En-têtes requis :
 *  - x-api-key       : la clé API existante
 *  - x-client-secret : le mot secret choisi par l’utilisateur
 *
 * Cette route permet de lier à nouveau la clé API au nouvel deviceId
 * récupéré automatiquement côté serveur.
 */
router.post('/rebind-device', rebindDevice);

module.exports = router;
