const assert = require('assert');
const Sequelize = require('sequelize');
const sysConfig = require('./../../config.js');

const dbConfig = require('./../../config/db.js')[sysConfig.get('env')];

console.log('__________________');
console.log(sysConfig.get('env'));

describe('Verify database', () => {
  it('should respond to database connection', (done) => {
    const s = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
    s.authenticate()
      .then(() => {
        assert.ok(true);
        done();
      })
      .catch(() => {
        assert.fail('unable to authenticate database');
        done();
      });
  });
});
