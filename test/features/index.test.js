const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('./../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Index page specs ', () => {
  let response;
  let $;
  before((done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        response = res;
        $ = cheerio.load(response.text);
        done();
      });
  });

  it('It should responsd to 200', (done) => {
    expect(response).to.have.status(200);
    done();
  });

  it('It should have form', (done) => {
    expect($('form').length).to.equal(1);
    done();
  });
});
