const { machineIdSync } = require('node-machine-id');
module.exports.getDeviceId = () => machineIdSync();