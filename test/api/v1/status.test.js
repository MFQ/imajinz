const chai = require('chai');

const { expect } = chai;

const app = require('./../../../app');

describe('Index page specs ', () => {
  let response;
  before((done) => {
    chai.request(app)
      .get('/api/v1/status')
      .end((err, res) => {
        response = res;
        done();
      });
  });

  it('should response with 200 status', (done) => {
    expect(response).to.have.status(200);
    done();
  });

  it('should have statue true in its body', (done) => {
    expect(response.body.status).to.be.true;
    done();
  });

  it('should have verion 1.0', (done) => {
    expect(response.body.version).to.equal('1.0');
    done();
  });
});
