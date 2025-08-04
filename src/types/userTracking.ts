export interface UserSubmission {
  id: string;
  ticketNumber: string;
  submissionDate: Date;
  userEmail: string;
  userName: string;
  department: string;
  serviceType: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  category: string;
  status: 'Submitted' | 'Acknowledged' | 'In Progress' | 'Pending' | 'Resolved' | 'Closed';
  acknowledgmentDate?: Date;
  acknowledgmentBy?: string;
  lastUpdateDate: Date;
  estimatedResolution?: Date;
  actualResolution?: Date;
  progressPercentage: number;
  comments: UserComment[];
  attachments?: string[];
  satisfaction?: {
    rating: number;
    feedback?: string;
    date: Date;
  };
}

export interface UserComment {
  id: string;
  author: string;
  authorType: 'user' | 'it_staff';
  content: string;
  timestamp: Date;
  isVisible: boolean; // Visible pour l'utilisateur ou interne IT
}

export interface UserTrackingStats {
  totalSubmissions: number;
  pendingSubmissions: number;
  resolvedSubmissions: number;
  averageResolutionTime: number;
  lastSubmissionDate?: Date;
}