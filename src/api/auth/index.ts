import express from "express";
// import { upload } from "../../modules/upload";

const upload = require("../../modules/upload");
const router = express.Router();

router.post("/home", require("./authHomePOST"));
router.get("/home/:code", require("./authHomeGET"));

module.exports = router;
