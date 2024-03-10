const FS = require("../lib/fs_deal");
const category = new FS("../data/category.json");
const allCategory = JSON.parse(category.read());

module.exports = {
  get() {
    const limitNumber = 5;
    return allCategory.slice(0, limitNumber);
  },
  explore_categ() {
    return allCategory;
  },
  getById(id) {
    return allCategory.find((c) => c.id == id);
  },
  create(req) {
    const id = genRandId(4);
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

// generate random id inspired by uuid
let genRandId = (count) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
