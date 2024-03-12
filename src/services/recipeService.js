const FS = require("../lib/fs_deal");
const recipe = new FS("../data/recipe.json");
const allRecipe = JSON.parse(recipe.read());
const ranId = require("../lib/ranId");
const category = new FS("../data/category.json");
const allCategory = JSON.parse(category.read());

module.exports = {
  get() {
    const limitNumber = 5;
    const foods = allRecipe.slice(0, limitNumber);
    const Thai = allRecipe.filter((r) => r.category == "nJSG");
    const Turkish = allRecipe.filter((r) => r.category == "pKlZ");
    const allFoods = { foods, Thai, Turkish };
    return allFoods;
  },
  explore_categ() {
    return allRecipe;
  },
  getByCategory(categoryId) {
    const getByCateg = allRecipe.filter(
      (recipe) => recipe.category == categoryId
    );
    return getByCateg;
  },
  getOne(id) {
    const recipe = allRecipe.find((r) => r.id == id);
    return recipe;
  },
  getById(id) {
    const recipe = allRecipe.find((r) => r.id == id);
    const getCategId = allCategory.find((e) => e.id == recipe.category);
    const result = { recipe, getCategId };
    return result;
  },
  search(searchName) {
    let regex = new RegExp(searchName, "gi");
    console.log(regex);
    return allRecipe.filter((recipe) => recipe.name.match(regex));
  },
  create(req) {
    const id = ranId(4);
    const { name, description, ingredients, category } = req.body;
    const image = req.file?.originalname;

    const newRecipe = {
      id,
      name,
      description,
      ingredients,
      category,
      image,
    };

    allRecipe.push(newRecipe);

    recipe.write(allRecipe);

    return newRecipe;
  },
  update(id, req) {
    const recipeIndex = allRecipe.findIndex((r) => r.id == id);

    if (recipeIndex === -1) {
      return null;
    }

    allRecipe[recipeIndex].name = req.body.name ?? allRecipe[recipeIndex].name;
    allRecipe[recipeIndex].description =
      req.body.description ?? allRecipe[recipeIndex].description;
    allRecipe[recipeIndex].ingredients = allRecipe[recipeIndex].ingredients;
    allRecipe[recipeIndex].category =
      req.body.category ?? allRecipe[recipeIndex].category;
    allRecipe[recipeIndex].image =
      req.file?.originalname ?? allRecipe[recipeIndex].image;

    recipe.write(allRecipe);

    return allRecipe[recipeIndex];
  },
  delete(id) {
    const index = allRecipe.findIndex((r) => r.id == id);
    allRecipe.splice(index, 1);
    recipe.write(allRecipe);
  },
};
