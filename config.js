const convict = require('convict');

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port',
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'server1.dev.test',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users',
    },
  },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./config/${env}.json`);

// Perform validation
config.validate({
  allowed: 'strict',
});

module.exports = config;
