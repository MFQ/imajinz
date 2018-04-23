const chai = require('chai');

const { expect } = chai;

const app = require('./../../../app');
const model = require('../../../models');

const Images = model.Image;

describe('Index page specs ', () => {
  let response;
  before((done) => {
    chai.request(app)
      .get('/api/v1/images')
      .end((err, res) => {
        response = res;
        done();
      });
  });

  it('should response with 200 status', (done) => {
    expect(response).to.have.status(200);
    done();
  });

  it('should match number of images present in a array', (done) => {
    Images.findAll({
      attributes: ['id', 'name', 'url'],
    }).then((images) => {
      expect(response.body.result.length).to.equal(images.length);
      done();
    });
  });
});
