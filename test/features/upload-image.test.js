const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiFiles = require('chai-files');
const cheerio = require('cheerio');
const fs = require('fs');
const model = require('../../models');
const app = require('./../../app');

const Images = model.Image;

chai.use(chaiHttp);
chai.use(chaiFiles);

const { expect } = chai;
const { file, dir } = chaiFiles;

describe('Index page specs ', () => {
  let response;
  let $;
  let filename;
  let fileUrl;
  before((done) => {
    Images.destroy({
      where: {},
    }).then(() => {
      chai.request(app)
        .post('/images')
        .type('form')
        .send({
          _method: 'post',
          name: 'name',
        })
        .attach('file', fs.readFileSync(`${__dirname}/img.png`), 'img.png')
        .end((err, res) => {
          response = res;
          $ = cheerio.load(response.text);
          filename = $('img').data('url');
          fileUrl = $('img').attr('src');
          done();
        });
    });
  });

  it('should response with 200 status', (done) => {
    expect(response).to.have.status(200);
    done();
  });

  it('should have an image', (done) => {
    expect($('img').length).to.equal(1);
    done();
  });

  it('should create a file in upload', (done) => {
    expect(dir('./uploads')).to.exist;
    expect(file(`./uploads/${filename}`)).to.exist;
    done();
  });

  it('should responed to an image', (done) => {
    chai.request(app)
      .get(fileUrl)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
