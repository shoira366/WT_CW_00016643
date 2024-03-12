const express = require("express");
const router = express.Router();
const recipeController = require("../../controllers/recipeController");
const multer = require("multer");
const storage = require("../../middlewares/upload.middleware");
const upload = multer({ storage: storage });
const {
  addRecipeValidation,
  updateRecipeValidation,
} = require("../../middlewares/validation.middleware");

// App Routes
router
  .get("/recipes", recipeController.GET)
  // .get("/category/:category", recipeController.GET_BY_CATEG)
  .get("/update-recipe/:id", recipeController.UPDATE_RECIPE)
  .get("/recipe/:id", recipeController.GET_BY_ID)
  .post("/search", recipeController.SEARCH)
  .get("/submit-recipe", recipeController.SUBMIT_RECIPE)
  .post(
    "/submit-recipe",
    upload.single("image"),
    addRecipeValidation(),
    recipeController.POST
  )
  .put(
    "/update-recipe/:id",
    upload.single("image"),
    updateRecipeValidation(),
    recipeController.UPDATE
  )
  .delete("/delete-recipe/:id", recipeController.DELETE);

module.exports = router;
