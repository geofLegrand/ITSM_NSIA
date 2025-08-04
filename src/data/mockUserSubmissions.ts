import { UserSubmission } from '../types/userTracking';

export const mockUserSubmissions: UserSubmission[] = [
  {
    id: '1',
    ticketNumber: 'INC-2025-001',
    submissionDate: new Date('2025-01-15T08:30:00'),
    userEmail: 'marie.dubois@nsia.com',
    userName: 'Marie Dubois',
    department: 'Comptabilité',
    serviceType: 'Incident',
    priority: 'High',
    title: 'Problème de connexion réseau - Bureau 205',
    description: 'Impossible de se connecter au réseau depuis ce matin. Aucun accès internet ni aux serveurs internes. Cela bloque complètement mon travail.',
    category: 'Réseau',
    status: 'In Progress',
    acknowledgmentDate: new Date('2025-01-15T09:00:00'),
    acknowledgmentBy: 'Jean Martin - Équipe IT',
    lastUpdateDate: new Date('2025-01-15T14:30:00'),
    estimatedResolution: new Date('2025-01-15T16:30:00'),
    progressPercentage: 65,
    comments: [
      {
        id: '1',
        author: 'Jean Martin',
        authorType: 'it_staff',
        content: 'Bonjour Marie, nous avons bien reçu votre demande. Nous intervenons actuellement sur le switch réseau de votre étage.',
        timestamp: new Date('2025-01-15T09:00:00'),
        isVisible: true
      },
      {
        id: '2',
        author: 'Jean Martin',
        authorType: 'it_staff',
        content: 'Problème identifié au niveau du switch. Remplacement en cours.',
        timestamp: new Date('2025-01-15T14:30:00'),
        isVisible: true
      }
    ],
    attachments: ['capture_ecran_erreur.png']
  },
  {
    id: '2',
    ticketNumber: 'REQ-2025-002',
    submissionDate: new Date('2025-01-14T14:20:00'),
    userEmail: 'pierre.leroy@nsia.com',
    userName: 'Pierre Leroy',
    department: 'Marketing',
    serviceType: 'Demande',
    priority: 'Medium',
    title: 'Demande de nouveau PC portable',
    description: 'Mon PC portable actuel est très lent et plante régulièrement. J\'aurais besoin d\'un nouveau poste pour être plus efficace.',
    category: 'Matériel',
    status: 'Pending',
    acknowledgmentDate: new Date('2025-01-14T15:00:00'),
    acknowledgmentBy: 'Sophie Blanc - Équipe IT',
    lastUpdateDate: new Date('2025-01-14T16:45:00'),
    estimatedResolution: new Date('2025-01-21T14:20:00'),
    progressPercentage: 30,
    comments: [
      {
        id: '3',
        author: 'Sophie Blanc',
        authorType: 'it_staff',
        content: 'Demande reçue. En attente de validation budgétaire par votre manager.',
        timestamp: new Date('2025-01-14T15:00:00'),
        isVisible: true
      },
      {
        id: '4',
        author: 'Sophie Blanc',
        authorType: 'it_staff',
        content: 'Validation reçue. Commande du matériel en cours.',
        timestamp: new Date('2025-01-14T16:45:00'),
        isVisible: true
      }
    ]
  },
  {
    id: '4',
    ticketNumber: 'INC-2025-004',
    submissionDate: new Date('2025-01-16T09:15:00'),
    userEmail: 'pierre.leroy@nsia.com',
    userName: 'Pierre Leroy',
    department: 'Marketing',
    serviceType: 'Incident',
    priority: 'Medium',
    title: 'Problème d\'impression réseau',
    description: 'L\'imprimante réseau ne répond plus depuis hier. Impossible d\'imprimer les documents.',
    category: 'Matériel',
    status: 'In Progress',
    acknowledgmentDate: new Date('2025-01-16T09:30:00'),
    acknowledgmentBy: 'Marc Rousseau - Équipe IT',
    lastUpdateDate: new Date('2025-01-16T11:45:00'),
    estimatedResolution: new Date('2025-01-16T17:00:00'),
    progressPercentage: 40,
    comments: [
      {
        id: '7',
        author: 'Marc Rousseau',
        authorType: 'it_staff',
        content: 'Bonjour Pierre, nous avons identifié le problème. Intervention prévue cet après-midi.',
        timestamp: new Date('2025-01-16T09:30:00'),
        isVisible: true
      },
      {
        id: '8',
        author: 'Pierre Leroy',
        authorType: 'user',
        content: 'Merci pour le retour. Y a-t-il une imprimante de secours disponible en attendant ?',
        timestamp: new Date('2025-01-16T10:15:00'),
        isVisible: true
      },
      {
        id: '9',
        author: 'Marc Rousseau',
        authorType: 'it_staff',
        content: 'Oui, vous pouvez utiliser l\'imprimante du 2ème étage temporairement. Code d\'accès : PRINT2025',
        timestamp: new Date('2025-01-16T11:45:00'),
        isVisible: true
      }
    ]
  },
  {
    id: '3',
    ticketNumber: 'REQ-2025-003',
    submissionDate: new Date('2025-01-12T10:15:00'),
    userEmail: 'marie.dubois@nsia.com',
    userName: 'Marie Dubois',
    department: 'Comptabilité',
    serviceType: 'Demande',
    priority: 'Low',
    title: 'Accès application CRM',
    description: 'J\'ai besoin d\'un accès à l\'application CRM pour consulter les données clients.',
    category: 'Applications',
    status: 'Resolved',
    acknowledgmentDate: new Date('2025-01-12T11:00:00'),
    acknowledgmentBy: 'Thomas Petit - Équipe IT',
    lastUpdateDate: new Date('2025-01-13T14:20:00'),
    estimatedResolution: new Date('2025-01-15T10:15:00'),
    actualResolution: new Date('2025-01-13T14:20:00'),
    progressPercentage: 100,
    comments: [
      {
        id: '5',
        author: 'Thomas Petit',
        authorType: 'it_staff',
        content: 'Demande prise en compte. Création de votre compte en cours.',
        timestamp: new Date('2025-01-12T11:00:00'),
        isVisible: true
      },
      {
        id: '6',
        author: 'Thomas Petit',
        authorType: 'it_staff',
        content: 'Compte créé avec succès. Vous devriez recevoir vos identifiants par email.',
        timestamp: new Date('2025-01-13T14:20:00'),
        isVisible: true
      }
    ],
    satisfaction: {
      rating: 5,
      feedback: 'Service rapide et efficace, merci !',
      date: new Date('2025-01-13T15:00:00')
    }
  }
];