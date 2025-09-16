async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const recipesGrid = document.getElementById("recipesGrid");
  const loading = document.getElementById("loading");
//conditions
  if (!query) {
    recipesGrid.innerHTML = "<p>Please enter a recipe name.</p>";
    return;
  }

  recipesGrid.innerHTML = "";
  loading.style.display = "block";
//exception
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    loading.style.display = "none";
 
    if (data.meals) {
      recipesGrid.innerHTML = data.meals.map(recipe => `
        <div class="recipe-card">
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          <h3>${recipe.strMeal}</h3>
          <p><strong>Category:</strong> ${recipe.strCategory}</p>
          <a href="${recipe.strSource || recipe.strYoutube}" target="_blank">View Recipe</a>
        </div>
      `).join("");
    } else {
      recipesGrid.innerHTML = "<p>No recipes found. Try another search.</p>";
    }

  } catch (error) {
    loading.style.display = "none";
    recipesGrid.innerHTML = "<p>Error fetching recipes. Please try again.</p>";
    console.error("Error:", error);
  }
}
