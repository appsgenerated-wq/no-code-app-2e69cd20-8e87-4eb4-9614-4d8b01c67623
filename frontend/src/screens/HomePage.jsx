import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { MagnifyingGlassIcon, CloudArrowUpIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const features = [
    {
      icon: <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />,
      title: 'Find Your Flavor',
      description: 'Easily search and filter thousands of recipes from a global community of home cooks.'
    },
    {
      icon: <CloudArrowUpIcon className="h-8 w-8 text-blue-600" />,
      title: 'Share Your Passion',
      description: 'Upload your own culinary creations with beautiful photos and step-by-step instructions.'
    },
    {
      icon: <BookOpenIcon className="h-8 w-8 text-blue-600" />,
      title: 'Cook with Confidence',
      description: 'Our clear, concise recipe format makes it easy for anyone to follow along and succeed in the kitchen.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero 
          title="Discover & Share Amazing Recipes"
          subtitle="Join a community of food lovers. Find your next favorite meal, or share your own culinary creations with the world."
          primaryAction={{ text: 'Explore Recipes', href: '/recipes' }}
          secondaryAction={{ text: 'Join for Free', href: '/register' }}
        />
        
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Everything You Need to Cook Better</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ready to Start Cooking?</h2>
                <p className="mt-4 text-xl text-gray-600">Create an account to save your favorite recipes and share your own.</p>
                <div className="mt-8">
                    <Button href="/register" size="lg">Get Started for Free</Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
