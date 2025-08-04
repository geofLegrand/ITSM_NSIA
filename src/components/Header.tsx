import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white shadow-xl border-b-2 border-accent-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/Logo NSIA Assurances fond blanc.png" 
                alt="NSIA Assurances" 
                className="h-10 w-auto object-contain bg-white rounded-lg p-1"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-accent-100 bg-clip-text text-transparent">
                Portail IT
              </h1>
              <p className="text-sm text-accent-200 font-medium">Services informatiques</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent-500 rounded-full border-2 border-primary-900"></span>
              </button>
              
              <div className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg border border-white/20">
                <User className="h-5 w-5 text-accent-500" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">
                    Admin IT
                  </div>
                  <div className="text-xs text-accent-200">
                    Département IT
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 border border-white/20"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
    </header>
  );
};

export default Header;