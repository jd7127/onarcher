import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';
import { getRequiredDocuments } from '@/lib/document-requirements';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { dealId } = await request.json();

    const { data: deal, error: dealError } = await supabaseAdmin
      .from('deals')
      .select('*')
      .eq('id', dealId)
      .single();

    if (dealError) throw dealError;

    const requiredDocs = getRequiredDocuments(
      deal.loanType || 'all',
      'full_submission',
      deal.bankId
    );
    
    const requiredIds = requiredDocs.filter(d => d.required).map(d => d.id);
    const missingDocs = requiredIds.filter(id => !deal.uploadedDocumentIds.includes(id));

    if (missingDocs.length > 0) {
      return NextResponse.json(
        { error: 'Missing required documents', missingDocs },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from('deals')
      .update({ 
        status: 'in_review',
        submittedToBankAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .eq('id', dealId);

    if (updateError) throw updateError;

    try {
      await resend.emails.send({
        from: 'ARCHI <[email protected]>',
        to: deal.userEmail,
        subject: 'Application Submitted to Lender',
        html: `
          <h2>Your Application Has Been Submitted!</h2>
          <p>Great news! Your complete SBA loan application has been submitted to ${deal.bankMatch} for review.</p>
          <p><strong>What happens next:</strong></p>
          <ol>
            <li>The lender will review your complete application package</li>
            <li>You may be contacted for any clarifications or additional information</li>
            <li>The lender will conduct their final underwriting and pull your eTran score</li>
            <li>You'll receive a final loan decision within 3-5 business days</li>
          </ol>
          <p>We'll keep you updated on the progress!</p>
        `
      });

      await resend.emails.send({
        from: 'OnArcher Platform <[email protected]>',
        to: getBankEmail(deal.bankId),
        subject: `New SBA Loan Application - ${deal.businessName}`,
        html: `
          <h2>New Loan Application Ready for Review</h2>
          <p><strong>Business:</strong> ${deal.businessName}</p>
          <p><strong>Pre-Qualified Amount:</strong> $${deal.preQualAmount?.toLocaleString()}</p>
          <p><strong>DSCR:</strong> ${deal.dscr?.toFixed(2)}x</p>
          <p><strong>Deal ID:</strong> ${dealId}</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/bank/review/${dealId}">Review Application</a></p>
          <p>All required documents have been uploaded and verified.</p>
        `
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Application submitted to bank for review'
    });
  } catch (error) {
    console.error('Submit to bank error:', error);
    return NextResponse.json(
      { error: 'Failed to submit to bank' },
      { status: 500 }
    );
  }
}

function getBankEmail(bankId: string): string {
  const bankEmails: Record<string, string> = {
    'smartbiz': '[email protected]',
  };
  return bankEmails[bankId] || '[email protected]';
}
