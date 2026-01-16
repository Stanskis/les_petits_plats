'use client';
import { useState } from "react";
import Header from "@/components/Header/Header";
import IngredientFilter from "@/components/RecipeFilters/IngredientFilter";
import ApplianceFilter from "@/components/RecipeFilters/ApplianceFilter";
import UstensilFilter from "@/components/RecipeFilters/UstensilFilter";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import recipes from "@/data/recipes.json";
import Footer from "@/components/Footer/Footer";




export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [selectedUstensils, setSelectedUstensils] = useState([]);

  const handleSearch = () => {
    setSubmittedTerm(searchTerm);
    setSelectedIngredients([]);
    setSelectedAppliances([]);
    setSelectedUstensils([]);
  };

  const handleIngredientsChange = (ingredients) => {
    setSelectedIngredients(ingredients);
    setSubmittedTerm("");
    setSearchTerm("");
  };

  const handleAppliancesChange = (appliances) => {
    setSelectedAppliances(appliances);
    setSubmittedTerm("");
    setSearchTerm("");
  };

  const handleUstensilsChange = (ustensils) => {
    setSelectedUstensils(ustensils);
    setSubmittedTerm("");
    setSearchTerm("");
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (selectedIngredients.length > 0) {
      const matchIngredients = selectedIngredients.every(selectedIng =>
        recipe.ingredients.some(i =>
          i.ingredient.toLowerCase().trim() === selectedIng.toLowerCase().trim()
        )
      );
      if (!matchIngredients) return false;
    }

    if (selectedAppliances.length > 0) {
      const matchAppliances = selectedAppliances.some(app =>
        recipe.appliance?.toLowerCase().trim() === app.toLowerCase().trim()
      );
      if (!matchAppliances) return false;
    }

    if (selectedUstensils.length > 0) {
      const matchUstensils = selectedUstensils.every(ust =>
        recipe.ustensils?.some(u =>
          u.toLowerCase().trim() === ust.toLowerCase().trim()
        )
      );
      if (!matchUstensils) return false;
    }

    if (submittedTerm.length >= 3) {
      const lowerTerm = submittedTerm.toLowerCase();
      return (
        recipe.name.toLowerCase().includes(lowerTerm) ||
        recipe.description?.toLowerCase().includes(lowerTerm) ||
        recipe.ingredients.some(i =>
          i.ingredient.toLowerCase().includes(lowerTerm)
        )
      );
    }

    return true;
  });

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <main>
        {/* Filters and Recipe Count */}
        <section className="max-w-[1400px] mx-auto px-8 mt-10 flex justify-between gap-8">
          <div className="filters flex gap-16">
            <IngredientFilter
              data={recipes}
              selectedIngredients={selectedIngredients}
              onIngredientsChange={handleIngredientsChange}
            />
            <ApplianceFilter
              data={recipes}
              selectedAppliances={selectedAppliances}
              onAppliancesChange={handleAppliancesChange}
            />
            <UstensilFilter
              data={recipes}
              selectedUstensils={selectedUstensils}
              onUstensilsChange={handleUstensilsChange}
            />
          </div>
          <div>
            <p className="font-anton text-xl mt-5 mr-10">{filteredRecipes.length} {filteredRecipes.length > 1 ? 'recettes' : 'recette'}</p>
          </div>
        </section>

        {/* Recipe Cards */}
        <section className="max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8  my-8 mx-auto">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              img={`/images/JSON_recipes/${recipe.image}`}
              title={recipe.name}
              description={recipe.description}
              ingredients={recipe.ingredients}
              time={recipe.time}
              slug={recipe.slug}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}