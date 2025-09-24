import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import recipeService from '../services/recipeService';
import Header from '../components/Header';
import Button from '../components/Button';
import RecipeCard from '../components/RecipeCard';
import { PlusIcon } from '@heroicons/react/24/solid';
import Spinner from '../components/Spinner';

const DashboardPage = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const allRecipes = await recipeService.getAll();
        const userRecipes = allRecipes.filter(recipe => recipe.authorId === user.id);
        setRecipes(userRecipes);
      } catch (err) {
        setError('Failed to fetch your recipes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user?.name}!</h1>
              <Button href="/create-recipe">
                <PlusIcon className="h-5 w-5 mr-2" />
                New Recipe
              </Button>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Recipes</h2>

            {loading && <Spinner />}
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {!loading && !error && (
              recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center bg-white p-12 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">No recipes yet!</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating your first recipe.</p>
                  <div className="mt-6">
                    <Button href="/create-recipe">
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                      Create Recipe
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
