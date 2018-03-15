module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'imajinz_development',
    host: '127.0.0.1',
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
    use_env_variable: process.env.DATABASE_URL || '',
  },
};
