const express = require('express');

const router = express.Router();
const NAMESPACE = '/api/v1';
const imageApiController = require('./controller/image-controller');
const fileUploadMiddleware = require('../../middleware/file-upload');

router.get(`${NAMESPACE}/status`, (req, res) => res.json({ status: true, version: '1.0' }));
router.get(`${NAMESPACE}/images`, imageApiController.getAll);
router.post(`${NAMESPACE}/images`, fileUploadMiddleware, imageApiController.create);

module.exports = router;
