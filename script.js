const categoriesContainer = document.getElementById("categories-container");

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

            categoryCard.addEventListener("click", () => {

                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });

            });

        });

    });