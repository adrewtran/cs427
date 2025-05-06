
(function() {
    const url = 'https://dummyjson.com/recipes';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const recipes = data.recipes;
            console.log("List of Recipe Names:");
            recipes.forEach(recipe => {
                console.log(recipe.name);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
})();