recipeList = null;

window.onload = function () {
    // Build the recipe page:
    getRecipes();
}

function getRecipes() {
    recipeList = document.getElementById("recipesList");
    recipeList.replaceChildren();

    // Get the recipe from the JSON file:
    fetch('recipes/all.json')
    .then((response) => {
        console.log("Received response from fetch request.");
        // Handle any errors:
        if (!response.ok) {
            if (response.status === 404) {
                header.innerText = 'Could not find all recipes file.';
                return null;
            }

            throw new Error("HTTP error " + response.status);
        }
        else {
            console.log("Successfully fetched recipe JSON file.");
            return response.json();
        }
    })
        .then((json) => {

            for (recipe of json.recipes) {
                recipeListItemTemplateClone = document.getElementById("recipeListItemTemplate").content.cloneNode(true);
                recipeListItemTemplateClone.querySelector(".recipeItem").addEventListener("click", function() {
                    window.location.href = "recipe.html?recipe=" + recipe.url;
                });

                recipeListItemTemplateClone.querySelector(".recipeTitle").innerText = recipe.name;
                recipeListItemTemplateClone.querySelector(".recipeDescription").innerText = "Test Description";
                recipeList.appendChild(recipeListItemTemplateClone);
            }
    })
    .catch((error) => {
        console.log("Error fetching recipe JSON file: " + error);
    });

}