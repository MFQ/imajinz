const model = require('../models');
const fs = require('fs');
const vision = require('@google-cloud/vision');
const _ = require('lodash');

const Images = model.Image;

module.exports = {
  enhancingVision: {
    perform: async (image) => {
      const client = new vision.ImageAnnotatorClient();
      const bitmap = fs.readFileSync(`processed-assets/${image.url}`);
      const base64str = new Buffer(bitmap).toString('base64');
      const requests = [
        {
          image: {
            content: base64str,
          },
          features: [
            { type: 'SAFE_SEARCH_DETECTION' }, { type: 'LABEL_DETECTION' },
          ],
        },
      ];
      client.batchAnnotateImages({ requests })
        .then((r) => {
          const res = r[0].responses[0];
          Images.findById(image.id).then((img) => {
            img.tags = _.map(res.labelAnnotations, 'description').join(', ');
            img.flagged = _.values(res.safeSearchAnnotation).includes('VERY_LIKELY');
            img.save().then(i => console.log(`Image is processed by google vision api ${i.name}`));
          });
        })
        .catch(err => console.log(err));
    },
  },
};
