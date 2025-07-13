import React, { useState, useEffect } from 'react';
import { LeadForm } from './components/LeadForm';
import { LeadTable } from './components/LeadTable';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { Lead } from './types/Lead';
import { BrainCircuit } from 'lucide-react';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load leads from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, []);

  // Save leads to localStorage whenever leads change
  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const handleNewLead = async (leadData: Omit<Lead, 'id' | 'initialScore' | 'rerankedScore' | 'timestamp'>) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      initialScore: calculateInitialScore(leadData),
      rerankedScore: 0,
      timestamp: new Date().toISOString()
    };
    
    // Apply re-ranking
    newLead.rerankedScore = applyReranking(newLead.initialScore, leadData.comments);
    
    setLeads(prev => [newLead, ...prev]);
    setIsLoading(false);
  };

  const calculateInitialScore = (leadData: Omit<Lead, 'id' | 'initialScore' | 'rerankedScore' | 'timestamp'>) => {
    // Simulate ML model scoring based on multiple factors
    let score = 50; // Base score
    
    // Credit Score influence (30% weight)
    const creditScore = leadData.creditScore;
    if (creditScore >= 750) score += 25;
    else if (creditScore >= 650) score += 15;
    else if (creditScore >= 550) score += 5;
    else score -= 10;
    
    // Income influence (25% weight)
    const income = leadData.income;
    if (income >= 800000) score += 20;
    else if (income >= 500000) score += 15;
    else if (income >= 300000) score += 10;
    else if (income >= 150000) score += 5;
    else score -= 5;
    
    // Age Group influence (20% weight)
    const ageGroup = leadData.ageGroup;
    if (ageGroup === '26-35' || ageGroup === '36-50') score += 15;
    else if (ageGroup === '18-25') score += 10;
    else score += 5;
    
    // Family Background influence (15% weight)
    const familyBackground = leadData.familyBackground;
    if (familyBackground === 'Married with Kids') score += 12;
    else if (familyBackground === 'Married') score += 8;
    else score += 3;
    
    // Employment Status influence (10% weight)
    const employment = leadData.employmentStatus;
    if (employment === 'Employed - Full Time') score += 8;
    else if (employment === 'Self Employed') score += 6;
    else if (employment === 'Employed - Part Time') score += 4;
    else score -= 2;
    
    // Ensure score is within bounds
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const applyReranking = (initialScore: number, comments: string) => {
    let adjustedScore = initialScore;
    const lowerComments = comments.toLowerCase();
    
    // Positive keywords
    const positiveKeywords = {
      'urgent': 15,
      'immediately': 12,
      'asap': 10,
      'ready': 8,
      'interested': 5,
      'buying': 12,
      'purchase': 10,
      'invest': 8,
      'serious': 7,
      'committed': 9
    };
    
    // Negative keywords
    const negativeKeywords = {
      'not interested': -20,
      'maybe': -8,
      'thinking': -5,
      'later': -10,
      'budget': -3,
      'expensive': -7,
      'wait': -6,
      'consider': -4,
      'unsure': -8
    };
    
    // Apply positive adjustments
    Object.entries(positiveKeywords).forEach(([keyword, adjustment]) => {
      if (lowerComments.includes(keyword)) {
        adjustedScore += adjustment;
      }
    });
    
    // Apply negative adjustments
    Object.entries(negativeKeywords).forEach(([keyword, adjustment]) => {
      if (lowerComments.includes(keyword)) {
        adjustedScore += adjustment;
      }
    });
    
    // Ensure score is within bounds
    return Math.max(0, Math.min(100, Math.round(adjustedScore)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BrainCircuit className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Lead Scoring Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced machine learning model with LLM-inspired re-ranking to predict lead intent and prioritize high-value prospects
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <LeadForm onSubmit={handleNewLead} isLoading={isLoading} />
          </div>
          
          <div className="lg:col-span-2">
            <Dashboard leads={leads} />
            <div className="mt-8">
              <LeadTable leads={leads} />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 AI Lead Scoring Dashboard. Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;