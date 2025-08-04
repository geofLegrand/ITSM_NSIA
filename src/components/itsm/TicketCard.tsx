import React from 'react';
import { 
  Clock, 
  User, 
  AlertTriangle, 
  CheckCircle, 
  Pause, 
  XCircle,
  MessageSquare,
  Calendar,
  Tag,
  ExternalLink,
  Eye
} from 'lucide-react';
import { ITSMTicket } from '../../types/itsm';

interface TicketCardProps {
  ticket: ITSMTicket;
  onViewDetails: (ticket: ITSMTicket) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onViewDetails }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return Clock;
      case 'In Progress': return AlertTriangle;
      case 'Pending': return Pause;
      case 'Resolved': return CheckCircle;
      case 'Closed': return XCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(ticket.status);
  const timeAgo = Math.floor((new Date().getTime() - ticket.updatedAt.getTime()) / (1000 * 60 * 60));

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-accent-300 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-950 to-primary-900 rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative p-3 bg-gradient-to-br from-primary-950 to-primary-900 rounded-lg">
                <StatusIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {ticket.ticketNumber}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-900 transition-colors mb-2">
                {ticket.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {ticket.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {ticket.sla.breached && (
              <div className="flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
                <AlertTriangle className="h-3 w-3" />
                <span>SLA Dépassé</span>
              </div>
            )}
            <button className="p-2 text-gray-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">{ticket.requester.name}</div>
              <div className="text-xs text-gray-500">{ticket.requester.department}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">{ticket.category}</div>
              <div className="text-xs text-gray-500">Catégorie</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {ticket.dueDate ? ticket.dueDate.toLocaleDateString('fr-FR') : 'Non définie'}
              </div>
              <div className="text-xs text-gray-500">Échéance</div>
            </div>
          </div>
        </div>

        {/* Assigné et commentaires */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {ticket.assignee && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-gray-700">Assigné à {ticket.assignee.name}</span>
              </div>
            )}
            
            {ticket.comments.length > 0 && (
              <div className="flex items-center space-x-1 text-gray-500">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{ticket.comments.length} commentaire(s)</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Mis à jour il y a {timeAgo}h
          </div>
        </div>

        {/* SLA Progress */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">SLA Résolution</span>
            <span className="text-sm text-gray-500">
              {Math.max(0, ticket.sla.resolutionTime - timeAgo)}h restantes
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                ticket.sla.breached 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : timeAgo / ticket.sla.resolutionTime > 0.8
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                    : 'bg-gradient-to-r from-green-500 to-green-600'
              }`}
              style={{ 
                width: `${Math.min(100, (timeAgo / ticket.sla.resolutionTime) * 100)}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{ticket.treatments.length} traitement(s)</span>
              <span>{ticket.evaluations.length} évaluation(s)</span>
            </div>
            <button
              onClick={() => onViewDetails(ticket)}
              className="flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>Voir détails</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;