const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const api_route = require("./routes");
const session = require("express-session");
const flash = require("connect-flash");

//EXPORTS
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(expressLayouts);

// PORT
const PORT = process.env.PORT || 3000;

// make mock database (raw .json file) available globally in app
global.category_db = path.join(__dirname, "./data/category.json");
global.recipe_db = path.join(__dirname, "./data/recipe.json");
global.user_db = path.join(__dirname, "./data/user.json");

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "CookingBlogSecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.set("layout", "./layouts/main");

app.use(api_route);

// Create server
app.listen({ port: PORT }, () => {
  console.log(`Server is running on port ${PORT}`);
});
