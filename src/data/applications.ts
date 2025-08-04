import { 
  Monitor, 
  Shield, 
  Database, 
  Wifi, 
  HardDrive,
  Users,
  Key,
  Bug,
  Server,
  Smartphone,
  Globe,
  Settings
} from 'lucide-react';

export interface Application {
  id: string;
  title: string;
  description: string;
  icon: any;
  formUrl: string;
  category: string;
}

export const applications: Application[] = [
  {
    id: '1',
    title: 'Support Technique',
    description: 'Demande d\'assistance technique et résolution d\'incidents',
    icon: Settings,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_SUPPORT',
    category: 'Support'
  },
  {
    id: '2',
    title: 'Demande Équipement',
    description: 'Commande de matériel informatique (PC, écrans, périphériques)',
    icon: Monitor,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_EQUIPEMENT',
    category: 'Matériel'
  },
  {
    id: '3',
    title: 'Accès Réseau',
    description: 'Demande d\'accès Wi-Fi, VPN et configuration réseau',
    icon: Wifi,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_RESEAU',
    category: 'Réseau'
  },
  {
    id: '4',
    title: 'Gestion Comptes',
    description: 'Création, modification et suppression de comptes utilisateurs',
    icon: Users,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_COMPTES',
    category: 'Comptes'
  },
  {
    id: '5',
    title: 'Sécurité IT',
    description: 'Signalement d\'incidents de sécurité et demandes antivirus',
    icon: Shield,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_SECURITE',
    category: 'Sécurité'
  },
  {
    id: '6',
    title: 'Sauvegarde Données',
    description: 'Demande de sauvegarde et restauration de données',
    icon: HardDrive,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_SAUVEGARDE',
    category: 'Données'
  },
  {
    id: '7',
    title: 'Accès Applications',
    description: 'Demande d\'accès aux logiciels et applications métier',
    icon: Key,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_ACCES',
    category: 'Applications'
  },
  {
    id: '8',
    title: 'Signalement Bug',
    description: 'Rapport de bugs et dysfonctionnements logiciels',
    icon: Bug,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_BUG',
    category: 'Support'
  },
  {
    id: '9',
    title: 'Infrastructure',
    description: 'Demandes liées aux serveurs et infrastructure IT',
    icon: Server,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_INFRA',
    category: 'Infrastructure'
  },
  {
    id: '10',
    title: 'Mobile & Tablettes',
    description: 'Configuration et support des appareils mobiles',
    icon: Smartphone,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_MOBILE',
    category: 'Matériel'
  },
  {
    id: '11',
    title: 'Base de Données',
    description: 'Demandes d\'accès et maintenance des bases de données',
    icon: Database,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_BDD',
    category: 'Données'
  },
  {
    id: '12',
    title: 'Site Web',
    description: 'Modifications et maintenance du site web d\'entreprise',
    icon: Globe,
    formUrl: 'https://forms.office.com/Pages/ResponsePage.aspx?id=VOTRE_FORM_ID_WEB',
    category: 'Web'
  }
];

export const categories = Array.from(new Set(applications.map(app => app.category)));