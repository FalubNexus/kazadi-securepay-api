// src/utils/security.js
const crypto = require('crypto');
const SERVER_SECRET = process.env.SERVER_SECRET;

// HMAC-SHA256 pour le CVK
exports.computeCvk = ({ transactionId, timestamp, deviceId, cardNumber, amount, nonce }) => {
  const h = crypto.createHmac('sha256', SERVER_SECRET);
  h.update(`${transactionId}${timestamp}${deviceId}${cardNumber}${amount}${nonce}`);
  return h.digest('hex');
};

// AES-256-GCM pour chiffrer la réponse
exports.encryptPayload = (payload) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let enc = cipher.update(JSON.stringify(payload), 'utf8', 'hex');
  enc += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${enc}:${tag}`;
};
