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

            itemTemplateCLone.querySelector(".ingredientItemDiv").addEventListener("click", function() {
                console.log("Clicked ingredient " + i);
                let checkbox = this.querySelector(".ingredientCheckbox");

                if (!checkbox.checked) {
                    this.style.textDecoration = "line-through";
                    console.log("Checked ingredient " + i);
                    checkbox.checked = true;
                    
                } else {
                    this.style.textDecoration = "none";
                    console.log("Unchecked ingredient " + i);
                    checkbox.checked = false;
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
