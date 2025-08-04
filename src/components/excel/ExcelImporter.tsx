import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Download,
  Settings
} from 'lucide-react';
import { ExcelProcessor } from '../../utils/excelProcessor';
import { ExcelImportResult, ExcelColumnMapping } from '../../types/excelData';
import { ITSMTicket } from '../../types/itsm';
import * as XLSX from 'xlsx';

interface ExcelImporterProps {
  onImportSuccess: (tickets: ITSMTicket[]) => void;
  onClose: () => void;
}

const ExcelImporter: React.FC<ExcelImporterProps> = ({ onImportSuccess, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<ExcelImportResult | null>(null);
  const [showColumnMapping, setShowColumnMapping] = useState(false);
  const [columnMapping, setColumnMapping] = useState<Partial<ExcelColumnMapping>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processor = new ExcelProcessor(columnMapping);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    
    if (excelFile) {
      processFile(excelFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setImportResult(null);
    
    try {
      const result = await processor.processExcelFile(file);
      setImportResult(result);
      
      if (result.success && result.data.length > 0) {
        const tickets = processor.convertToITSMTickets(result.data);
        onImportSuccess(tickets);
      }
    } catch (error) {
      setImportResult({
        success: false,
        data: [],
        errors: [`Erreur lors du traitement: ${error instanceof Error ? error.message : 'Erreur inconnue'}`],
        totalRows: 0,
        processedRows: 0
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      [
        'Horodateur',
        'Adresse e-mail',
        'Nom complet',
        'Département',
        'Type de service',
        'Priorité',
        'Titre de la demande',
        'Description détaillée',
        'Catégorie',
        'Urgence',
        'Impact',
        'Numéro de téléphone'
      ],
      [
        new Date().toISOString(),
        'exemple@entreprise.com',
        'Jean Dupont',
        'IT',
        'Incident',
        'Medium',
        'Problème de connexion réseau',
        'Impossible de se connecter au réseau depuis ce matin',
        'Réseau',
        'Moyenne',
        'Moyen',
        '01 23 45 67 89'
      ]
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'template-microsoft-forms.xlsx');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary-950 to-primary-900 rounded-lg">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Import Excel Microsoft Forms</h2>
              <p className="text-gray-600">Importez les réponses de vos formulaires Microsoft Forms</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowColumnMapping(!showColumnMapping)}
              className="p-2 text-gray-500 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all"
              title="Configuration des colonnes"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={downloadTemplate}
              className="flex items-center space-x-2 px-4 py-2 bg-accent-100 text-accent-800 rounded-lg hover:bg-accent-200 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Télécharger le template</span>
            </button>
          </div>

          {/* Configuration des colonnes */}
          {showColumnMapping && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Configuration des colonnes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries({
                  timestamp: 'Horodateur',
                  email: 'Adresse e-mail',
                  name: 'Nom complet',
                  department: 'Département',
                  title: 'Titre de la demande',
                  description: 'Description'
                }).map(([key, defaultValue]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {defaultValue}
                    </label>
                    <input
                      type="text"
                      value={columnMapping[key as keyof ExcelColumnMapping] || defaultValue}
                      onChange={(e) => setColumnMapping(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder={`Nom de la colonne pour ${defaultValue}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Zone de drop */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragging
                ? 'border-accent-500 bg-accent-50'
                : 'border-gray-300 hover:border-accent-400 hover:bg-accent-50/50'
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 rounded-full ${isDragging ? 'bg-accent-200' : 'bg-gray-100'}`}>
                <Upload className={`h-8 w-8 ${isDragging ? 'text-accent-600' : 'text-gray-500'}`} />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isDragging ? 'Déposez le fichier ici' : 'Glissez-déposez votre fichier Excel'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Formats supportés: .xlsx, .xls
                </p>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-primary-950 to-primary-900 hover:from-accent-500 hover:to-accent-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Traitement en cours...' : 'Sélectionner un fichier'}
                </button>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Résultats */}
          {importResult && (
            <div className="mt-6">
              <div className={`rounded-lg p-4 ${
                importResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-3">
                  {importResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  <h3 className={`font-semibold ${
                    importResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {importResult.success ? 'Import réussi' : 'Erreurs détectées'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600">Lignes totales:</span>
                    <span className="ml-2 font-semibold">{importResult.totalRows}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Lignes traitées:</span>
                    <span className="ml-2 font-semibold">{importResult.processedRows}</span>
                  </div>
                </div>

                {importResult.errors.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-800 mb-2">Erreurs:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {importResult.errors.map((error, index) => (
                        <li key={index} className="text-sm text-red-700">{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {importResult.success && importResult.data.length > 0 && (
                  <div className="mt-4">
                    <p className="text-green-700">
                      {importResult.data.length} ticket(s) ont été créés avec succès !
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelImporter;