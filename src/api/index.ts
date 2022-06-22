import express from "express";

const router = express.Router();

router.use("/issue", require("./issue"));

module.exports = router;
