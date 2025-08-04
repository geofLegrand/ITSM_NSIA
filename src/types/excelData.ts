export interface ExcelFormData {
  id: string;
  timestamp: Date;
  email: string;
  name: string;
  department: string;
  serviceType: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  category: string;
  urgency: string;
  impact: string;
  attachments?: string[];
  phoneNumber?: string;
  managerApproval?: boolean;
}

export interface ExcelImportResult {
  success: boolean;
  data: ExcelFormData[];
  errors: string[];
  totalRows: number;
  processedRows: number;
}

export interface ExcelColumnMapping {
  timestamp: string;
  email: string;
  name: string;
  department: string;
  serviceType: string;
  priority: string;
  title: string;
  description: string;
  category: string;
  urgency: string;
  impact: string;
  phoneNumber?: string;
  managerApproval?: string;
}