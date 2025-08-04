import React from 'react';
import { Download } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

const InstallButton: React.FC = () => {
  const { isInstallable, installPWA } = usePWA();

  if (!isInstallable) return null;

  return (
    <button
      onClick={installPWA}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 border-2 border-white/20 backdrop-blur-sm"
      title="Installer l'application"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <Download className="h-6 w-6" />
    </button>
  );
};

export default InstallButton;