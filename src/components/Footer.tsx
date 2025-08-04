import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white mt-16 border-t-2 border-accent-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="relative">
              <img 
                src="/Logo NSIA Assurances fond blanc.png" 
                alt="NSIA Assurances" 
                className="h-8 w-auto object-contain bg-white rounded-lg p-1"
              />
            </div>
            <span className="text-sm font-medium">© 2025 NSIA Assurances - Tous droits réservés</span>
          </div>
          <div className="text-sm text-accent-200 font-medium bg-white/10 px-3 py-1 rounded-full">
            Version 1.0.0 - Services IT
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
    </footer>
  );
};

export default Footer;