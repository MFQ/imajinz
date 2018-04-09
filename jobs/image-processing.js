const model = require('../models');
const sharp = require('sharp');
const crypto = require('crypto');
const request = require('request');

const Images = model.Image;

module.exports = {
  uploadImageByUrl: {
    perform: async (attr) => {
      const hexString = crypto.randomBytes(20).toString('hex');
      const processedImageTitle = `${hexString}-${attr.name}.png`;
      request({ url: attr.url, encoding: null }, (err, res, bodyBuffer) => {
        sharp(bodyBuffer)
          .resize(null, 400)
          .max()
          .toFormat('png')
          .toFile(`processed-assets/${processedImageTitle}`, (errors) => {
            if (errors) {
              throw errors;
            }
            Images.create({
              name: attr.name,
              url: processedImageTitle,
              processed: true,
            }).then((image) => {
              console.log('Image is created .....');
              return image;
            });
          });
      });
    },
  },
  resizeImage: {
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
