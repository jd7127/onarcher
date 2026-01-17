import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { dealId: string } }
) {
  try {
    const { data: deal, error } = await supabaseAdmin
      .from('deals')
      .select('*')
      .eq('id', params.dealId)
      .single();

    if (error) throw error;

    return NextResponse.json(deal);
  } catch (error) {
    console.error('Get deal error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deal' },
      { status: 500 }
    );
  }
}
