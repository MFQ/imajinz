const model = require('../models');
const sharp = require('sharp');
const crypto = require('crypto');

const Images = model.Image;

module.exports = {
  convertImageToSVG: {
    perform: async (image) => {
      const hexString = crypto.randomBytes(20).toString('hex');
      const processedImageTitle = `${hexString}-${image.name}.png`;
      sharp(`uploads/${image.url}`)
        .resize(null, 400)
        .max()
        .toFormat('png')
        .toFile(`processed-assets/${processedImageTitle}`, (err) => {
          if (err) {
            throw err;
          }
          Images.findByUrl(image.url).then((img) => {
            img.url = processedImageTitle;
            img.processed = true;
            img.save().then((i) => {
              console.log(`${i.name} image is processed`);
            });
          });
        });
    },
  },
};
