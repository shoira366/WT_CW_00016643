let addIngredientsBtn = document.getElementById("addIngredientsBtn");
let ingredientList = document.querySelector(".ingredientList");
let ingredientDiv = document.querySelectorAll(".ingredientDiv")[0];

addIngredientsBtn.addEventListener("click", function () {
  let newIngredients = ingredientDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName("input")[0];
  input.value = "";
  ingredientList.appendChild(newIngredients);
});

let elForm = document.querySelector("#form");
let name_r = document.querySelector("#name");
let desc = document.querySelector("#description");
let ingredients = document.querySelector("#ingredients");
let category = document.querySelector("#category");
let image = document.querySelector("#image");
let selectedFile = null;

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = elForm.action.split("/")[elForm.action.split("/").length - 1];

  const update = async () => {
    // Use async/await for better handling
    try {
      const formData = new FormData();
      formData.append("name", name_r.value);
      formData.append("description", desc.value);
      formData.append("ingredients", ingredients.value);
      formData.append("category", category.value);
      formData.append("image", image.value);

      const response = await fetch(`/update-recipe/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        console.log("err");
        throw new Error("Update Failed: " + response.status);
      }

      window.location.href = `http://localhost:3000/recipe/${id}`;
    } catch (err) {
      console.error("Error during update:", err);
      // Handle the error appropriately
    }
  };
  update();
});

async function check() {
  const id =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  await fetch(`/delete-recipe/${id}`, {
    method: "DELETE",
  });
}
