import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import recipeService from '../services/recipeService';
import { useAuth } from '../context/AuthContext';

const CreateRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('instructions', instructions);
    formData.append('prepTime', prepTime);
    formData.append('cookTime', cookTime);
    formData.append('servings', servings);
    formData.append('authorId', user.id);
    
    const ingredientsArray = ingredients.split('\n').filter(ing => ing.trim() !== '');
    ingredientsArray.forEach(ing => formData.append('ingredients[]', ing));
    
    if (image) {
      formData.append('imageUrl', image);
    }

    try {
      await recipeService.create(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create recipe. Please check your inputs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Create a New Recipe</h1>
            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

            <Input label="Recipe Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients (one per line)</label>
              <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} rows="5" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
              <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows="8" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input label="Prep Time (mins)" type="number" value={prepTime} onChange={e => setPrepTime(e.target.value)} />
              <Input label="Cook Time (mins)" type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} />
              <Input label="Servings" type="number" value={servings} onChange={e => setServings(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Image</label>
              <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading} size="lg">
                {loading ? 'Submitting...' : 'Submit Recipe'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateRecipePage;
