const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/podcast", require("./podcast"));
router.use("/comment", require("./comment"));

module.exports = router;
