const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Ekod-Alumni',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

