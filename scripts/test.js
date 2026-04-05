function helloWorld() {
    alert("HELLO WORLD IM ALLIVEEEEE")
    console.log("HEYYYYYYYYYYYYYY")
}

function getRecipe() {
    fetch('recipes/test.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
}