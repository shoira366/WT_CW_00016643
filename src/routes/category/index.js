const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const multer = require("multer");
const storage = require("../../middlewares/upload.middleware");
const upload = multer({ storage: storage });

// App Routes
router
  .get("/", categoryController.GET)
  .get("/categories", categoryController.EXPLORE_CATEG)
  .get("/category/:id", categoryController.GET_BY_ID)
  .post("/category", upload.single("image"), categoryController.POST)
  .put("/category/:id", upload.single("image"), categoryController.UPDATE)
  .delete("/category/:id", categoryController.DELETE);

module.exports = router;
