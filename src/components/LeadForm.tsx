import React, { useState } from 'react';
import { Send, Loader2, Shield } from 'lucide-react';
import { Lead } from '../types/Lead';

interface LeadFormProps {
  onSubmit: (lead: Omit<Lead, 'id' | 'initialScore' | 'rerankedScore' | 'timestamp'>) => void;
  isLoading: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    creditScore: 650,
    ageGroup: '26-35',
    familyBackground: 'Single',
    income: 500000,
    employmentStatus: 'Employed - Full Time',
    comments: '',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^\+91-\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone must be in format +91-XXXXXXXXXX';
    }
    
    // Credit score validation
    if (formData.creditScore < 300 || formData.creditScore > 850) {
      newErrors.creditScore = 'Credit score must be between 300-850';
    }
    
    // Income validation
    if (formData.income < 0) {
      newErrors.income = 'Income must be positive';
    }
    
    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must consent to data processing';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        email: '',
        phoneNumber: '',
        creditScore: 650,
        ageGroup: '26-35',
        familyBackground: 'Single',
        income: 500000,
        employmentStatus: 'Employed - Full Time',
        comments: '',
        consent: false
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lead Information</h2>
        <p className="text-gray-600">Enter lead details for AI-powered intent scoring</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john.doe@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+91-9876543210"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Credit Score *
          </label>
          <input
            type="number"
            min="300"
            max="850"
            value={formData.creditScore}
            onChange={(e) => handleChange('creditScore', parseInt(e.target.value))}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.creditScore ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.creditScore && <p className="text-red-500 text-sm mt-1">{errors.creditScore}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Age Group *
          </label>
          <select
            value={formData.ageGroup}
            onChange={(e) => handleChange('ageGroup', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-50">36-50</option>
            <option value="51+">51+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Family Background *
          </label>
          <select
            value={formData.familyBackground}
            onChange={(e) => handleChange('familyBackground', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Married with Kids">Married with Kids</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Annual Income (INR) *
          </label>
          <input
            type="number"
            min="0"
            value={formData.income}
            onChange={(e) => handleChange('income', parseInt(e.target.value))}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.income ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="500000"
          />
          {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employment Status *
          </label>
          <select
            value={formData.employmentStatus}
            onChange={(e) => handleChange('employmentStatus', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="Employed - Full Time">Employed - Full Time</option>
            <option value="Employed - Part Time">Employed - Part Time</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Comments
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Additional comments about lead intent (e.g., 'urgent need', 'ready to purchase', 'just browsing')"
          />
          <p className="text-sm text-gray-500 mt-1">
            Keywords like "urgent", "ready", "interested" will boost the score
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => handleChange('consent', e.target.checked)}
            className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 rounded ${
              errors.consent ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <label htmlFor="consent" className="text-sm text-gray-700 flex items-start">
            <Shield className="h-4 w-4 text-blue-600 mr-1 mt-0.5 flex-shrink-0" />
            I consent to data processing for lead scoring purposes. This is dummy data for demonstration only.
          </label>
        </div>
        {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing Lead...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Score Lead with AI</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};