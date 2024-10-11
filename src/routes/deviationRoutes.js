const express = require("express");
const router = express.Router();
const { getDeviation } = require("../controllers/deviationController");

router.get("/deviation", getDeviation);

module.exports = router;
