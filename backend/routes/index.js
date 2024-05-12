const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/speaker", require("./speaker"));
router.use("/listener", require("./listener"));

module.exports = router;
