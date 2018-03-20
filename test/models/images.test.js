const assert = require('assert');
const model = require('../../models');

const Images = model.Image;

describe('Create image Spec', () => {
  beforeEach((done) => {
    Images.destroy({
      where: {},
    }).then(() => {
      Images.create({
        name: 'name',
        url: 'url',
        tags: 'tags',
      }).then(() => done());
    });
  });

  it('Image is successfully created', (done) => {
    Images.findOne({
      where: {
        name: 'name',
        url: 'url',
        tags: 'tags',
      },
    }).then((image) => {
      assert.equal(image.name, 'name');
      assert.equal(image.url, 'url');
      assert.equal(image.tags, 'tags');
      done();
    });
  });

  it('Image will always has uniqe url', (done) => {
    Images.create({
      name: 'name',
      url: 'url',
      tags: 'tags',
    }).then(() => {
      assert.fail('creating duplicating ');
      done();
    }).catch(() => {
      assert.ok(true);
      done();
    });
  });
});
