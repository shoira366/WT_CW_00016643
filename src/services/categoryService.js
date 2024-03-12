const FS = require("../lib/fs_deal");
const category = new FS("../data/category.json");
const allCategory = JSON.parse(category.read());
const ranId = require("../lib/ranId");
const recipeService = require("./recipeService");

module.exports = {
  get() {
    const limitNumber = 5;
    return allCategory.slice(0, limitNumber);
  },
  explore_categ() {
    return allCategory;
  },
  getById(id) {
    const categById = allCategory.find((c) => c.title == id);
    const recipeByCateg = recipeService.getByCategory(categById.id);
    return recipeByCateg;
  },
  getId() {
    return allCategory.find((c) => c.id == "pKlZ");
  },
  create(req) {
    const id = ranId(4);
    const { title } = req.body;
    const image = req.file.originalname;

    const newCateg = {
      id,
      title,
      image,
    };

    allCategory.push(newCateg);

    category.write(allCategory);

    return newCateg;
  },
  update(id, req) {
    const categIndex = allCategory.findIndex((t) => t.id == id);

    if (categIndex === -1) {
      return null;
    }

    allCategory[categIndex].title =
      req.body.title ?? allCategory[categIndex].title;
    allCategory[categIndex].image =
      req.file?.originalname ?? allCategory[categIndex].image;

    console.log(allCategory[categIndex]);

    category.write(allCategory);

    return allCategory[categIndex];
  },
  delete(id) {
    const index = allCategory.findIndex((t) => t.id == id);
    allCategory.splice(index, 1);
    category.write(allCategory);
  },
};
