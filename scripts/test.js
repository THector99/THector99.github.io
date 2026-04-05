function helloWorld() {
    alert("HELLO WORLD IM ALLIVEEEEE")
    console.log("HEYYYYYYYYYYYYYY")
}

function getRecipe() {
    fetch('recipes/test.json')
    .then((response) => response.json())
    .then((json) => {
        var header = document.getElementById("recipeHeader");
        var ingredients = document.getElementById("recipeIngredients");
        var steps = document.getElementById("recipeSteps");

        // Add header text:
        header.innerText = json.name;


        // Add ingredients list:
        list = document.createElement("ul");
        for (let i =0; i < json.ingredients.length; i++) {
            item = document.createElement("li");
            item.innerText = json.ingredients[i];

            list.append(item);
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


    });
}