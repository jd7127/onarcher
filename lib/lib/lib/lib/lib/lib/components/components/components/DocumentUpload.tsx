'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2, X } from 'lucide-react';

interface UploadedDoc {
  name: string;
  type: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
}

const requiredDocs = [
  { id: 'tax_returns', label: 'Business Tax Returns (Last 2 Years)', icon: '📊' },
  { id: 'pl_statement', label: 'Profit & Loss Statement (YTD)', icon: '💰' },
  { id: 'balance_sheet', label: 'Balance Sheet (YTD)', icon: '📈' },
  { id: 'bank_statements', label: 'Bank Statements (Last 6 Months)', icon: '🏦' },
  { id: 'debt_schedule', label: 'Debt Schedule', icon: '📝' },
];

export default function DocumentUpload() {
  const [uploads, setUploads] = useState<Record<string, UploadedDoc>>({});

  const handleFileUpload = async (docId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    setUploads(prev => ({
      ...prev,
      [docId]: { name: file.name, type: docId, status: 'uploading' }
    }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', docId);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setUploads(prev => ({
          ...prev,
          [docId]: { ...prev[docId], status: 'processing' }
        }));

        setTimeout(() => {
          setUploads(prev => ({
            ...prev,
            [docId]: { ...prev[docId], status: 'complete' }
          }));
        }, 2000);
      } else {
        setUploads(prev => ({
          ...prev,
          [docId]: { ...prev[docId], status: 'error' }
        }));
      }
    } catch (error) {
      setUploads(prev => ({
        ...prev,
        [docId]: { ...prev[docId], status: 'error' }
      }));
    }
  };

  const removeUpload = (docId: string) => {
    setUploads(prev => {
      const newUploads = { ...prev };
      delete newUploads[docId];
      return newUploads;
    });
  };

  const allDocsUploaded = requiredDocs.every(doc => 
    uploads[doc.id]?.status === 'complete'
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Upload Required Documents</h3>
        <span className="text-sm text-gray-600">
          {Object.values(uploads).filter(u => u.status === 'complete').length} / {requiredDocs.length} complete
        </span>
      </div>

      <div className="space-y-3">
        {requiredDocs.map(doc => {
          const upload = uploads[doc.id];
          
          return (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{doc.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{doc.label}</p>
                    {upload && (
                      <p className="text-sm text-gray-600 mt-1">{upload.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!upload && (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.id, e.target.files)}
                      />
                      <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                      </div>
                    </label>
                  )}

                  {upload?.status === 'uploading' && (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  )}

                  {upload?.status === 'processing' && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">Processing...</span>
                    </div>
                  )}

                  {upload?.status === 'complete' && (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <button
                        onClick={() => removeUpload(doc.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {upload?.status === 'error' && (
                    <span className="text-sm text-red-600">Upload failed</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allDocsUploaded && (
        <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
          Submit for Pre-Qualification
        </button>
      )}

      <p className="text-xs text-gray-500 text-center">
        Accepted formats: PDF, JPG, PNG • Max file size: 10MB per document
      </p>
    </div>
  );
}
