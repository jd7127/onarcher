import { NextRequest, NextResponse } from 'next/server';
import { calculateDSCR, determinePreQualAmount } from '@/lib/dscr-calculator';
import { FinancialData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { financials, requestedAmount, interestRate, loanTermYears } = await request.json();

    const dscrResult = calculateDSCR(
      financials as FinancialData,
      requestedAmount || 250000,
      interestRate || 8.5,
      loanTermYears || 10
    );

    const preQualAmount = determinePreQualAmount(dscrResult, requestedAmount || 250000);

    const bankMatch = {
      name: 'SmartBiz Bank',
      preQualAmount,
      estimatedRate: interestRate || 8.5,
      estimatedTerm: loanTermYears || 10
    };

    return NextResponse.json({
      success: true,
      dscrResult,
      preQualAmount,
      bankMatch,
      qualifies: preQualAmount > 0
    });
  } catch (error) {
    console.error('Underwrite API error:', error);
    return NextResponse.json(
      { error: 'Failed to underwrite' },
      { status: 500 }
    );
  }
}
