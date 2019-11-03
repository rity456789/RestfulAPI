const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  res.json({ message: "Express is ready" });
});

module.exports = router;
