'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PreQualAcceptance from '@/components/PreQualAcceptance';
import FullDocumentCollection from '@/components/FullDocumentCollection';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function DealDashboard() {
  const params = useParams();
  const dealId = params.dealId as string;
  
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeal();
  }, [dealId]);

  const fetchDeal = async () => {
    try {
      const response = await fetch(`/api/deals/${dealId}`);
      const data = await response.json();
      setDeal(data);
    } catch (error) {
      console.error('Error fetching deal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptPreQual = async () => {
    try {
      const response = await fetch('/api/accept-prequal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId, accepted: true })
      });

      if (response.ok) {
        await fetchDeal();
      }
    } catch (error) {
      console.error('Error accepting pre-qual:', error);
    }
  };

  const handleDeclinePreQual = async () => {
    const confirmed = confirm('Are you sure you want to decline this pre-qualification?');
    if (!confirmed) return;

    try {
      await fetch('/api/accept-prequal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId, accepted: false })
      });

      window.location.href = '/';
    } catch (error) {
      console.error('Error declining pre-qual:', error);
    }
  };

  const handleDocumentUpload = async (requirementId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dealId', dealId);
    formData.append('requirementId', requirementId);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    await fetchDeal();
  };

  const handleSubmitToBank = async () => {
    try {
      const response = await fetch('/api/submit-to-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId })
      });

      if (response.ok) {
        await fetchDeal();
        alert('Application successfully submitted to the lender!');
      }
    } catch (error) {
      console.error('Error submitting to bank:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Deal not found</p>
      </div>
    );
  }

  const steps = ['Pre-Qualification', 'Document Collection', 'Bank Review', 'Funding'];
  const currentStep = 
    deal.status === 'pre_qualified' ? 0 :
    deal.status === 'pre_qual_accepted' || deal.status === 'full_docs_collection' ? 1 :
    deal.status === 'in_review' ? 2 :
    3;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={steps.length}
        steps={steps}
      />

      <div className="py-8">
        {deal.status === 'pre_qualified' && (
          <PreQualAcceptance
            preQualAmount={deal.preQualAmount}
            bankName={deal.bankMatch}
            dscr={deal.dscr}
            estimatedRate={8.5}
            estimatedTerm={10}
            onAccept={handleAcceptPreQual}
            onDecline={handleDeclinePreQual}
          />
        )}

        {(deal.status === 'pre_qual_accepted' || deal.status === 'full_docs_collection') && (
          <FullDocumentCollection
            dealId={dealId}
            loanType={deal.loanType || 'all'}
            bankId={deal.bankId || 'smartbiz'}
            uploadedDocumentIds={deal.uploadedDocumentIds || []}
            onDocumentUpload={handleDocumentUpload}
            onComplete={handleSubmitToBank}
          />
        )}

        {deal.status === 'in_review' && (
          <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏦</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Under Review</h2>
              <p className="text-gray-600">
                Your application is being reviewed by {deal.bankMatch}. 
                You'll receive an update within 3-5 business days.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
