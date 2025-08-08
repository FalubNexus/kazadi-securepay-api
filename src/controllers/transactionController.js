// src/controllers/transactionController.js
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); // si jamais besoin
const { computeCvk, encryptPayload } = require('../utils/security');

exports.processTransaction = (req, res) => {
  const { timestamp, deviceId, cardNumber, amount, nonce } = req.body;

  // Validation basique
  if (!timestamp || !deviceId || !cardNumber || !amount || !nonce) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  // Anti-rejeu : +/- 60s
  const now = Math.floor(Date.now()/1000);
  if (Math.abs(now - timestamp) > 60) {
    return res.status(403).json({ error: 'Timestamp invalide (±60s)' });
  }

  // Générer un ID unique
  const transactionId = uuidv4();

  // Calculer le CVK (HMAC-SHA256)
  const cvk = computeCvk({ transactionId, timestamp, deviceId, cardNumber, amount, nonce });

  // Chiffrer éventuellement le payload de réponse
  const encryptedData = encryptPayload({ status: 'ok', transactionId });

  // Répondre avec tous les champs
  return res.json({
    status: 'Transaction traitée',
    transactionId,
    cvk,
    encryptedData
  });
};
