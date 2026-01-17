'use client';

import { CheckCircle, TrendingUp, Building2, Clock, FileText } from 'lucide-react';

interface PreQualAcceptanceProps {
  preQualAmount: number;
  bankName: string;
  dscr: number;
  estimatedRate: number;
  estimatedTerm: number;
  onAccept: () => void;
  onDecline: () => void;
}

export default function PreQualAcceptance({
  preQualAmount,
  bankName,
  dscr,
  estimatedRate,
  estimatedTerm,
  onAccept,
  onDecline
}: PreQualAcceptanceProps) {
  const monthlyPayment = calculateMonthlyPayment(preQualAmount, estimatedRate, estimatedTerm);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">
            Congratulations! You're Pre-Qualified
          </h2>
          <p className="text-center text-green-100">
            ARCHI has analyzed your application and matched you with a lender
          </p>
        </div>

        <div className="p-8">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">Pre-Qualified Loan Amount</p>
              <p className="text-5xl font-bold text-blue-600">
                ${preQualAmount.toLocaleString()}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-blue-200">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Estimated Rate</p>
                <p className="text-lg font-bold text-gray-900">{estimatedRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Term</p>
                <p className="text-lg font-bold text-gray-900">{estimatedTerm} years</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Monthly Payment</p>
                <p className="text-lg font-bold text-gray-900">${monthlyPayment.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Matched Lender</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-gray-900">{bankName}</p>
              <p className="text-sm text-gray-600 mt-1">
                SBA Preferred Lender • Fast approval process • Competitive rates
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Strong Cash Flow Analysis</h4>
            </div>
            <p className="text-sm text-green-800">
              Your Debt Service Coverage Ratio (DSCR) of <span className="font-bold">{dscr.toFixed(2)}x</span> indicates 
              strong ability to service this loan.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gray-700" />
              <h4 className="font-semibold text-gray-900">Next Steps</h4>
            </div>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Accept this pre-qualification offer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Upload additional required documents with ARCHI's guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>Complete application review with {bankName}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">4.</span>
                <span>Receive final loan approval and funding</span>
              </li>
            </ol>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onAccept}
              className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-lg flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Accept & Continue
            </button>
            <button
              onClick={onDecline}
              className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Decline
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            * Pre-qualification is not a guarantee of final loan approval. Final approval subject to 
            complete documentation review and lender underwriting.
          </p>
        </div>
      </div>
    </div>
  );
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return Math.round(payment);
}
