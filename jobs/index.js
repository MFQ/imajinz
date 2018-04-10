const imageProcessor = require('./image-processing');
const googleVisionApi = require('./google-vision-api');

const jobs = { ...imageProcessor, ...googleVisionApi };
module.exports = jobs;
