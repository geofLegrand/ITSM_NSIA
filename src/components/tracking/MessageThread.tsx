import React, { useState } from 'react';
import { 
  Send, 
  User, 
  Clock, 
  CheckCircle,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { UserComment } from '../../types/userTracking';

interface MessageThreadProps {
  submissionId: string;
  comments: UserComment[];
  onSendMessage: (submissionId: string, message: string) => void;
  currentUserEmail: string;
}

const MessageThread: React.FC<MessageThreadProps> = ({ 
  submissionId, 
  comments, 
  onSendMessage, 
  currentUserEmail 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(submissionId, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const visibleComments = comments.filter(comment => comment.isVisible);

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-4">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="h-5 w-5 text-gray-600" />
        <h4 className="font-semibold text-gray-900">Échanges avec l'équipe IT</h4>
        <span className="text-sm text-gray-500">({visibleComments.length} message{visibleComments.length > 1 ? 's' : ''})</span>
      </div>

      {/* Liste des messages */}
      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {visibleComments.length > 0 ? (
          visibleComments
            .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
            .map((comment) => (
              <div 
                key={comment.id} 
                className={`flex ${comment.authorType === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  comment.authorType === 'user'
                    ? 'bg-accent-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {comment.authorType === 'user' ? 'Vous' : comment.author}
                    </span>
                    <span className={`text-xs ${
                      comment.authorType === 'user' ? 'text-accent-100' : 'text-gray-500'
                    }`}>
                      {new Date(comment.timestamp).toLocaleDateString('fr-FR')} {new Date(comment.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Aucun message pour le moment</p>
            <p className="text-xs">Commencez la conversation avec l'équipe IT</p>
          </div>
        )}
      </div>

      {/* Formulaire d'envoi de message */}
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <div className="flex-1 relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 resize-none"
            rows={2}
            disabled={isSending}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {newMessage.length}/500
          </div>
        </div>
        <button
          type="submit"
          disabled={!newMessage.trim() || isSending || newMessage.length > 500}
          className="px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSending ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isSending ? 'Envoi...' : 'Envoyer'}
          </span>
        </button>
      </form>

      {/* Indicateur de statut */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>Les messages sont traités en temps réel</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-green-600">
          <CheckCircle className="h-3 w-3" />
          <span>Connecté</span>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;