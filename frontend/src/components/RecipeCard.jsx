import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, UsersIcon } from '@heroicons/react/24/outline';
import config from '../constants.js';

const RecipeCard = ({ recipe }) => {
  const imageUrl = recipe.imageUrl ? `${config.BACKEND_URL}${recipe.imageUrl}` : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <Link to={`/recipes/${recipe.id}`} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img src={imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{recipe.description}</p>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
