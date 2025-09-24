import React, { useEffect, useState } from 'react';
import recipeService from '../services/recipeService';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await recipeService.getAll();
        setRecipes(data);
      } catch (err) {
        setError('Failed to fetch recipes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">Explore Recipes</h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Find inspiration for your next meal from our collection of delicious recipes.
                </p>
            </div>

            {loading && <div className="mt-12"><Spinner /></div>}
            {error && <p className="text-red-500 text-center mt-12">{error}</p>}

            {!loading && !error && (
                <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipesPage;
