import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
          <AppNavigator />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
