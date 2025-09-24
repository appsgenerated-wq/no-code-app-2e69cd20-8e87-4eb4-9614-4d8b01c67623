import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              FoodieApp
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/recipes" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Explore</Link>
            {user && <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">My Recipes</Link>}
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700 text-sm font-medium hidden sm:block">Hi, {user.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
