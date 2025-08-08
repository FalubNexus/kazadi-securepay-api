const bcrypt = require('bcrypt');
const { ApiKeys } = require('./keyController');
const { getDeviceId } = require('../utils/device');

/**
 * POST /api/rebind-device
 * En-têtes requis :
 *   x-api-key       : la clé API existante
 *   x-client-secret : le mot secret choisi
 *
 * Lise automatiquement le nouvel deviceId et
 * met à jour la liaison dans ApiKeys.
 */
const rebindDevice = async (req, res) => {
  const apiKey       = req.headers['x-api-key'];
  const clientSecret = req.headers['x-client-secret'];
  const record       = ApiKeys.get(apiKey);

  if (!record) {
    return res.status(401).json({ error: 'API key invalide' });
  }

  // Vérification du mot secret
  const secretOk = await bcrypt.compare(clientSecret || '', record.clientSecretHash);
  if (!secretOk) {
    return res.status(401).json({ error: 'Mot secret invalide' });
  }

  // Lecture automatique du nouvel deviceId
  const newDeviceId = getDeviceId();
  record.deviceId = newDeviceId;

  return res.json({
    message: 'Device réassocié avec succès',
    deviceId: newDeviceId
  });
};

module.exports = {
    rebindDevice
}
