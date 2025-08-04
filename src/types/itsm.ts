export interface ITSMTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Pending' | 'Resolved' | 'Closed';
  requester: {
    name: string;
    email: string;
    department: string;
  };
  assignee?: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  resolution?: string;
  attachments?: string[];
  comments: ITSMComment[];
  treatments: ITSMTreatment[];
  evaluations: ITSMEvaluation[];
  sla: {
    responseTime: number; // en heures
    resolutionTime: number; // en heures
    breached: boolean;
  };
}

export interface ITSMComment {
  id: string;
  author: string;
  authorType: 'user' | 'it_staff';
  content: string;
  timestamp: Date;
  isInternal: boolean;
}

export interface ITSMTreatment {
  id: string;
  treatmentDate: Date;
  technician: string;
  action: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Failed';
  duration?: number; // en minutes
  nextAction?: string;
  attachments?: string[];
}

export interface ITSMEvaluation {
  id: string;
  evaluationDate: Date;
  evaluator: string;
  type: 'Initial' | 'Progress' | 'Final' | 'Post-Resolution';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  rootCause?: string;
  riskAssessment: string;
  recommendations: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
}

export interface ITSMMetrics {
  totalTickets: number;
  openTickets: number;
  resolvedToday: number;
  averageResolutionTime: number;
  slaCompliance: number;
  criticalTickets: number;
}