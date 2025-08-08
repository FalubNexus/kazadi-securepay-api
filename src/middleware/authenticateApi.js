const bcrypt = require('bcrypt');
const { ApiKeys } = require('../controllers/keyController');
const { getDeviceId } = require('../utils/device');

module.exports = async (req, res, next) => {
  const apiKey       = req.headers['x-api-key'];
  const clientSecret = req.headers['x-client-secret'];
  const incomingDeviceId = getDeviceId();

  const record = ApiKeys.get(apiKey);
  if (!record) {
    return res.status(401).json({ error: 'API key invalide' });
  }

  // Vérification du mot secret
  const secretOk = await bcrypt.compare(clientSecret || '', record.clientSecretHash);
  if (!secretOk) {
    return res.status(401).json({ error: 'Mot secret invalide' });
  }

  // Vérification du deviceId
  if (record.deviceId !== incomingDeviceId) {
    return res.status(401).json({ error: 'Device mismatch' });
  }

  next();
};