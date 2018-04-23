const chai = require('chai');
const fs = require('fs');

const { expect } = chai;

const app = require('./../../../app');

describe('Index page specs ', () => {
  let response;
  before((done) => {
    chai.request(app)
      .post('/api/v1/imagesbyurl')
      .type('form')
      .send({ _method: 'post', name: 'url', url: 'http://www.debatingeurope.eu/wp-content/uploads/2013/08/communism.png' })
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

  it('should response should have processing', (done) => {
    expect(response.body.processing).to.be.true;
    done();
  });
});
