async function getRecipe(query = 'pizza') {
    try {
        const right=document.querySelector(".right");
        
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=4562260c-28b8-407f-81e3-58dc0e37e4b4`);
        const data = await res.json();

        const recipesContainer = document.querySelector('.recipies');
        recipesContainer.innerHTML = "";

        data.data.recipes.forEach((item) => {
            recipesContainer.innerHTML += `
            <div class="items m-2">
                <div class="item-img">
                    <img src="${item.image_url}" alt="${item.title}" class="rounded-5">
                </div>
                <div class="item-content">
                    <h6 id="${item.id}" class="recipe-title">${item.title}</h6>
                    <span>${item.publisher}</span>
                </div>
            </div>`;
        });

        document.querySelectorAll('.recipe-title').forEach((element) => {
            element.addEventListener('click', async function() {
                try {
                    const second = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${element.id}?key=4562260c-28b8-407f-81e3-58dc0e37e4b4`);
                    const response = await second.json();

                    // Clear the ingredients container
                    const ingredientsContainer = document.querySelector('.right');
                    ingredientsContainer.innerHTML = "";
                    

                    // Get the ingredients array from the response
                    const ingredients = response.data.recipe.ingredients;

                    // Loop through the ingredients and render them
                    ingredients.forEach((item) => {
                        ingredientsContainer.innerHTML += `
                        <div class="card text-center">
                            <h6>${item.quantity ? item.quantity : ''} ${item.unit ? item.unit : ''}</h6>
                            <p>${item.description}</p>
                        </div>`;
                    });
                } catch (error) {
                    console.error('Error fetching recipe details:', error);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Initial fetch on page load
getRecipe();

// Search functionality
const input = document.querySelector("input");
const btn = document.getElementById("searchme");
btn.addEventListener("click", async function() {
    const search = input.value.trim();
    if (search) {
        await getRecipe(search);
    }
});
