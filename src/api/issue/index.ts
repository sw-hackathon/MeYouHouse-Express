import express from "express";
// import { upload } from "../../modules/upload";

const upload = require("../../modules/upload");
const router = express.Router();

// router.post("", require("./issuePOST"));
router.post(
  "",
  upload.fields([{ name: "imgs", maxCount: 5 }]),
  require("./issuePOST")
);

module.exports = router;
