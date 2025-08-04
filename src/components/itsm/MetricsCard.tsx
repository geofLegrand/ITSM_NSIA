import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, icon: Icon, color, change }) => {
  const isPositive = change.startsWith('+');
  const isNegative = change.startsWith('-');
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-accent-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition-opacity`}></div>
            <div className={`relative p-3 bg-gradient-to-br ${color} rounded-lg shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-100 text-green-800' :
            isNegative ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {change}
          </div>
        </div>
        
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-600 font-medium">
          {title}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;