const express = require('express');
const router = express.Router();
const { createJob } = require('../Controllers/postJob');
const multer = require('multer');

// File upload config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // folder for attachments
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/post-job/:clientId', upload.single('attachment'), createJob);

module.exports = router;
