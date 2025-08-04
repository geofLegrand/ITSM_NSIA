import React, { useState } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  MessageSquare,
  Settings,
  TrendingUp,
  Eye,
  Send,
  Wrench,
  ClipboardList
} from 'lucide-react';
import { ITSMTicket, ITSMTreatment, ITSMEvaluation } from '../../types/itsm';
import MessageThread from '../tracking/MessageThread';

interface TicketDetailModalProps {
  ticket: ITSMTicket;
  onClose: () => void;
  onUpdateTicket: (ticketId: string, updates: Partial<ITSMTicket>) => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ 
  ticket, 
  onClose, 
  onUpdateTicket 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'treatments' | 'evaluations' | 'chat'>('overview');
  const [newTreatment, setNewTreatment] = useState({
    action: '',
    description: '',
    status: 'Planned' as const,
    duration: ''
  });
  const [newEvaluation, setNewEvaluation] = useState({
    type: 'Progress' as const,
    severity: 'Medium' as const,
    impact: 'Medium' as const,
    urgency: 'Medium' as const,
    riskAssessment: '',
    recommendations: ''
  });

  const handleSendMessage = (ticketId: string, message: string) => {
    const newComment = {
      id: `msg-${Date.now()}`,
      author: 'Équipe IT',
      authorType: 'it_staff' as const,
      content: message,
      timestamp: new Date(),
      isInternal: false
    };

    onUpdateTicket(ticketId, {
      comments: [...ticket.comments, newComment],
      updatedAt: new Date()
    });
  };

  const handleAddTreatment = () => {
    if (!newTreatment.action || !newTreatment.description) return;

    const treatment: ITSMTreatment = {
      id: `t-${Date.now()}`,
      treatmentDate: new Date(),
      technician: ticket.assignee?.name || 'Équipe IT',
      action: newTreatment.action,
      description: newTreatment.description,
      status: newTreatment.status,
      duration: newTreatment.duration ? parseInt(newTreatment.duration) : undefined
    };

    onUpdateTicket(ticket.id, {
      treatments: [...ticket.treatments, treatment],
      updatedAt: new Date()
    });

    setNewTreatment({
      action: '',
      description: '',
      status: 'Planned',
      duration: ''
    });
  };

  const handleAddEvaluation = () => {
    if (!newEvaluation.riskAssessment) return;

    const evaluation: ITSMEvaluation = {
      id: `e-${Date.now()}`,
      evaluationDate: new Date(),
      evaluator: ticket.assignee?.name || 'Équipe IT',
      type: newEvaluation.type,
      severity: newEvaluation.severity,
      impact: newEvaluation.impact,
      urgency: newEvaluation.urgency,
      riskAssessment: newEvaluation.riskAssessment,
      recommendations: newEvaluation.recommendations.split('\n').filter(r => r.trim()),
      followUpRequired: newEvaluation.type !== 'Final'
    };

    onUpdateTicket(ticket.id, {
      evaluations: [...ticket.evaluations, evaluation],
      updatedAt: new Date()
    });

    setNewEvaluation({
      type: 'Progress',
      severity: 'Medium',
      impact: 'Medium',
      urgency: 'Medium',
      riskAssessment: '',
      recommendations: ''
    });
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTreatmentStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-950 to-primary-900 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src="/Logo NSIA Assurances fond blanc.png" 
                  alt="NSIA Assurances" 
                  className="h-8 w-auto object-contain bg-white rounded-lg p-1"
                />
                <span className="text-accent-200 font-medium text-sm">NSIA Assurances - ITSM</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-mono bg-white/20 px-2 py-1 rounded">
                  {ticket.ticketNumber}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              <h2 className="text-xl font-bold">{ticket.title}</h2>
              <p className="text-accent-200 text-sm mt-1">
                Créé le {ticket.createdAt.toLocaleDateString('fr-FR')} par {ticket.requester.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Eye },
              { id: 'treatments', label: 'Traitements SMQ', icon: Wrench },
              { id: 'evaluations', label: 'Évaluations', icon: ClipboardList },
              { id: 'chat', label: 'Chat Utilisateur', icon: MessageSquare }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-accent-500 text-accent-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{ticket.description}</p>
              </div>

              {/* Informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Demandeur</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{ticket.requester.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">{ticket.requester.email}</div>
                    <div className="text-sm text-gray-600">{ticket.requester.department}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Assigné à</h4>
                  {ticket.assignee ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{ticket.assignee.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">{ticket.assignee.email}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Non assigné</span>
                  )}
                </div>
              </div>

              {/* SLA */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">SLA</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Temps de réponse</div>
                    <div className="text-lg font-bold text-blue-800">{ticket.sla.responseTime}h</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Temps de résolution</div>
                    <div className="text-lg font-bold text-green-800">{ticket.sla.resolutionTime}h</div>
                  </div>
                  <div className={`p-4 rounded-lg ${ticket.sla.breached ? 'bg-red-50' : 'bg-green-50'}`}>
                    <div className={`text-sm font-medium ${ticket.sla.breached ? 'text-red-600' : 'text-green-600'}`}>
                      Statut SLA
                    </div>
                    <div className={`text-lg font-bold ${ticket.sla.breached ? 'text-red-800' : 'text-green-800'}`}>
                      {ticket.sla.breached ? 'Dépassé' : 'Respecté'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'treatments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Traitements SMQ</h3>
                <span className="text-sm text-gray-600">{ticket.treatments.length} traitement(s)</span>
              </div>

              {/* Liste des traitements */}
              <div className="space-y-4">
                {ticket.treatments.map((treatment) => (
                  <div key={treatment.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{treatment.action}</h4>
                        <p className="text-sm text-gray-600">
                          Par {treatment.technician} le {treatment.treatmentDate.toLocaleDateString('fr-FR')} à {treatment.treatmentDate.toLocaleTimeString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTreatmentStatusColor(treatment.status)}`}>
                        {treatment.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{treatment.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {treatment.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{treatment.duration} min</span>
                        </div>
                      )}
                      {treatment.nextAction && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>Prochaine action: {treatment.nextAction}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ajouter un traitement */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Ajouter un traitement</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Action effectuée"
                      value={newTreatment.action}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, action: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <select
                      value={newTreatment.status}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, status: e.target.value as any }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Planned">Planifié</option>
                      <option value="In Progress">En cours</option>
                      <option value="Completed">Terminé</option>
                      <option value="Failed">Échec</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description détaillée du traitement"
                    value={newTreatment.description}
                    onChange={(e) => setNewTreatment(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    rows={3}
                  />
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Durée (min)"
                      value={newTreatment.duration}
                      onChange={(e) => setNewTreatment(prev => ({ ...prev, duration: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 w-32"
                    />
                    <button
                      onClick={handleAddTreatment}
                      className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evaluations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Évaluations d'incident</h3>
                <span className="text-sm text-gray-600">{ticket.evaluations.length} évaluation(s)</span>
              </div>

              {/* Liste des évaluations */}
              <div className="space-y-4">
                {ticket.evaluations.map((evaluation) => (
                  <div key={evaluation.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Évaluation {evaluation.type}</h4>
                        <p className="text-sm text-gray-600">
                          Par {evaluation.evaluator} le {evaluation.evaluationDate.toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(evaluation.severity)}`}>
                          Sévérité: {evaluation.severity}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(evaluation.impact)}`}>
                          Impact: {evaluation.impact}
                        </span>
                      </div>
                    </div>

                    {evaluation.rootCause && (
                      <div className="mb-3">
                        <h5 className="font-medium text-gray-900 mb-1">Cause racine</h5>
                        <p className="text-gray-700 text-sm">{evaluation.rootCause}</p>
                      </div>
                    )}

                    <div className="mb-3">
                      <h5 className="font-medium text-gray-900 mb-1">Évaluation des risques</h5>
                      <p className="text-gray-700 text-sm">{evaluation.riskAssessment}</p>
                    </div>

                    {evaluation.recommendations.length > 0 && (
                      <div className="mb-3">
                        <h5 className="font-medium text-gray-900 mb-1">Recommandations</h5>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {evaluation.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.followUpRequired && evaluation.followUpDate && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Suivi requis le {evaluation.followUpDate.toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Ajouter une évaluation */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Ajouter une évaluation</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <select
                      value={newEvaluation.type}
                      onChange={(e) => setNewEvaluation(prev => ({ ...prev, type: e.target.value as any }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Initial">Initiale</option>
                      <option value="Progress">Progression</option>
                      <option value="Final">Finale</option>
                      <option value="Post-Resolution">Post-résolution</option>
                    </select>
                    <select
                      value={newEvaluation.severity}
                      onChange={(e) => setNewEvaluation(prev => ({ ...prev, severity: e.target.value as any }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Low">Sévérité Faible</option>
                      <option value="Medium">Sévérité Moyenne</option>
                      <option value="High">Sévérité Élevée</option>
                      <option value="Critical">Sévérité Critique</option>
                    </select>
                    <select
                      value={newEvaluation.impact}
                      onChange={(e) => setNewEvaluation(prev => ({ ...prev, impact: e.target.value as any }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Low">Impact Faible</option>
                      <option value="Medium">Impact Moyen</option>
                      <option value="High">Impact Élevé</option>
                      <option value="Critical">Impact Critique</option>
                    </select>
                    <select
                      value={newEvaluation.urgency}
                      onChange={(e) => setNewEvaluation(prev => ({ ...prev, urgency: e.target.value as any }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="Low">Urgence Faible</option>
                      <option value="Medium">Urgence Moyenne</option>
                      <option value="High">Urgence Élevée</option>
                      <option value="Critical">Urgence Critique</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Évaluation des risques"
                    value={newEvaluation.riskAssessment}
                    onChange={(e) => setNewEvaluation(prev => ({ ...prev, riskAssessment: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    rows={3}
                  />
                  <textarea
                    placeholder="Recommandations (une par ligne)"
                    value={newEvaluation.recommendations}
                    onChange={(e) => setNewEvaluation(prev => ({ ...prev, recommendations: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    rows={3}
                  />
                  <button
                    onClick={handleAddEvaluation}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Ajouter l'évaluation
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Communication avec l'utilisateur</h3>
                <div className="text-sm text-gray-600">
                  {ticket.requester.name} ({ticket.requester.email})
                </div>
              </div>
              
              <MessageThread
                submissionId={ticket.id}
                comments={ticket.comments}
                onSendMessage={handleSendMessage}
                currentUserEmail="it-staff@nsia.com"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetailModal;