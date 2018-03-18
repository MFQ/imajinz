const assert = require('assert');
const Sequelize = require('sequelize');

const dbConfig = require('./../../config/db.js').test;

describe('Verify database', () => {
  it('should respond to database connection', (done) => {
    const s = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
    s.authenticate()
      .then(() => {
        assert.ok(true);
        done();
      })
      .catch((e) => {
        assert.fail('unable to authenticate database');
        done(e);
      });
  });
});
