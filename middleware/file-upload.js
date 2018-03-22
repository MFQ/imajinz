const multer = require('multer');
const mime = require('mime');

const storageMiddleware = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}.${mime.getExtension(file.mimetype)}`),
});
const upload = multer({ storage: storageMiddleware });

module.exports = upload.single('file');
