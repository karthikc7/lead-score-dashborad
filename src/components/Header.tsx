import React from 'react';
import { Target, TrendingUp, Users } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LeadScore AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">ML-Powered Scoring</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};