import { FinancialData } from './types';

export interface DSCRResult {
  dscr: number;
  dscrStatus: 'Strong' | 'Acceptable' | 'Marginal' | 'Weak';
  cashFlowForDebtService: number;
  annualDebtService: number;
  monthlyPayment: number;
  maxLoanAt125: number;
  maxLoanAt115: number;
  ebitda: number;
  adjustedEbitda: number;
}

export function calculateDSCR(
  financials: FinancialData,
  proposedLoanAmount: number,
  interestRate: number,
  loanTermYears: number
): DSCRResult {
  const ebitda = financials.revenue - financials.cogs - financials.operatingExpenses + 
                 financials.depreciation + financials.amortization;
  
  const adjustedEbitda = ebitda + financials.oneTimeExpenses + financials.personalExpenses;
  
  const ownerBenefitAddback = financials.ownerCompensation * 0.5;
  
  const cashFlowForDebtService = adjustedEbitda + ownerBenefitAddback;
  
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  const monthlyPayment = proposedLoanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const annualDebtService = monthlyPayment * 12;
  
  const dscr = cashFlowForDebtService / annualDebtService;
  
  let dscrStatus: 'Strong' | 'Acceptable' | 'Marginal' | 'Weak';
  if (dscr >= 1.25) dscrStatus = 'Strong';
  else if (dscr >= 1.15) dscrStatus = 'Acceptable';
  else if (dscr >= 1.0) dscrStatus = 'Marginal';
  else dscrStatus = 'Weak';
  
  const maxAnnualDebtAt125 = cashFlowForDebtService / 1.25;
  const maxMonthlyAt125 = maxAnnualDebtAt125 / 12;
  const maxLoanAt125 = maxMonthlyAt125 * 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
  
  const maxAnnualDebtAt115 = cashFlowForDebtService / 1.15;
  const maxMonthlyAt115 = maxAnnualDebtAt115 / 12;
  const maxLoanAt115 = maxMonthlyAt115 * 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
  
  return {
    dscr,
    dscrStatus,
    cashFlowForDebtService,
    annualDebtService,
    monthlyPayment,
    maxLoanAt125,
    maxLoanAt115,
    ebitda,
    adjustedEbitda
  };
}

export function determinePreQualAmount(dscrResult: DSCRResult, requestedAmount: number): number {
  if (dscrResult.dscrStatus === 'Strong' || dscrResult.dscrStatus === 'Acceptable') {
    return Math.min(dscrResult.maxLoanAt125, requestedAmount);
  }
  
  if (dscrResult.dscrStatus === 'Marginal') {
    return Math.min(dscrResult.maxLoanAt115, requestedAmount);
  }
  
  return 0;
}
