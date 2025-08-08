// src/controllers/keyController.js
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { getDeviceId } = require('../utils/device');

// Stockage en mémoire : Map<apiKey, { deviceId, clientSecretHash, createdAt }>
const ApiKeys = new Map();

// Paramètres de hashing
const SALT_ROUNDS = 12;

const generateApiKey = async (req, res) => {
  const { clientSecret } = req.body;
  if (!clientSecret || clientSecret.length < 8) {
    return res.status(400).json({ error: 'clientSecret requis (min. 8 caractères)' });
  }

  // Génération de la clé au format kazadi-sk-<32 hex>
  const apiKey = 'kazadi-sk-' + crypto.randomBytes(16).toString('hex');
  // Lecture automatique de l'ID machine
  const deviceId = getDeviceId();

  // Hachage du mot secret
  const clientSecretHash = await bcrypt.hash(clientSecret, SALT_ROUNDS);

  // Stockage
  ApiKeys.set(apiKey, { deviceId, clientSecretHash, createdAt: Date.now() });

  // Réponse
  res.json({ apiKey, deviceId });
};

module.exports = {
  generateApiKey,
  ApiKeys,
};
