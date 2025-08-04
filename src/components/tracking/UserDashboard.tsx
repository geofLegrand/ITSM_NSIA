import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Mail,
  Building
} from 'lucide-react';
import { UserSubmission, UserTrackingStats } from '../../types/userTracking';
import { mockUserSubmissions } from '../../data/mockUserSubmissions';
import SubmissionCard from './SubmissionCard';

interface UserDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userEmail, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [submissions, setSubmissions] = useState<UserSubmission[]>(mockUserSubmissions);

  // Filtrer les soumissions par email utilisateur
  const userSubmissions = useMemo(() => {
    return submissions.filter(submission => 
      submission.userEmail.toLowerCase() === userEmail.toLowerCase()
    );
  }, [userEmail, submissions]);

  // Filtrer par recherche et statut
  const filteredSubmissions = useMemo(() => {
    return userSubmissions.filter(submission => {
      const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           submission.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           submission.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || submission.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [userSubmissions, searchTerm, statusFilter]);

  // Calculer les statistiques
  const stats: UserTrackingStats = useMemo(() => {
    const total = userSubmissions.length;
    const pending = userSubmissions.filter(s => ['Submitted', 'Acknowledged', 'In Progress', 'Pending'].includes(s.status)).length;
    const resolved = userSubmissions.filter(s => ['Resolved', 'Closed'].includes(s.status)).length;
    const resolvedWithTime = userSubmissions.filter(s => s.actualResolution);
    const avgResolution = resolvedWithTime.length > 0 
      ? resolvedWithTime.reduce((acc, s) => {
          const time = (s.actualResolution!.getTime() - s.submissionDate.getTime()) / (1000 * 60 * 60);
          return acc + time;
        }, 0) / resolvedWithTime.length
      : 0;
    
    return {
      totalSubmissions: total,
      pendingSubmissions: pending,
      resolvedSubmissions: resolved,
      averageResolutionTime: Math.round(avgResolution),
      lastSubmissionDate: userSubmissions.length > 0 
        ? new Date(Math.max(...userSubmissions.map(s => s.submissionDate.getTime())))
        : undefined
    };
  }, [userSubmissions]);

  // Fonction pour envoyer un message
  const handleSendMessage = async (submissionId: string, message: string) => {
    const newComment = {
      id: `msg-${Date.now()}`,
      author: userSubmissions.find(s => s.id === submissionId)?.userName || 'Utilisateur',
      authorType: 'user' as const,
      content: message,
      timestamp: new Date(),
      isVisible: true
    };

    setSubmissions(prevSubmissions => 
      prevSubmissions.map(submission => 
        submission.id === submissionId
          ? {
              ...submission,
              comments: [...submission.comments, newComment],
              lastUpdateDate: new Date()
            }
          : submission
      )
    );

    // Simulation d'une réponse automatique de l'équipe IT (optionnel)
    setTimeout(() => {
      const autoReply = {
        id: `auto-${Date.now()}`,
        author: 'Système IT',
        authorType: 'it_staff' as const,
        content: 'Votre message a bien été reçu. Un technicien vous répondra dans les plus brefs délais.',
        timestamp: new Date(),
        isVisible: true
      };

      setSubmissions(prevSubmissions => 
        prevSubmissions.map(submission => 
          submission.id === submissionId
            ? {
                ...submission,
                comments: [...submission.comments, autoReply],
                lastUpdateDate: new Date()
              }
            : submission
        )
      );
    }, 2000);
  };
  const statuses = ['All', 'Submitted', 'Acknowledged', 'In Progress', 'Pending', 'Resolved', 'Closed'];

  // Obtenir les informations utilisateur depuis la première soumission
  const userInfo = userSubmissions.length > 0 ? userSubmissions[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white shadow-xl border-b-2 border-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-accent-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
              <div className="h-6 w-px bg-accent-500"></div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="/Logo NSIA Assurances fond blanc.png" 
                    alt="NSIA Assurances" 
                    className="h-8 w-auto object-contain bg-white rounded-lg p-1"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-accent-100 bg-clip-text text-transparent">
                    Mes Demandes IT
                  </h1>
                  <p className="text-accent-200 font-medium text-sm">Suivi de vos demandes</p>
                </div>
              </div>
            </div>
            
            {userInfo && (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 border border-white/20">
                  <User className="h-5 w-5 text-accent-500" />
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {userInfo.userName}
                    </div>
                    <div className="text-xs text-accent-200">
                      {userInfo.department}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</div>
                <div className="text-sm text-gray-600 font-medium">Total demandes</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary-950 to-primary-900 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-accent-600">{stats.pendingSubmissions}</div>
                <div className="text-sm text-gray-600 font-medium">En cours</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.resolvedSubmissions}</div>
                <div className="text-sm text-gray-600 font-medium">Résolues</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.averageResolutionTime}h</div>
                <div className="text-sm text-gray-600 font-medium">Temps moyen</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Informations utilisateur */}
        {userInfo && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Vos informations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{userInfo.userName}</div>
                  <div className="text-xs text-gray-500">Nom complet</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{userInfo.userEmail}</div>
                  <div className="text-xs text-gray-500">Email</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{userInfo.department}</div>
                  <div className="text-xs text-gray-500">Département</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher dans vos demandes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'Tous les statuts' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Liste des demandes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Vos demandes ({filteredSubmissions.length})
            </h2>
            {stats.lastSubmissionDate && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Dernière demande: {stats.lastSubmissionDate.toLocaleDateString('fr-FR')}</span>
              </div>
            )}
          </div>
          
          {filteredSubmissions.length > 0 ? (
            <div className="space-y-4">
              {filteredSubmissions
                .sort((a, b) => b.submissionDate.getTime() - a.submissionDate.getTime())
                .map((submission) => (
                  <SubmissionCard 
                    key={submission.id} 
                    submission={submission} 
                    onSendMessage={handleSendMessage}
                    currentUserEmail={userEmail}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="text-gray-400 mb-4">
                <Search className="mx-auto h-16 w-16" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {userSubmissions.length === 0 ? 'Aucune demande trouvée' : 'Aucun résultat'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {userSubmissions.length === 0 
                  ? 'Vous n\'avez pas encore soumis de demande IT.'
                  : 'Aucune demande ne correspond aux critères de recherche sélectionnés.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;