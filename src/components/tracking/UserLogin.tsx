import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

interface UserLoginProps {
  onLogin: (email: string) => void;
  onBackToPortal: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onLogin, onBackToPortal }) => {
  const [email, setEmail] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsLoading(true);
    // Simulation d'une vérification
    setTimeout(() => {
      onLogin(email.toLowerCase().trim());
      setIsLoading(false);
    }, 1000);
  };

  const demoEmails = [
    'marie.dubois@nsia.com',
    'pierre.leroy@nsia.com'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white p-6 text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/Logo NSIA Assurances fond blanc.png" 
                alt="NSIA Assurances" 
                className="h-12 w-auto object-contain bg-white rounded-lg p-2"
              />
            </div>
            <h1 className="text-xl font-bold mb-2">Suivi de vos demandes IT</h1>
            <p className="text-accent-200 text-sm">Connectez-vous avec votre adresse email</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email professionnelle
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@nsia.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-gradient-to-r from-primary-950 to-primary-900 hover:from-accent-500 hover:to-accent-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Accéder à mes demandes</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-accent-600 transition-colors"
              >
                {showDemo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showDemo ? 'Masquer' : 'Voir'} les comptes de démonstration</span>
              </button>
              
              {showDemo && (
                <div className="mt-3 space-y-2">
                  {demoEmails.map((demoEmail) => (
                    <button
                      key={demoEmail}
                      onClick={() => setEmail(demoEmail)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-accent-50 hover:text-accent-800 rounded-lg transition-all border border-gray-200 hover:border-accent-300"
                    >
                      {demoEmail}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Vous n'avez pas encore fait de demande ?</p>
          <p className="mt-1">Retournez au <button onClick={onBackToPortal} className="text-accent-600 font-medium hover:text-accent-800 underline transition-colors">portail principal</button> pour soumettre une nouvelle demande.</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;