import React, { useState } from 'react';
import { Lead } from '../types/Lead';
import { Mail, Phone, TrendingUp, TrendingDown, Calendar, Filter, ArrowUpDown } from 'lucide-react';

interface LeadTableProps {
  leads: Lead[];
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads }) => {
  const [sortBy, setSortBy] = useState<'rerankedScore' | 'initialScore' | 'timestamp'>('rerankedScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterScore, setFilterScore] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedLeads = leads
    .filter(lead => {
      if (filterScore === 'all') return true;
      if (filterScore === 'high') return lead.rerankedScore >= 70;
      if (filterScore === 'medium') return lead.rerankedScore >= 40 && lead.rerankedScore < 70;
      if (filterScore === 'low') return lead.rerankedScore < 40;
      return true;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'timestamp') {
        return multiplier * (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      }
      return multiplier * (a[sortBy] - b[sortBy]);
    });

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (initial: number, reranked: number) => {
    if (reranked > initial) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (reranked < initial) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="text-gray-400 mb-4">
          <Filter className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Leads Yet</h3>
        <p className="text-gray-600">Submit a lead using the form to see AI-powered scoring results</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-xl font-bold text-gray-900">Lead Scoring Results</h3>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterScore}
              onChange={(e) => setFilterScore(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Scores</option>
              <option value="high">High (70+)</option>
              <option value="medium">Medium (40-69)</option>
              <option value="low">Low (&lt;40)</option>
            </select>
            
            <span className="text-sm text-gray-600">
              {filteredAndSortedLeads.length} of {leads.length} leads
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Info
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('initialScore')}
              >
                <div className="flex items-center space-x-1">
                  <span>Initial Score</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('rerankedScore')}
              >
                <div className="flex items-center space-x-1">
                  <span>Final Score</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Comments
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{lead.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lead.phoneNumber}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(lead.initialScore)}`}>
                    {lead.initialScore}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(lead.rerankedScore)}`}>
                      {lead.rerankedScore}
                    </span>
                    {getScoreIcon(lead.initialScore, lead.rerankedScore)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    {lead.comments ? (
                      <p className="truncate" title={lead.comments}>
                        {lead.comments}
                      </p>
                    ) : (
                      <span className="text-gray-400 italic">No comments</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(lead.timestamp).toLocaleDateString()}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};