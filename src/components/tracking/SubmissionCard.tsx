import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  User,
  MessageSquare,
  Paperclip,
  Star,
  ChevronDown,
  ChevronUp,
  Eye,
  Send
} from 'lucide-react';
import { UserSubmission } from '../../types/userTracking';
import MessageThread from './MessageThread';

interface SubmissionCardProps {
  submission: UserSubmission;
  onSendMessage: (submissionId: string, message: string) => void;
  currentUserEmail: string;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ 
  submission, 
  onSendMessage, 
  currentUserEmail 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Acknowledged': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Submitted': return Clock;
      case 'Acknowledged': return CheckCircle;
      case 'In Progress': return AlertTriangle;
      case 'Pending': return Clock;
      case 'Resolved': return CheckCircle;
      case 'Closed': return CheckCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(submission.status);
  const timeAgo = Math.floor((new Date().getTime() - submission.lastUpdateDate.getTime()) / (1000 * 60 * 60));

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-accent-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-950 to-primary-900 rounded-lg blur-sm opacity-20"></div>
              <div className="relative p-3 bg-gradient-to-br from-primary-950 to-primary-900 rounded-lg">
                <StatusIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {submission.ticketNumber}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(submission.priority)}`}>
                  {submission.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(submission.status)}`}>
                  {submission.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {submission.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {submission.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Avancement</span>
            <span className="text-sm text-gray-600">{submission.progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-500"
              style={{ width: `${submission.progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {submission.submissionDate.toLocaleDateString('fr-FR')}
              </div>
              <div className="text-xs text-gray-500">Date de soumission</div>
            </div>
          </div>
          
          {submission.acknowledgmentDate && (
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {submission.acknowledgmentDate.toLocaleDateString('fr-FR')}
                </div>
                <div className="text-xs text-gray-500">Accusé de réception</div>
              </div>
            </div>
          )}
        </div>

        {/* Détails étendus */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
            {/* Accusé de réception */}
            {submission.acknowledgmentBy && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Accusé de réception</span>
                </div>
                <p className="text-green-700 text-sm">
                  Votre demande a été prise en charge par <strong>{submission.acknowledgmentBy}</strong>
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Le {submission.acknowledgmentDate?.toLocaleDateString('fr-FR')} à {submission.acknowledgmentDate?.toLocaleTimeString('fr-FR')}
                </p>
              </div>
            )}

            {/* Dates importantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submission.estimatedResolution && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {submission.estimatedResolution.toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-xs text-gray-500">Résolution estimée</div>
                  </div>
                </div>
              )}
              
              {submission.actualResolution && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {submission.actualResolution.toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-xs text-gray-500">Résolu le</div>
                  </div>
                </div>
              )}
            </div>

            {/* Système de messagerie */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Communication</span>
                </h4>
                <button
                  onClick={() => setShowMessaging(!showMessaging)}
                  className="flex items-center space-x-2 px-3 py-1 bg-accent-100 hover:bg-accent-200 text-accent-800 rounded-lg transition-all text-sm"
                >
                  <Send className="h-3 w-3" />
                  <span>{showMessaging ? 'Masquer' : 'Envoyer un message'}</span>
                </button>
              </div>
              
              {showMessaging ? (
                <MessageThread
                  submissionId={submission.id}
                  comments={submission.comments}
                  onSendMessage={onSendMessage}
                  currentUserEmail={currentUserEmail}
                />
              ) : null}
              
              {!showMessaging && submission.comments.filter(c => c.isVisible).length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {submission.comments.filter(c => c.isVisible).length} message(s) échangé(s)
                    </span>
                    <button
                      onClick={() => setShowMessaging(true)}
                      className="text-xs text-accent-600 hover:text-accent-800 font-medium"
                    >
                      Voir la conversation
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Pièces jointes */}
            {submission.attachments && submission.attachments.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Paperclip className="h-4 w-4" />
                  <span>Pièces jointes</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {submission.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Évaluation */}
            {submission.satisfaction && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Votre évaluation</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < submission.satisfaction!.rating
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">
                    ({submission.satisfaction.rating}/5)
                  </span>
                </div>
                {submission.satisfaction.feedback && (
                  <p className="text-yellow-700 text-sm italic">
                    "{submission.satisfaction.feedback}"
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{submission.category}</span>
            </div>
            {submission.comments.filter(c => c.isVisible).length > 0 && (
              <div className="flex items-center space-x-1 text-gray-500">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{submission.comments.filter(c => c.isVisible).length} message(s)</span>
              </div>
            )}
            <button
              onClick={() => setShowMessaging(!showMessaging)}
              className="flex items-center space-x-1 text-accent-600 hover:text-accent-800 text-sm font-medium transition-colors"
            >
              <Send className="h-3 w-3" />
              <span>{showMessaging ? 'Masquer' : 'Message'}</span>
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            Mis à jour il y a {timeAgo}h
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;