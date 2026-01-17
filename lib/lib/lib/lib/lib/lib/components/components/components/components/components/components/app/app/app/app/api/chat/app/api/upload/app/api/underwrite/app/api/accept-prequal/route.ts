import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { dealId, accepted } = await request.json();

    if (!accepted) {
      const { error } = await supabaseAdmin
        .from('deals')
        .update({ 
          status: 'declined',
          updatedAt: new Date().toISOString()
        })
        .eq('id', dealId);

      if (error) throw error;

      return NextResponse.json({ success: true, declined: true });
    }

    const { data: deal, error } = await supabaseAdmin
      .from('deals')
      .update({ 
        status: 'pre_qual_accepted',
        preQualAcceptedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .eq('id', dealId)
      .select()
      .single();

    if (error) throw error;

    try {
      await resend.emails.send({
        from: 'ARCHI <[email protected]>',
        to: deal.userEmail,
        subject: 'Pre-Qualification Accepted - Next Steps',
        html: `
          <h2>Congratulations!</h2>
          <p>You've accepted your pre-qualification for $${deal.preQualAmount?.toLocaleString()}.</p>
          <p>Next steps:</p>
          <ol>
            <li>Log back into OnArcher to upload additional required documents</li>
            <li>ARCHI will guide you through the document collection process</li>
            <li>Once complete, we'll submit your application to ${deal.bankMatch} for final review</li>
          </ol>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${dealId}">Continue Application</a></p>
        `
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      deal,
      nextStep: 'full_docs_collection'
    });
  } catch (error) {
    console.error('Accept pre-qual error:', error);
    return NextResponse.json(
      { error: 'Failed to process acceptance' },
      { status: 500 }
    );
  }
}
