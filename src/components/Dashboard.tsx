import React from 'react';
import { Lead } from '../types/Lead';
import { TrendingUp, Users, Target, Award } from 'lucide-react';

interface DashboardProps {
  leads: Lead[];
}

export const Dashboard: React.FC<DashboardProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const averageScore = totalLeads > 0 ? Math.round(leads.reduce((sum, lead) => sum + lead.rerankedScore, 0) / totalLeads) : 0;
  const highQualityLeads = leads.filter(lead => lead.rerankedScore >= 70).length;
  const conversionRate = totalLeads > 0 ? Math.round((highQualityLeads / totalLeads) * 100) : 0;

  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads.toString(),
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Average Score',
      value: averageScore.toString(),
      icon: Target,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'High Quality',
      value: highQualityLeads.toString(),
      icon: Award,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Quality Rate',
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
          </div>
          
          {index === 1 && totalLeads > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${averageScore}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};