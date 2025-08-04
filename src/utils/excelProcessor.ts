import * as XLSX from 'xlsx';
import { ExcelFormData, ExcelImportResult, ExcelColumnMapping } from '../types/excelData';
import { ITSMTicket } from '../types/itsm';

// Mapping par défaut des colonnes Microsoft Forms
const DEFAULT_COLUMN_MAPPING: ExcelColumnMapping = {
  timestamp: 'Horodateur',
  email: 'Adresse e-mail',
  name: 'Nom complet',
  department: 'Département',
  serviceType: 'Type de service',
  priority: 'Priorité',
  title: 'Titre de la demande',
  description: 'Description détaillée',
  category: 'Catégorie',
  urgency: 'Urgence',
  impact: 'Impact',
  phoneNumber: 'Numéro de téléphone',
  managerApproval: 'Approbation manager'
};

export class ExcelProcessor {
  private columnMapping: ExcelColumnMapping;

  constructor(customMapping?: Partial<ExcelColumnMapping>) {
    this.columnMapping = { ...DEFAULT_COLUMN_MAPPING, ...customMapping };
  }

  async processExcelFile(file: File): Promise<ExcelImportResult> {
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convertir en JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length < 2) {
        return {
          success: false,
          data: [],
          errors: ['Le fichier Excel doit contenir au moins une ligne d\'en-tête et une ligne de données'],
          totalRows: 0,
          processedRows: 0
        };
      }

      const headers = jsonData[0] as string[];
      const dataRows = jsonData.slice(1) as any[][];
      
      const result = this.parseExcelData(headers, dataRows);
      
      return {
        success: result.errors.length === 0,
        data: result.data,
        errors: result.errors,
        totalRows: dataRows.length,
        processedRows: result.data.length
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        errors: [`Erreur lors de la lecture du fichier: ${error instanceof Error ? error.message : 'Erreur inconnue'}`],
        totalRows: 0,
        processedRows: 0
      };
    }
  }

  private parseExcelData(headers: string[], rows: any[][]): { data: ExcelFormData[], errors: string[] } {
    const data: ExcelFormData[] = [];
    const errors: string[] = [];

    // Créer un mapping des index de colonnes
    const columnIndexes = this.createColumnIndexMapping(headers);

    rows.forEach((row, index) => {
      try {
        const formData = this.parseRow(row, columnIndexes, index + 2); // +2 car on commence à la ligne 2 (après l'en-tête)
        if (formData) {
          data.push(formData);
        }
      } catch (error) {
        errors.push(`Ligne ${index + 2}: ${error instanceof Error ? error.message : 'Erreur de parsing'}`);
      }
    });

    return { data, errors };
  }

  private createColumnIndexMapping(headers: string[]): Record<string, number> {
    const mapping: Record<string, number> = {};
    
    Object.entries(this.columnMapping).forEach(([key, columnName]) => {
      const index = headers.findIndex(header => 
        header.toLowerCase().includes(columnName.toLowerCase()) ||
        columnName.toLowerCase().includes(header.toLowerCase())
      );
      if (index !== -1) {
        mapping[key] = index;
      }
    });

    return mapping;
  }

  private parseRow(row: any[], columnIndexes: Record<string, number>, lineNumber: number): ExcelFormData | null {
    // Vérifier les colonnes obligatoires
    const requiredFields = ['timestamp', 'email', 'name', 'title', 'description'];
    const missingFields = requiredFields.filter(field => 
      columnIndexes[field] === undefined || !row[columnIndexes[field]]
    );

    if (missingFields.length > 0) {
      throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
    }

    const timestamp = this.parseDate(row[columnIndexes.timestamp]);
    if (!timestamp) {
      throw new Error('Format de date invalide');
    }

    return {
      id: `FORM-${Date.now()}-${lineNumber}`,
      timestamp,
      email: String(row[columnIndexes.email] || '').trim(),
      name: String(row[columnIndexes.name] || '').trim(),
      department: String(row[columnIndexes.department] || 'Non spécifié').trim(),
      serviceType: String(row[columnIndexes.serviceType] || 'Demande générale').trim(),
      priority: this.parsePriority(row[columnIndexes.priority]),
      title: String(row[columnIndexes.title] || '').trim(),
      description: String(row[columnIndexes.description] || '').trim(),
      category: String(row[columnIndexes.category] || 'Support').trim(),
      urgency: String(row[columnIndexes.urgency] || 'Moyenne').trim(),
      impact: String(row[columnIndexes.impact] || 'Moyen').trim(),
      phoneNumber: columnIndexes.phoneNumber ? String(row[columnIndexes.phoneNumber] || '').trim() : undefined,
      managerApproval: columnIndexes.managerApproval ? this.parseBoolean(row[columnIndexes.managerApproval]) : undefined
    };
  }

  private parseDate(dateValue: any): Date | null {
    if (!dateValue) return null;
    
    // Essayer différents formats de date
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date;
    }

    // Format Excel numérique
    if (typeof dateValue === 'number') {
      const excelDate = new Date((dateValue - 25569) * 86400 * 1000);
      if (!isNaN(excelDate.getTime())) {
        return excelDate;
      }
    }

    return null;
  }

  private parsePriority(priorityValue: any): 'Low' | 'Medium' | 'High' | 'Critical' {
    const priority = String(priorityValue || '').toLowerCase();
    
    if (priority.includes('critique') || priority.includes('critical')) return 'Critical';
    if (priority.includes('haute') || priority.includes('high') || priority.includes('élevée')) return 'High';
    if (priority.includes('basse') || priority.includes('low') || priority.includes('faible')) return 'Low';
    
    return 'Medium';
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    const str = String(value || '').toLowerCase();
    return str === 'oui' || str === 'yes' || str === 'true' || str === '1';
  }

  // Convertir les données Excel en tickets ITSM
  convertToITSMTickets(excelData: ExcelFormData[]): ITSMTicket[] {
    return excelData.map((data, index) => {
      const ticketNumber = this.generateTicketNumber(data.serviceType, index);
      
      return {
        id: data.id,
        ticketNumber,
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        status: 'Open' as const,
        requester: {
          name: data.name,
          email: data.email,
          department: data.department
        },
        createdAt: data.timestamp,
        updatedAt: data.timestamp,
        dueDate: this.calculateDueDate(data.priority, data.timestamp),
        comments: [],
        sla: this.calculateSLA(data.priority)
      };
    });
  }

  private generateTicketNumber(serviceType: string, index: number): string {
    const year = new Date().getFullYear();
    const prefix = serviceType.toLowerCase().includes('incident') ? 'INC' :
                  serviceType.toLowerCase().includes('demande') ? 'REQ' :
                  serviceType.toLowerCase().includes('changement') ? 'CHG' : 'REQ';
    
    return `${prefix}-${year}-${String(index + 1).padStart(3, '0')}`;
  }

  private calculateDueDate(priority: string, createdAt: Date): Date {
    const dueDate = new Date(createdAt);
    const hoursToAdd = priority === 'Critical' ? 4 :
                      priority === 'High' ? 24 :
                      priority === 'Medium' ? 72 : 168;
    
    dueDate.setHours(dueDate.getHours() + hoursToAdd);
    return dueDate;
  }

  private calculateSLA(priority: string) {
    return {
      responseTime: priority === 'Critical' ? 1 :
                   priority === 'High' ? 4 :
                   priority === 'Medium' ? 8 : 24,
      resolutionTime: priority === 'Critical' ? 4 :
                     priority === 'High' ? 24 :
                     priority === 'Medium' ? 72 : 168,
      breached: false
    };
  }
}