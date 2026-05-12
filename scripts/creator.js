let tagRowTemplate;
let recipeItemTemplate;
let recipeStepTemplate;

let tagList;
let ingredientList;
let stepListElement;

let amountOfSteps = 0;
const stepItemID = "StepNumber"

window.onload = function () {
    tagRowTemplate = document.getElementById("tagRow");
    recipeItemTemplate = document.getElementById("recipeListItemTemplate");
    recipeStepTemplate = document.getElementById("recipeStepTemplate");

    tagList = document.getElementById("tags");
    ingredientList = document.getElementById("ingredientList");
    stepListElement = document.getElementById("stepList");

    let test = 0;

    addIngredient();
    addStep();

}

function addTag(element) {
    const tagRow = tagRowTemplate.content.cloneNode(true);
    tagList.appendChild(tagRow);
}

function addIngredient() {
    const recipeItem = recipeItemTemplate.content.cloneNode(true);
    (ingredientList.childElementCount == 0) ? recipeItem.querySelector(".removeIngredient").style.visibility = "hidden" : null;
    ingredientList.appendChild(recipeItem);
}

function addStep() {
    const stepItem = recipeStepTemplate.content.cloneNode(true);

    if (amountOfSteps == 0) {
        stepItem.querySelector(".moveUp").style.visibility = "hidden";
        stepItem.querySelector(".moveDown").style.visibility = "hidden";
        stepItem.querySelector(".deleteStepButton").style.visibility = "hidden";
    }
    else {
        previousStepId = amountOfSteps - 1;
        stepListElement.querySelector("#" + stepItemID + previousStepId.toString()).querySelector(".moveDown").style.visibility = "visible";
        stepItem.querySelector(".moveDown").style.visibility = "hidden";
    }

    stepItem.querySelector(".stepItem").id = stepItemID + amountOfSteps;
    amountOfSteps += 1;

    returnValue = stepListElement.appendChild(stepItem);
    console.log(returnValue);
}

function moveStep(listItem, direction) {
    direction = parseInt(direction);
    elementId = parseInt(listItem.id.slice(stepItemID.length));
    console.log(elementId);

    console.log("." + (stepItemID + (elementId + direction)).toString());

    elementToSwitch = listItem.parentElement.querySelector("#" + (stepItemID + (elementId + direction)).toString());
    elementToSwitch.remove();
    console.log(elementToSwitch.id)

    oldItemId = listItem.id
    listItem.id = elementToSwitch.id
    elementToSwitch.id = oldItemId

    elementToSwitch.querySelector(".moveUp").style.visibility = "visible";
    elementToSwitch.querySelector(".moveDown").style.visibility = "visible";
    elementToSwitch.querySelector(".deleteStepButton").style.visibility = "visible";
    listItem.querySelector(".moveUp").style.visibility = "visible";
    listItem.querySelector(".moveDown").style.visibility = "visible";
    listItem.querySelector(".deleteStepButton").style.visibility = "visible";

    direction > 0 ? listItem.parentElement.insertBefore(elementToSwitch, listItem) : listItem.parentElement.insertBefore(elementToSwitch, listItem.nextSibling);

    let firstItem = listItem.parentElement.querySelector("#" + stepItemID + "0");
    let lastItem = listItem.parentElement.querySelector("#" + stepItemID + (amountOfSteps - 1).toString());

    firstItem.querySelector(".moveUp").style.visibility = "hidden";
    firstItem.querySelector(".deleteStepButton").style.visibility = "hidden"
    lastItem.querySelector(".moveDown").style.visibility = "hidden";
}

function deleteStep(element) {
    amountOfSteps--;
    element.remove();
    let elementList = stepListElement.children;
    for (let i = 0; i < elementList.length; i++) {
        elementList[i].id = stepItemID + i.toString();
    }
}

function createIngredientHeader(element) {
    element.parentElement.querySelector(".ingredientAmount").style.visibility = "visible";
    element.parentElement.querySelector(".ingredientUnit").style.visibility = "visible";

    if (element.checked) {
        element.parentElement.querySelector(".ingredientAmount").style.visibility = "hidden";
        element.parentElement.querySelector(".ingredientUnit").style.visibility = "hidden";
    }
}

function saveRecipe() {
    let recipe = {
        "name": document.getElementById("name").value,
        "tags": [...tagList.children].map(child => child.querySelector(".tagName").value),
        "ingredients": [],
        "steps": [...stepListElement.children].map(child => child.querySelector(".recipeStep").value)
    };

    let ingredientSection = {
        "header": "",
        "items": []
    }
    for (child of ingredientList.children) {
        if (child.querySelector(".isHeader").checked) {
            if (recipe.ingredients.length != 0) {
                recipe.ingredients.push(ingredientList);
                ingredientSection.items = [];
            }
            ingredientSection.header = child.querySelector(".ingredientName").value;
            console.log(child.querySelector(".ingredientName").value);

            continue;
        }

        ingredientSection.items.push({
            "quantity": child.querySelector(".ingredientAmount").value,
            "unit": child.querySelector(".ingredientUnit").value,
            "name": child.querySelector(".ingredientName").value,
        });
    }

    recipe.ingredients.push(ingredientSection);

    const jsonString = JSON.stringify(recipe, null, 2);

    // Create blob
    const blob = new Blob([jsonString], {
        type: "application/json"
    });

    // Create temporary download URL
    const url = URL.createObjectURL(blob);

    // Create temporary link
    const a = document.createElement("a");
    a.href = url;
    a.download = "RecipeTest.json";

    // Trigger download
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
}