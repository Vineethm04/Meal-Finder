const categoriesContainer = document.getElementById("categories-container");

const mealsContainer = document.getElementById("meals-container");

const detailsContainer = document.getElementById("details-container");

const searchInput = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");


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


            // CATEGORY CLICK

            categoryCard.addEventListener("click", () => {

                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
                    .then(response => response.json())
                    .then(data => {

                        mealsContainer.innerHTML = "";

                        if (data.meals) {

                            data.meals.forEach(meal => {

                                const mealCard = document.createElement("div");

                                mealCard.innerHTML = `
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                    <h3>${meal.strMeal}</h3>
                                `;

                                mealsContainer.appendChild(mealCard);


                                // MEAL CLICK

                                mealCard.addEventListener("click", () => {

                                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                                        .then(response => response.json())
                                        .then(data => {

                                            const meal = data.meals[0];

                                            detailsContainer.innerHTML = `
                                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                                <h2>${meal.strMeal}</h2>
                                                <p>${meal.strCategory}</p>
                                                <p>${meal.strArea}</p>
                                                <p>${meal.strInstructions}</p>
                                            `;

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
                        <h3>${meal.strMeal}</h3>
                    `;

                    mealsContainer.appendChild(mealCard);


                    // MEAL CLICK

                    mealCard.addEventListener("click", () => {

                        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                            .then(response => response.json())
                            .then(data => {

                                const meal = data.meals[0];

                                detailsContainer.innerHTML = `
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                    <h2>${meal.strMeal}</h2>
                                    <p>${meal.strCategory}</p>
                                    <p>${meal.strArea}</p>
                                    <p>${meal.strInstructions}</p>
                                `;

                            });

                    });

                });

            }

        });

});