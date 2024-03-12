const { body, param } = require("express-validator");
const recipe_service = require("../services/recipeService");

const addRecipeValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Recipe name cannot not be empty")
      .isLength({ min: 3, max: 255 })
      .withMessage("Recipe name must be between 3 and 255 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Recipe description cannot not be empty")
      .isLength({ max: 500 })
      .withMessage("Description must be in 255 characters long"),
    body("ingredients")
      .notEmpty()
      .withMessage("Ingredients cannot not be empty"),
    body("category")
      .notEmpty()
      .withMessage("Choose the category of the recipe"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Choose the image for the recipe");
      }

      // Success
      return true;
    }),
  ];
};

const updateRecipeValidation = () => {
  return [
    param("id").custom(async (id) => {
      const exists = await recipe_service.getById(id);
      if (!exists) {
        throw new Error("Recipe not found");
      }
    }),
    body("name")
      .notEmpty()
      .withMessage("Recipe name must not be empty")
      .isLength({ min: 3, max: 255 })
      .withMessage("Recipe name must be between 3 and 255 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Recipe description cannot not be empty"),
    body("ingredients")
      .notEmpty()
      .withMessage("Ingredients cannot not be empty"),
    body("category")
      .notEmpty()
      .withMessage("Choose the category of the recipe"),
    // body("image").custom((value, { req }) => {
    //   console.log(value + "valuecha");
    //   if (!req.file?.originalname) {
    //     throw new Error("Choose the image for the recipe");
    //   }

    //   // Success
    //   return true;
    // }),
  ];
};

module.exports = {
  addRecipeValidation,
  updateRecipeValidation,
};
