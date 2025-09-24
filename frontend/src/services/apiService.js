import config from '../constants.js';

const apiService = {
  authToken: null,

  setAuthToken(token) {
    this.authToken = token;
  },

  async request(endpoint, options = {}, isFormData = false) {
    const url = `${config.API_BASE_URL}/${config.APP_ID}${endpoint}`;
    
    const headers = { ...options.headers };
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'An API error occurred');
      }
      
      if (response.status === 204) return null;
      return response.json();
    } catch (error) {
      console.error('API Service Error:', error);
      throw error;
    }
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
  },

  postWithFile(endpoint, formData) {
    return this.request(endpoint, { method: 'POST', body: formData }, true);
  },

  put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

export default apiService;
