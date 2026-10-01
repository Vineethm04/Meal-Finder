// =========================
// ELEMENTS
// =========================

const categoriesContainer =
    document.getElementById("categories-container");

const mealsContainer =
    document.getElementById("meals-container");

const detailsContainer =
    document.getElementById("details-container");

const categoryDescription =
    document.getElementById("category-description");

const searchInput =
    document.getElementById("search-input");

const searchButton =
    document.getElementById("search-button");

const menuButton =
    document.getElementById("menu-button");

const sideMenu =
    document.getElementById("side-menu");

const closeMenu =
    document.getElementById("close-menu");

const sideMenuCategories =
    document.getElementById("side-menu-categories");

const categoriesSection =
    document.querySelector(".categories-section");

const categoryDescriptionSection =
    document.querySelector(".category-description-section");

const mealsSection =
    document.querySelector(".meals-section");

const detailsSection =
    document.querySelector(".details-section");

const breadcrumbMeal =
    document.getElementById("breadcrumb-meal");



// =========================
// INITIAL PAGE STATE
// =========================

categoryDescriptionSection.style.display = "none";

mealsSection.style.display = "none";

detailsSection.style.display = "none";



// =========================
// SHOW MEAL DETAILS
// =========================

function showMealDetails(meal) {

    let ingredients = "";

    let measurements = "";

    let instructions = "";



    // =========================
    // INGREDIENTS & MEASURES
    // =========================

    for (let i = 1; i <= 20; i++) {

        const ingredient =
            meal[`strIngredient${i}`];

        const measurement =
            meal[`strMeasure${i}`];


        if (
            ingredient &&
            ingredient.trim() !== ""
        ) {

            // INGREDIENT

            ingredients += `
                <li>

                    <span class="ingredient-number">
                        ${i}
                    </span>

                    <span class="ingredient-name">
                        ${ingredient}
                    </span>

                </li>
            `;


            // MEASURE

            measurements += `
                <li>

                    <span class="measure-icon">
                        🔑
                    </span>

                    <span>
                        ${measurement || ""}
                    </span>

                </li>
            `;

        }

    }



    // =========================
    // INSTRUCTIONS
    // =========================

    if (meal.strInstructions) {

        const steps =
            meal.strInstructions
                .split(/\r?\n/)
                .filter(step => step.trim() !== "");


        steps.forEach(step => {

            instructions += `
                <li>

                    <span class="instruction-icon">
                        ☑
                    </span>

                    <span>
                        ${step.trim()}
                    </span>

                </li>
            `;

        });

    }



    // =========================
    // TAGS
    // =========================

    let tags = "";

    if (meal.strTags) {

        tags = meal.strTags
            .split(",")
            .map(
                tag =>
                    `<span class="tag">${tag.trim()}</span>`
            )
            .join("");

    }



    // =========================
    // BREADCRUMB
    // =========================

    breadcrumbMeal.textContent =
        meal.strMeal.toUpperCase();



    // =========================
    // DETAILS HTML
    // =========================

    detailsContainer.innerHTML = `

        <!-- =========================
             TOP DETAILS
        ========================= -->

        <div class="meal-details-content">


            <!-- MEAL IMAGE -->

            <div class="meal-details-image">

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                >

            </div>



            <!-- MEAL INFORMATION -->

            <div class="meal-details-info">

                <h2>
                    ${meal.strMeal}
                </h2>


                <div class="details-line"></div>


                <p>

                    <strong>
                        CATEGORY:
                    </strong>

                    ${meal.strCategory}

                </p>


                <p>

                    <strong>
                        Source:
                    </strong>

                    ${meal.strSource || "Not found"}

                </p>


                <div class="meal-tags-section">

                    <strong>
                        Tags:
                    </strong>


                    <div class="meal-tags">

                        ${tags}

                    </div>

                </div>



                <!-- =========================
                     INGREDIENTS
                ========================= -->

                <div class="ingredients-box">

                    <h3>
                        Ingredients
                    </h3>


                    <ol class="ingredients-list">

                        ${ingredients}

                    </ol>

                </div>

            </div>

        </div>



        <!-- =========================
             MEASURE
        ========================= -->

        <div class="measure-section">

            <h3>
                Measure:
            </h3>


            <div class="measure-box">

                <ol class="measures-list">

                    ${measurements}

                </ol>

            </div>

        </div>



        <!-- =========================
             INSTRUCTIONS
        ========================= -->

        <div class="instructions-section">

            <h3>
                Instructions:
            </h3>


            <ol class="instructions-list">

                ${instructions}

            </ol>

        </div>

    `;



    // =========================
    // PAGE STATE
    // =========================

    categoryDescriptionSection.style.display =
        "none";

    mealsSection.style.display =
        "none";

    detailsSection.style.display =
        "block";

    categoriesSection.style.display =
        "block";



    // =========================
    // SCROLL TO DETAILS
    // =========================

    detailsSection.scrollIntoView({
        behavior: "smooth"
    });

}



// =========================
// SHOW CATEGORY
// =========================

function showCategory(category) {

    categoryDescriptionSection.style.display =
        "block";

    mealsSection.style.display =
        "block";

    detailsSection.style.display =
        "none";



    categoryDescription.innerHTML = `

        <h3>
            ${category.strCategory}
        </h3>


        <p>
            ${category.strCategoryDescription}
        </p>

    `;



    mealsContainer.innerHTML = "";



    // =========================
    // GET CATEGORY MEALS
    // =========================

    fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
    )

        .then(response => response.json())

        .then(data => {

            if (!data.meals) {

                mealsContainer.innerHTML = `

                    <p class="no-results">
                        No any food found.
                    </p>

                `;

                return;

            }



            data.meals.forEach(meal => {

                const mealCard =
                    document.createElement("div");


                mealCard.className =
                    "meal-card";


                mealCard.innerHTML = `

                    <img
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >


                    <span class="meal-category">
                        ${category.strCategory}
                    </span>


                    <p class="meal-area">
                        Loading...
                    </p>


                    <h3>
                        ${meal.strMeal}
                    </h3>

                `;


                mealsContainer.appendChild(
                    mealCard
                );



                // =========================
                // GET FULL MEAL INFORMATION
                // =========================

                fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                )

                    .then(response => response.json())

                    .then(data => {

                        const mealDetails =
                            data.meals[0];


                        const areaElement =
                            mealCard.querySelector(
                                ".meal-area"
                            );


                        areaElement.textContent =
                            mealDetails.strArea ||
                            "Not found";



                        // =========================
                        // MEAL CLICK
                        // =========================

                        mealCard.addEventListener(
                            "click",
                            () => {

                                showMealDetails(
                                    mealDetails
                                );

                            }
                        );

                    });

            });



            mealsSection.scrollIntoView({
                behavior: "smooth"
            });

        });

}



// =========================
// LOAD CATEGORIES
// =========================

fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
)

    .then(response => response.json())

    .then(data => {

        data.categories.forEach(category => {


            // =========================
            // CATEGORY CARD
            // =========================

            const categoryCard =
                document.createElement("div");


            categoryCard.className =
                "category-card";


            categoryCard.innerHTML = `

                <img
                    src="${category.strCategoryThumb}"
                    alt="${category.strCategory}"
                >


                <h3>
                    ${category.strCategory}
                </h3>

            `;


            categoriesContainer.appendChild(
                categoryCard
            );



            // =========================
            // CATEGORY CLICK
            // =========================

            categoryCard.addEventListener(
                "click",
                () => {

                    showCategory(category);

                }
            );



            // =========================
            // SIDE MENU
            // =========================

            const sideMenuCategory =
                document.createElement("div");


            sideMenuCategory.textContent =
                category.strCategory;


            sideMenuCategories.appendChild(
                sideMenuCategory
            );


            sideMenuCategory.addEventListener(
                "click",
                () => {

                    showCategory(category);

                    sideMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

    });



// =========================
// SEARCH
// =========================

searchButton.addEventListener(
    "click",
    searchMeals
);



function searchMeals() {

    const foodName =
        searchInput.value.trim();


    if (foodName === "") {

        return;

    }



    categoryDescriptionSection.style.display =
        "none";

    mealsSection.style.display =
        "block";

    detailsSection.style.display =
        "none";


    mealsContainer.innerHTML = "";



    // =========================
    // SEARCH API
    // =========================

    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    )

        .then(response => response.json())

        .then(data => {


            if (!data.meals) {

                mealsContainer.innerHTML = `

                    <p class="no-results">
                        No any food found.
                    </p>

                `;

                return;

            }



            data.meals.forEach(meal => {

                const mealCard =
                    document.createElement("div");


                mealCard.className =
                    "meal-card";


                mealCard.innerHTML = `

                    <img
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >


                    <span class="meal-category">
                        ${meal.strCategory}
                    </span>


                    <p class="meal-area">
                        ${meal.strArea || "Not found"}
                    </p>


                    <h3>
                        ${meal.strMeal}
                    </h3>

                `;


                mealsContainer.appendChild(
                    mealCard
                );



                // =========================
                // CLICK MEAL
                // =========================

                mealCard.addEventListener(
                    "click",
                    () => {

                        fetch(
                            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                        )

                            .then(
                                response =>
                                    response.json()
                            )

                            .then(data => {

                                const mealDetails =
                                    data.meals[0];


                                showMealDetails(
                                    mealDetails
                                );

                            });

                    }
                );

            });

        });

}



// =========================
// ENTER KEY SEARCH
// =========================

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchMeals();

        }

    }
);



// =========================
// SIDE MENU OPEN
// =========================

menuButton.addEventListener(
    "click",
    () => {

        sideMenu.classList.add(
            "active"
        );

    }
);



// =========================
// SIDE MENU CLOSE
// =========================

closeMenu.addEventListener(
    "click",
    () => {

        sideMenu.classList.remove(
            "active"
        );

    }
);