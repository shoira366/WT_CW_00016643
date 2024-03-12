const categoryService = require("../services/categoryService");
const recipeService = require("../services/recipeService");
const { validationResult } = require("express-validator");
const { addRecipeValidation } = require("../middlewares/validation.middleware");

module.exports = {
  GET: async (req, res) => {
    try {
      const recipe = await recipeService.get();
      res.render("index", recipe);
    } catch (err) {
      res.status(500).send({ message: err.message || "Error occured" });
    }
  },
  GET_BY_CATEG: async (req, res) => {
    try {
      const result = await recipeService.getByCategory(req.params.category);
      res.render("recipes", { title: "Recipes", result });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error occured" });
    }
  },
  UPDATE_RECIPE: async (req, res) => {
    const infoErrorsObj = req.flash("infoError");
    const infoEditObj = req.flash("infoEdit");
    const categories = await categoryService.get();
    const result = await recipeService.getById(req.params.id);
    res.render("update-recipe", {
      title: "Update Recipe",
      result,
      infoErrorsObj,
      infoEditObj,
      categories,
    });
  },
  GET_BY_ID: async (req, res) => {
    try {
      const result = await recipeService.getById(req.params.id);
      res.render("recipe", { title: "Recipe", result });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error occured" });
    }
  },
  SEARCH: async (req, res) => {
    const search = await recipeService.search(req.body.searchName);
    res.render("search", { title: "Search", search });
  },
  SUBMIT_RECIPE: async (req, res) => {
    const infoErrorObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    const categories = await categoryService.get();
    res.render("submit-recipe", {
      title: "Submit Recipe",
      categories,
      infoErrorObj,
      infoSubmitObj,
    });
  },
  POST: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("infoErrors", errors.array()[0].msg);
      res.redirect("submit-recipe");
      return;
    }
    try {
      req.flash("infoSubmit", "Recipe has been added");
      recipeService.create(req);
      res.redirect("submit-recipe");
    } catch (err) {
      req.flash("infoErrors", err);
      res.redirect("submit-recipe");
    }
  },
  UPDATE: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("infoError", errors.array()[0].msg);
      res.redirect(`update-recipe/${req.params.id}`);
      return;
    }
    try {
      req.flash("infoEdit", "Recipe has been updated");
      recipeService.update(req.params.id, req);
      res.status(200).json();
      // res.redirect(`update-recipe/${req.params.id}`);
    } catch (err) {
      console.log("err");
      req.flash("infoError", err);
      res.status(500).json();
      // res.redirect(`update-recipe/${req.params.id}`);
    }
  },
  DELETE: (req, res) => {
    const findRecipe = recipeService.getById(req.params.id);
    if (!findRecipe) {
      res.status(404).send("Recipe not found");
    }
    recipeService.delete(req.params.id);
    res.status(204).send("Recipe deleted successfully");
  },
};
