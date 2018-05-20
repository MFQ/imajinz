module.exports = {
  development: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'imajinz_development',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'imajinz_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'imajinz_production',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: 'postgres',
  },
};
