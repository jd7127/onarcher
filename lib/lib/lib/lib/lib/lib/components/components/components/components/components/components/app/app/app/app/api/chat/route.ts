import { NextRequest, NextResponse } from 'next/server';
import { chatWithArchi } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    const { messages, userType } = await request.json();

    const response = await chatWithArchi(messages);

    const shouldShowDocUpload = response.toLowerCase().includes('upload') || 
                                 response.toLowerCase().includes('document');

    return NextResponse.json({
      message: response,
      showDocUpload: shouldShowDocUpload
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
