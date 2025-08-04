import React from 'react';
import { ExternalLink, DivideIcon as LucideIcon, ArrowRight } from 'lucide-react';

interface AppCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  formUrl: string;
  category: string;
}

const AppCard: React.FC<AppCardProps> = ({ title, description, icon: Icon, formUrl, category }) => {
  const handleClick = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in border border-gray-200 hover:border-accent-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative p-3 bg-gradient-to-br from-primary-950 to-primary-900 rounded-xl group-hover:from-accent-500 group-hover:to-accent-600 transition-all duration-300 shadow-lg">
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold text-accent-700 bg-gradient-to-r from-accent-100 to-accent-50 rounded-full mb-2 border border-accent-200">
                {category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-900 transition-colors leading-tight">
                {title}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 group-hover:text-accent-600 transition-colors">
            <ExternalLink className="h-4 w-4" />
            <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        <button
          onClick={handleClick}
          className="relative w-full bg-gradient-to-r from-primary-950 to-primary-900 hover:from-accent-500 hover:to-accent-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 shadow-lg hover:shadow-xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center space-x-2">
            <span>Accéder à l'application</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default AppCard;