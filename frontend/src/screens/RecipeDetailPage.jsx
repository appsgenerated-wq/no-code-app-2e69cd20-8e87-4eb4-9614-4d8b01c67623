import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeService from '../services/recipeService';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import config from '../constants.js';
import { ClockIcon, UsersIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await recipeService.getById(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to fetch recipe details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!recipe) return <div className="min-h-screen flex items-center justify-center">Recipe not found.</div>;

  const imageUrl = recipe.imageUrl ? `${config.BACKEND_URL}${recipe.imageUrl}` : 'https://via.placeholder.com/1200x600?text=Delicious+Food';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/recipes" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Recipes
          </Link>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={imageUrl} alt={recipe.title} className="w-full h-96 object-cover" />
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>
              
              <div className="flex items-center space-x-8 mb-8 border-t border-b border-gray-200 py-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <ClockIcon className="h-6 w-6 text-gray-500" />
                  <div>
                    <span className="block text-sm font-medium">Prep Time</span>
                    <span className="block text-sm">{recipe.prepTime || 'N/A'} mins</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ClockIcon className="h-6 w-6 text-gray-500" />
                  <div>
                    <span className="block text-sm font-medium">Cook Time</span>
                    <span className="block text-sm">{recipe.cookTime || 'N/A'} mins</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <UsersIcon className="h-6 w-6 text-gray-500" />
                  <div>
                    <span className="block text-sm font-medium">Servings</span>
                    <span className="block text-sm">{recipe.servings || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
                      </ul>
                  </div>
                  <div className="md:col-span-2">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
                      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                        {recipe.instructions}
                      </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetailPage;
