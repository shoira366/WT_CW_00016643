const categoryService = require("../services/categoryService");
const recipeService = require("../services/recipeService");
module.exports = {
  GET: async (req, res) => {
    try {
      const categories = await categoryService.get();
      const allFoods = await recipeService.get();
      res.render("index", { title: "Homepage", categories, allFoods });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error occured" });
    }
  },
  EXPLORE_CATEG: async (req, res) => {
    try {
      const categories = await categoryService.explore_categ();
      res.render("categories", { title: "Categories", categories });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error occured" });
    }
  },
  GET_BY_ID: async (req, res) => {
    try {
      const result = await categoryService.getById(req.params.id);
      res.render("categories", { title: "Categories", result });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error occured" });
    }
  },
  POST: (req, res) => {
    res.status(201).json(categoryService.create(req));
  },
  UPDATE: (req, res) => {
    res.status(200).json(categoryService.update(req.params.id, req));
  },
  DELETE: (req, res) => {
    const findCategory = categoryService.getById(req.params.id);
    if (!findCategory) {
      res.status(404).send("Category not found");
    }
    categoryService.delete(req.params.id);
    res.status(204).send("Category deleted successfully");
  },
};
