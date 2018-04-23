const chai = require('chai');
const fs = require('fs');

const { expect } = chai;

const app = require('./../../../app');

describe('Index page specs ', () => {
  let response;
  before((done) => {
    chai.request(app)
      .post('/api/v1/images')
      .type('form')
      .send({ _method: 'post', name: 'name' })
      .attach('file', fs.readFileSync(`${__dirname}/../../resources/img.jpg`), 'img.jpg')
      .end((err, res) => {
        response = res;
        done();
      });
  });

  it('should response with 200 status', (done) => {
    expect(response).to.have.status(200);
    done();
  });
});
