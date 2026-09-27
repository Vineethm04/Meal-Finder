const categoriesContainer = document.getElementById("categories-container");

const mealsContainer = document.getElementById("meals-container");

const detailsContainer = document.getElementById("details-container");

const categoryDescription = document.getElementById("category-description");

const searchInput = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

const menuButton = document.getElementById("menu-button");

const sideMenu = document.getElementById("side-menu");

const closeMenu = document.getElementById("close-menu");

const sideMenuCategories = document.getElementById("side-menu-categories");


// =========================
// SHOW MEAL DETAILS
// =========================

function showMealDetails(meal) {

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredients += `
                <li>
                    <span class="ingredient-number">${i}</span>
                    <span class="ingredient-name">${ingredient}</span>
                </li>
            `;

        }

    }


    detailsContainer.innerHTML = `
        <div class="meal-details-content">

            <div class="meal-details-image">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>

            <div class="meal-details-info">

                <h2>${meal.strMeal}</h2>

                <div class="details-line"></div>

                <p>
                    <strong>CATEGORY:</strong>
                    ${meal.strCategory}
                </p>

                <p>
                    <strong>Source:</strong>
                    ${meal.strSource || ""}
                </p>

                <p>
                    <strong>Tags:</strong>
                    ${meal.strTags || ""}
                </p>

                <div class="ingredients-box">

                    <h3>Ingredients</h3>

                    <ol>
                        ${ingredients}
                    </ol>

                </div>

            </div>

        </div>
    `;

}


// =========================
// LOAD CATEGORIES
// =========================

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(response => response.json())
    .then(data => {

        data.categories.forEach(category => {

            const categoryCard = document.createElement("div");

            categoryCard.innerHTML = `
                <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                <h3>${category.strCategory}</h3>
            `;

            categoriesContainer.appendChild(categoryCard);


            // SIDE MENU CATEGORY

            const sideMenuCategory = document.createElement("div");

            sideMenuCategory.textContent = category.strCategory;

            sideMenuCategories.appendChild(sideMenuCategory);


            sideMenuCategory.addEventListener("click", () => {

                categoryCard.click();

                sideMenu.classList.remove("active");

            });


            // CATEGORY CLICK

            categoryCard.addEventListener("click", () => {

                categoryDescription.innerHTML = `
                    <h3>${category.strCategory}</h3>
                    <p>${category.strCategoryDescription}</p>
                `;


                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
                    .then(response => response.json())
                    .then(data => {

                        mealsContainer.innerHTML = "";

                        if (data.meals) {

                            data.meals.forEach(meal => {

                                const mealCard = document.createElement("div");

                                mealCard.innerHTML = `
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                    <p class="meal-area"></p>
                                    <h3>${meal.strMeal}</h3>
                                `;

                                mealsContainer.appendChild(mealCard);


                                // GET MEAL AREA

                                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                                    .then(response => response.json())
                                    .then(data => {

                                        const mealDetails = data.meals[0];

                                        mealCard.querySelector(".meal-area").textContent =
                                            mealDetails.strArea;

                                    });


                                // MEAL CLICK

                                mealCard.addEventListener("click", () => {

                                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                                        .then(response => response.json())
                                        .then(data => {

                                            const mealDetails = data.meals[0];

                                            showMealDetails(mealDetails);

                                        });

                                });

                            });

                        }

                    });

            });

        });

    });


// =========================
// SEARCH MEALS
// =========================

searchButton.addEventListener("click", () => {

    const foodName = searchInput.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => {

            mealsContainer.innerHTML = "";

            if (data.meals) {

                data.meals.forEach(meal => {

                    const mealCard = document.createElement("div");

                    mealCard.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p class="meal-area">${meal.strArea}</p>
                        <h3>${meal.strMeal}</h3>
                    `;

                    mealsContainer.appendChild(mealCard);


                    // MEAL CLICK

                    mealCard.addEventListener("click", () => {

                        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                            .then(response => response.json())
                            .then(data => {

                                const mealDetails = data.meals[0];

                                showMealDetails(mealDetails);

                            });

                    });

                });

            }

        });

});


// =========================
// SIDE MENU
// =========================

menuButton.addEventListener("click", () => {

    sideMenu.classList.add("active");

});


closeMenu.addEventListener("click", () => {

    sideMenu.classList.remove("active");

});