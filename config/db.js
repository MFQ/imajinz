module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'imajinz_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'imajinz_development',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'imajinz_test',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: 'postgres',
  },
};
