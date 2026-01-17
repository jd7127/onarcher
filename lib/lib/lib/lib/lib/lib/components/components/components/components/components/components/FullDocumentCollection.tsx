'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, Loader2, X, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { DocumentRequirement, getRequiredDocuments, getDocumentProgress, BANK_OVERLAYS } from '@/lib/document-requirements';

interface FullDocumentCollectionProps {
  dealId: string;
  loanType: 'all' | 'acquisition' | 'real_estate' | 'startup' | 'franchise';
  bankId: string;
  uploadedDocumentIds: string[];
  onDocumentUpload: (requirementId: string, file: File) => Promise<void>;
  onComplete: () => void;
}

interface UploadStatus {
  [requirementId: string]: {
    status: 'uploading' | 'processing' | 'complete' | 'error';
    fileName?: string;
    error?: string;
  };
}

export default function FullDocumentCollection({
  dealId,
  loanType,
  bankId,
  uploadedDocumentIds,
  onDocumentUpload,
  onComplete
}: FullDocumentCollectionProps) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [requiredDocs, setRequiredDocs] = useState<DocumentRequirement[]>([]);

  useEffect(() => {
    const docs = getRequiredDocuments(loanType, 'full_submission', bankId);
    setRequiredDocs(docs);
    
    const categories = new Set(docs.map(d => d.category));
    setExpandedCategories(categories);
  }, [loanType, bankId]);

  const progress = getDocumentProgress(uploadedDocumentIds, requiredDocs);
  const bankOverlay = BANK_OVERLAYS[bankId];

  const documentsByCategory = requiredDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, DocumentRequirement[]>);

  const handleFileUpload = async (requirement: DocumentRequirement, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    setUploadStatus(prev => ({
      ...prev,
      [requirement.id]: { status: 'uploading', fileName: file.name }
    }));

    try {
      await onDocumentUpload(requirement.id, file);
      
      setUploadStatus(prev => ({
        ...prev,
        [requirement.id]: { status: 'complete', fileName: file.name }
      }));
    } catch (error) {
      setUploadStatus(prev => ({
        ...prev,
        [requirement.id]: { 
          status: 'error', 
          fileName: file.name,
          error: error instanceof Error ? error.message : 'Upload failed'
        }
      }));
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getCategoryProgress = (category: string) => {
    const categoryDocs = documentsByCategory[category];
    const required = categoryDocs.filter(d => d.required);
    const completed = required.filter(d => uploadedDocumentIds.includes(d.id));
    return {
      completed: completed.length,
      total: required.length,
      percentage: required.length > 0 ? Math.round((completed.length / required.length) * 100) : 0
    };
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Loan Application</h2>
        <p className="text-gray-600 mb-4">
          Upload all required documents for full SBA loan approval with {bankOverlay?.bankName || 'your lender'}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-semibold text-blue-600">
              {progress.completed} / {progress.total} documents
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress.percentage}% complete</p>
        </div>

        {bankOverlay && bankOverlay.notes && bankOverlay.notes.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-2">
                  {bankOverlay.bankName} Requirements
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  {bankOverlay.notes.map((note, idx) => (
                    <li key={idx}>• {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(documentsByCategory).map(([category, docs]) => {
          const categoryProgress = getCategoryProgress(category);
          const isExpanded = expandedCategories.has(category);
          const isComplete = categoryProgress.completed === categoryProgress.total;

          return (
            <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isComplete && <CheckCircle className="w-5 h-5 text-green-600" />}
                  <h3 className="text-lg font-bold text-gray-900">{category}</h3>
                  <span className="text-sm text-gray-500">
                    ({categoryProgress.completed}/{categoryProgress.total})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isComplete ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${categoryProgress.percentage}%` }}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-4 space-y-3">
                  {docs.map(doc => {
                    const isUploaded = uploadedDocumentIds.includes(doc.id);
                    const status = uploadStatus[doc.id];

                    return (
                      <div
                        key={doc.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          isUploaded
                            ? 'border-green-200 bg-green-50'
                            : doc.required
                            ? 'border-gray-200 hover:border-blue-300'
                            : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="text-2xl">{doc.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                                {doc.required && !isUploaded && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                    Required
                                  </span>
                                )}
                                {!doc.required && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    Optional
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                              {status?.fileName && (
                                <p className="text-xs text-gray-500 mt-2">📎 {status.fileName}</p>
                              )}
                              {status?.error && (
                                <p className="text-xs text-red-600 mt-2">⚠️ {status.error}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">
                                Accepted formats: {doc.acceptedFormats.join(', ')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!isUploaded && !status && (
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  className="hidden"
                                  accept={doc.acceptedFormats.join(',')}
                                  onChange={(e) => handleFileUpload(doc, e.target.files)}
                                />
                                <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
                                  <Upload className="w-4 h-4" />
                                  Upload
                                </div>
                              </label>
                            )}

                            {status?.status === 'uploading' && (
                              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                            )}

                            {status?.status === 'processing' && (
                              <div className="flex items-center gap-2 text-blue-600">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="text-sm">Processing...</span>
                              </div>
                            )}

                            {isUploaded && (
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-medium">Uploaded</span>
                              </div>
                            )}

                            {status?.status === 'error' && (
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  className="hidden"
                                  accept={doc.acceptedFormats.join(',')}
                                  onChange={(e) => handleFileUpload(doc, e.target.files)}
                                />
                                <div className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium">
                                  <Upload className="w-4 h-4" />
                                  Retry
                                </div>
                              </label>
                            )}
                          </div>
                        </div>
