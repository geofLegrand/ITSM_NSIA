import React, { useState, useMemo } from 'react';
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Filter,
  Search,
  Calendar,
  User,
  Tag,
  Upload
} from 'lucide-react';
import { ITSMTicket } from '../../types/itsm';
import { mockTickets, mockMetrics } from '../../data/mockTickets';
import TicketCard from './TicketCard';
import MetricsCard from './MetricsCard';
import TicketFilters from './TicketFilters';
import ExcelImporter from '../excel/ExcelImporter';
import TicketDetailModal from './TicketDetailModal';

const ITSMDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<ITSMTicket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showExcelImporter, setShowExcelImporter] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ITSMTicket | null>(null);

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.requester.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'All' || ticket.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const metrics = [
    {
      title: 'Total Tickets',
      value: mockMetrics.totalTickets,
      icon: Ticket,
      color: 'from-primary-950 to-primary-900',
      change: '+12%'
    },
    {
      title: 'Tickets Ouverts',
      value: mockMetrics.openTickets,
      icon: Clock,
      color: 'from-accent-500 to-accent-600',
      change: '-5%'
    },
    {
      title: 'Résolus Aujourd\'hui',
      value: mockMetrics.resolvedToday,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      change: '+18%'
    },
    {
      title: 'Tickets Critiques',
      value: mockMetrics.criticalTickets,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      change: '0%'
    },
    {
      title: 'Temps Résolution Moyen',
      value: `${mockMetrics.averageResolutionTime}h`,
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      change: '-8%'
    },
    {
      title: 'Conformité SLA',
      value: `${mockMetrics.slaCompliance}%`,
      icon: CheckCircle,
      color: 'from-emerald-500 to-emerald-600',
      change: '+2%'
    }
  ];
  const handleExcelImport = (newTickets: ITSMTicket[]) => {
    setTickets(prevTickets => [...newTickets, ...prevTickets]);
    setShowExcelImporter(false);
  };

  const handleViewTicketDetails = (ticket: ITSMTicket) => {
    setSelectedTicket(ticket);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<ITSMTicket>) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, ...updates }
          : ticket
      )
    );
    
    // Mettre à jour le ticket sélectionné si c'est celui qui est modifié
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, ...updates } : null);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white shadow-xl border-b-2 border-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/Logo NSIA Assurances fond blanc.png" 
                  alt="NSIA Assurances" 
                  className="h-10 w-auto object-contain bg-white rounded-lg p-1"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-accent-500 rounded-lg blur-sm opacity-50"></div>
                <Ticket className="relative h-8 w-8 text-accent-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-accent-100 bg-clip-text text-transparent">
                  Gestion des Activités ITSM
                </h1>
                <p className="text-accent-200 font-medium">NSIA Assurances - Tableau de bord des tickets et incidents</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-accent-200">Dernière mise à jour</div>
                <div className="text-white font-medium">{new Date().toLocaleTimeString('fr-FR')}</div>
              </div>
              <button
                onClick={() => setShowExcelImporter(true)}
                className="flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Upload className="h-4 w-4" />
                <span>Importer Excel</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métriques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricsCard key={index} {...metric} />
          ))}
        </div>

        {/* Barre de recherche */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par numéro de ticket, titre ou demandeur..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              />
            </div>
            <TicketFilters
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              categoryFilter={categoryFilter}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              onCategoryChange={setCategoryFilter}
            />
          </div>
        </div>

        {/* Liste des tickets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Tickets ({filteredTickets.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Mis à jour en temps réel</span>
            </div>
          </div>
          
          {filteredTickets.length > 0 ? (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onViewDetails={handleViewTicketDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
              <Ticket className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun ticket trouvé</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Aucun ticket ne correspond aux critères de recherche sélectionnés.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Excel Importer Modal */}
      {showExcelImporter && (
        <ExcelImporter
          onImportSuccess={handleExcelImport}
          onClose={() => setShowExcelImporter(false)}
        />
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdateTicket={handleUpdateTicket}
        />
      )}
    </div>
  );
};

export default ITSMDashboard;