import apiService from './apiService';

const authService = {
  async login(email, password) {
    return apiService.post('/users/login', { email, password });
  },

  async register(name, email, password) {
    return apiService.post('/users', { name, email, password });
  },

  async getProfile() {
    return apiService.get('/users/profile');
  },
};

export default authService;
