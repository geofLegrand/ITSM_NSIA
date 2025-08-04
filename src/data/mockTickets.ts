import { ITSMTicket } from '../types/itsm';

export const mockTickets: ITSMTicket[] = [
  {
    id: '1',
    ticketNumber: 'INC-2025-001',
    title: 'Problème de connexion réseau - Bureau 205',
    description: 'Impossible de se connecter au réseau depuis ce matin. Aucun accès internet ni aux serveurs internes.',
    category: 'Réseau',
    priority: 'High',
    status: 'In Progress',
    requester: {
      name: 'Marie Dubois',
      email: 'marie.dubois@entreprise.com',
      department: 'Comptabilité'
    },
    assignee: {
      name: 'Jean Martin',
      email: 'jean.martin@it.entreprise.com'
    },
    createdAt: new Date('2025-01-15T08:30:00'),
    updatedAt: new Date('2025-01-15T10:15:00'),
    dueDate: new Date('2025-01-15T16:30:00'),
    comments: [
      {
        id: '1',
        author: 'Jean Martin',
        authorType: 'it_staff',
        content: 'Ticket pris en charge. Vérification du switch réseau en cours.',
        timestamp: new Date('2025-01-15T09:00:00'),
        isInternal: false
      }
    ],
    treatments: [
      {
        id: 't1',
        treatmentDate: new Date('2025-01-15T09:00:00'),
        technician: 'Jean Martin',
        action: 'Diagnostic initial',
        description: 'Vérification de la connectivité réseau et identification du switch défaillant',
        status: 'Completed',
        duration: 30,
        nextAction: 'Remplacement du switch'
      },
      {
        id: 't2',
        treatmentDate: new Date('2025-01-15T14:30:00'),
        technician: 'Jean Martin',
        action: 'Remplacement matériel',
        description: 'Remplacement du switch réseau défaillant par un nouveau modèle',
        status: 'In Progress',
        duration: 60
      }
    ],
    evaluations: [
      {
        id: 'e1',
        evaluationDate: new Date('2025-01-15T09:15:00'),
        evaluator: 'Jean Martin',
        type: 'Initial',
        severity: 'High',
        impact: 'High',
        urgency: 'High',
        rootCause: 'Défaillance matérielle du switch réseau',
        riskAssessment: 'Impact sur la productivité de tout l\'étage. Risque de propagation si non traité rapidement.',
        recommendations: [
          'Remplacement immédiat du switch',
          'Mise en place d\'une surveillance proactive',
          'Planification du renouvellement du matériel réseau'
        ],
        followUpRequired: true,
        followUpDate: new Date('2025-01-16T09:00:00')
      }
    ],
    sla: {
      responseTime: 4,
      resolutionTime: 24,
      breached: false
    }
  },
  {
    id: '2',
    ticketNumber: 'REQ-2025-002',
    title: 'Demande de nouveau PC portable',
    description: 'Demande d\'un nouveau PC portable pour remplacer l\'ancien qui présente des lenteurs importantes.',
    category: 'Matériel',
    priority: 'Medium',
    status: 'Pending',
    requester: {
      name: 'Pierre Leroy',
      email: 'pierre.leroy@entreprise.com',
      department: 'Marketing'
    },
    createdAt: new Date('2025-01-14T14:20:00'),
    updatedAt: new Date('2025-01-14T16:45:00'),
    dueDate: new Date('2025-01-21T14:20:00'),
    comments: [
      {
        id: '2',
        author: 'Sophie Blanc',
        authorType: 'it_staff',
        content: 'En attente de validation budgétaire par le manager.',
        timestamp: new Date('2025-01-14T16:45:00'),
        isInternal: true
      }
    ],
    treatments: [
      {
        id: 't3',
        treatmentDate: new Date('2025-01-14T15:00:00'),
        technician: 'Sophie Blanc',
        action: 'Évaluation de la demande',
        description: 'Analyse des besoins et spécifications techniques requises',
        status: 'Completed',
        duration: 45,
        nextAction: 'Validation budgétaire'
      }
    ],
    evaluations: [
      {
        id: 'e2',
        evaluationDate: new Date('2025-01-14T15:30:00'),
        evaluator: 'Sophie Blanc',
        type: 'Initial',
        severity: 'Medium',
        impact: 'Medium',
        urgency: 'Low',
        riskAssessment: 'Impact limité sur la productivité individuelle. Pas d\'urgence critique.',
        recommendations: [
          'Validation budgétaire requise',
          'Commande d\'un PC portable standard entreprise',
          'Planification de la migration des données'
        ],
        followUpRequired: true,
        followUpDate: new Date('2025-01-17T09:00:00')
      }
    ],
    sla: {
      responseTime: 8,
      resolutionTime: 72,
      breached: false
    }
  },
  {
    id: '3',
    ticketNumber: 'INC-2025-003',
    title: 'Serveur de messagerie indisponible',
    description: 'Le serveur Exchange est inaccessible depuis 30 minutes. Aucun email ne peut être envoyé ou reçu.',
    category: 'Infrastructure',
    priority: 'Critical',
    status: 'Open',
    requester: {
      name: 'Admin Système',
      email: 'admin@entreprise.com',
      department: 'IT'
    },
    assignee: {
      name: 'Marc Rousseau',
      email: 'marc.rousseau@it.entreprise.com'
    },
    createdAt: new Date('2025-01-15T11:45:00'),
    updatedAt: new Date('2025-01-15T11:45:00'),
    dueDate: new Date('2025-01-15T13:45:00'),
    comments: [],
    treatments: [],
    evaluations: [
      {
        id: 'e3',
        evaluationDate: new Date('2025-01-15T11:50:00'),
        evaluator: 'Marc Rousseau',
        type: 'Initial',
        severity: 'Critical',
        impact: 'Critical',
        urgency: 'Critical',
        rootCause: 'À déterminer - Serveur Exchange inaccessible',
        riskAssessment: 'Impact critique sur toute l\'organisation. Communication email interrompue.',
        recommendations: [
          'Intervention immédiate sur le serveur',
          'Vérification des services Exchange',
          'Communication aux utilisateurs'
        ],
        followUpRequired: true,
        followUpDate: new Date('2025-01-15T12:00:00')
      }
    ],
    sla: {
      responseTime: 1,
      resolutionTime: 4,
      breached: false
    }
  },
  {
    id: '4',
    ticketNumber: 'CHG-2025-001',
    title: 'Mise à jour sécurité Windows',
    description: 'Déploiement des dernières mises à jour de sécurité Windows sur tous les postes de travail.',
    category: 'Sécurité',
    priority: 'Medium',
    status: 'Resolved',
    requester: {
      name: 'Équipe Sécurité',
      email: 'security@entreprise.com',
      department: 'IT'
    },
    assignee: {
      name: 'Julie Moreau',
      email: 'julie.moreau@it.entreprise.com'
    },
    createdAt: new Date('2025-01-13T09:00:00'),
    updatedAt: new Date('2025-01-14T17:30:00'),
    dueDate: new Date('2025-01-16T09:00:00'),
    resolution: 'Mises à jour déployées avec succès sur 95% des postes. 3 postes nécessitent une intervention manuelle.',
    comments: [
      {
        id: '3',
        author: 'Julie Moreau',
        authorType: 'it_staff',
        content: 'Déploiement terminé. Quelques postes hors ligne à traiter manuellement.',
        timestamp: new Date('2025-01-14T17:30:00'),
        isInternal: false
      }
    ],
    treatments: [
      {
        id: 't4',
        treatmentDate: new Date('2025-01-13T10:00:00'),
        technician: 'Julie Moreau',
        action: 'Préparation du déploiement',
        description: 'Configuration des politiques de groupe et test sur environnement de développement',
        status: 'Completed',
        duration: 120,
        nextAction: 'Déploiement automatique'
      },
      {
        id: 't5',
        treatmentDate: new Date('2025-01-14T08:00:00'),
        technician: 'Julie Moreau',
        action: 'Déploiement automatique',
        description: 'Lancement du déploiement via WSUS sur tous les postes de travail',
        status: 'Completed',
        duration: 480,
        nextAction: 'Vérification et intervention manuelle'
      }
    ],
    evaluations: [
      {
        id: 'e4',
        evaluationDate: new Date('2025-01-14T17:45:00'),
        evaluator: 'Julie Moreau',
        type: 'Final',
        severity: 'Low',
        impact: 'Low',
        urgency: 'Medium',
        riskAssessment: 'Déploiement réussi à 95%. Risque résiduel faible pour les 3 postes restants.',
        recommendations: [
          'Intervention manuelle sur les 3 postes restants',
          'Amélioration du processus de déploiement automatique',
          'Surveillance continue des mises à jour'
        ],
        followUpRequired: true,
        followUpDate: new Date('2025-01-15T09:00:00')
      }
    ],
    sla: {
      responseTime: 8,
      resolutionTime: 48,
      breached: false
    }
  },
  {
    id: '5',
    ticketNumber: 'REQ-2025-003',
    title: 'Accès application CRM',
    description: 'Demande d\'accès à l\'application CRM pour le nouveau commercial.',
    category: 'Applications',
    priority: 'Low',
    status: 'Closed',
    requester: {
      name: 'RH Service',
      email: 'rh@entreprise.com',
      department: 'Ressources Humaines'
    },
    assignee: {
      name: 'Thomas Petit',
      email: 'thomas.petit@it.entreprise.com'
    },
    createdAt: new Date('2025-01-12T10:15:00'),
    updatedAt: new Date('2025-01-13T14:20:00'),
    dueDate: new Date('2025-01-15T10:15:00'),
    resolution: 'Compte créé et accès configuré. Utilisateur informé par email.',
    comments: [
      {
        id: '4',
        author: 'Thomas Petit',
        authorType: 'it_staff',
        content: 'Accès configuré et testé. Ticket fermé.',
        timestamp: new Date('2025-01-13T14:20:00'),
        isInternal: false
      }
    ],
    treatments: [
      {
        id: 't6',
        treatmentDate: new Date('2025-01-12T11:00:00'),
        technician: 'Thomas Petit',
        action: 'Création du compte utilisateur',
        description: 'Création du compte dans Active Directory et attribution des droits CRM',
        status: 'Completed',
        duration: 30,
        nextAction: 'Test et validation'
      },
      {
        id: 't7',
        treatmentDate: new Date('2025-01-13T14:00:00'),
        technician: 'Thomas Petit',
        action: 'Test et validation',
        description: 'Test de connexion et validation des accès aux modules CRM requis',
        status: 'Completed',
        duration: 20
      }
    ],
    evaluations: [
      {
        id: 'e5',
        evaluationDate: new Date('2025-01-13T14:20:00'),
        evaluator: 'Thomas Petit',
        type: 'Final',
        severity: 'Low',
        impact: 'Low',
        urgency: 'Low',
        riskAssessment: 'Aucun risque. Demande standard traitée avec succès.',
        recommendations: [
          'Formation utilisateur recommandée',
          'Suivi de l\'utilisation après 1 mois'
        ],
        followUpRequired: false
      }
    ],
    sla: {
      responseTime: 24,
      resolutionTime: 48,
      breached: false
    }
  }
];

export const mockMetrics = {
  totalTickets: 156,
  openTickets: 23,
  resolvedToday: 8,
  averageResolutionTime: 18.5,
  slaCompliance: 94.2,
  criticalTickets: 2
};