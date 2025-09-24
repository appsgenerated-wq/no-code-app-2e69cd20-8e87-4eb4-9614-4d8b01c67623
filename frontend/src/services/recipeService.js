import apiService from './apiService';

const recipeService = {
  getAll() {
    return apiService.get('/recipes');
  },

  getById(id) {
    return apiService.get(`/recipes/${id}`);
  },

  create(formData) {
    return apiService.postWithFile('/recipes', formData);
  },

  update(id, recipeData) {
    return apiService.put(`/recipes/${id}`, recipeData);
  },

  delete(id) {
    return apiService.delete(`/recipes/${id}`);
  },
};

export default recipeService;
