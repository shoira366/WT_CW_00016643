const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const recipeRouter = require("./recipe");

router.use(categoryRouter, recipeRouter);

module.exports = router;
