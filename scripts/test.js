var header = null;
var ingredients = null;
var steps = null;
var recipeJsonFileName = null;

// 
window.onload = function () {
    header = document.getElementById("recipeHeader");
    ingredients = document.getElementById("recipeIngredients");
    steps = document.getElementById("recipeSteps");

    // Get the arguments from the URL:
    const urlParams = new URLSearchParams(window.location.search);
    recipeJsonFileName = urlParams.get('recipe');
    
    // Build the recipe page:
    getRecipe();
}

function getRecipe() {
    // Clear the previous recipe:
    header.innerText = "";
    ingredients.replaceChildren();
    steps.replaceChildren();

    if (!recipeJsonFileName) {
        header.innerText = "No recipe selected!";
        return;
    }

    // Get the recipe from the JSON file:
    fetch('recipes/' + encodeURIComponent(recipeJsonFileName) + '.json')
    .then((response) => {
        console.log("Received response from fetch request.");
        // Handle any errors:
        if (!response.ok) {
            if (response.status === 404) {
                header.innerText = 'Recipe "' + recipeJsonFileName + '" was not found.';
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
        // Add header text:
        header.innerText = json.name;

        // Add ingredients list:
        list = document.createElement("ul");
        itemTemplate = document.getElementById("ingredientItemTemplate");

        for (let i =0; i < json.ingredients.length; i++) {

            itemTemplateCLone = itemTemplate.content.cloneNode(true);
            itemTemplateCLone.querySelector(".ingredientItem").id = "ingredientItem" + i;

            itemTemplateCLone.querySelector(".ingredientCheckbox").addEventListener("change", function() {
                let ingredientSpan = document.getElementById("ingredientItem" + i);
                if (this.checked) {
                    ingredientSpan.style.textDecoration = "line-through";
                } else {
                    ingredientSpan.style.textDecoration = "none";
                }
            });

            itemTemplateCLone.querySelector(".ingredientName").innerText = json.ingredients[i];

            list.append(itemTemplateCLone);
        }
        ingredients.append(list);

        // Add steps:
        stepList = document.createElement("ol");
        for (let i =0; i < json.steps.length; i++) {
            item = document.createElement("li");
            item.innerText = json.steps[i];

            stepList.append(item);
        }
        steps.append(stepList);


    })
    .catch((error) => {
        console.log("Error fetching recipe JSON file: " + error);
    });

}
