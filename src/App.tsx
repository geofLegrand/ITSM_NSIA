import React, { useState, useMemo } from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppCard from './components/AppCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import InstallButton from './components/InstallButton';
import ITSMDashboard from './components/itsm/ITSMDashboard';
import UserLogin from './components/tracking/UserLogin';
import UserDashboard from './components/tracking/UserDashboard';
import { applications, categories } from './data/applications';

function App() {
  const [currentView, setCurrentView] = useState<'portal' | 'itsm' | 'user-login' | 'user-dashboard'>('portal');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesCategory = selectedCategory === 'Toutes' || app.category === selectedCategory;
      const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleUserLogin = (email: string) => {
    setUserEmail(email);
    setCurrentView('user-dashboard');
  };

  const handleUserLogout = () => {
    setUserEmail('');
    setCurrentView('portal');
  };

  // Vue de connexion utilisateur
  if (currentView === 'user-login') {
    return <UserLogin onLogin={handleUserLogin} onBackToPortal={() => setCurrentView('portal')} />;
  }

  // Vue dashboard utilisateur
  if (currentView === 'user-dashboard') {
    return <UserDashboard userEmail={userEmail} onLogout={handleUserLogout} />;
  }

  // Vue ITSM
  if (currentView === 'itsm') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white shadow-xl border-b-2 border-accent-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('portal')}
                className="flex items-center space-x-2 text-accent-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Retour au portail</span>
              </button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/Logo NSIA Assurances fond blanc.png" 
                  alt="NSIA Assurances" 
                  className="h-8 w-auto object-contain bg-white rounded-lg p-1"
                />
                <span className="text-accent-200 font-medium text-sm">NSIA Assurances</span>
              </div>
            </div>
          </div>
        </div>
        <ITSMDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50/20">
      <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-primary-500/10 to-accent-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
            {/* Logo principal */}
            <div className="flex justify-center mb-6">
              <img 
                src="/Logo NSIA Assurances VIE fond blanc.png" 
                alt="NSIA Assurances VIE" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-100 to-accent-50 px-4 py-2 rounded-full mb-4 border border-accent-200">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              <span className="text-accent-700 font-semibold text-sm">Plateforme IT Centralisée</span>
            </div>
            
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setCurrentView('itsm')}
                className="bg-gradient-to-r from-primary-950 to-primary-900 hover:from-accent-500 hover:to-accent-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-accent-500/20 hover:border-accent-400"
              >
                <div className="flex items-center space-x-2">
                  <span>🎫</span>
                  <span>Accéder à la Gestion ITSM</span>
                </div>
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setCurrentView('user-login')}
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-primary-950 hover:to-primary-900 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-primary-500/20 hover:border-primary-400"
              >
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Suivre mes demandes</span>
                </div>
              </button>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-900 via-primary-800 to-accent-600 bg-clip-text text-transparent mb-4">
              Services IT
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Accédez rapidement à tous les services informatiques de l'entreprise dans une interface moderne et intuitive
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Applications Grid */}
        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredApplications.map((app, index) => (
              <div
                key={app.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in-up"
              >
                <AppCard
                  title={app.title}
                  description={app.description}
                  icon={app.icon}
                  formUrl={app.formUrl}
                  category={app.category}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.084-2.327.414-.975 1.038-1.866 1.832-2.632A7.962 7.962 0 0112 9c2.34 0 4.47.881 6.084 2.327" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune application trouvée</h3>
            <p className="text-gray-500 max-w-md mx-auto">Aucun service IT ne correspond à votre recherche. Essayez de modifier les critères de recherche.</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-900 via-accent-500 to-primary-900"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-950 to-primary-900 bg-clip-text text-transparent mb-2">{applications.length}</div>
              <div className="text-gray-700 font-medium">Services IT disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent mb-2">{categories.length}</div>
              <div className="text-gray-700 font-medium">Catégories</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-950 to-accent-500 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Support disponible</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <InstallButton />
    </div>
  );
}

export default App;