/** @format */
const express = require("express");
const router = express.Router();

const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require("../controllers/fileUpload.js");

// router.post("/image", imageUpload);
// router.post("/video", videoUpload);
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);

module.exports = router;