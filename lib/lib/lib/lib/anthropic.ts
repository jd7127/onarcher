import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function chatWithArchi(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt?: string
) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: systemPrompt || `You are ARCHI (Automated Risk, Cashflow & Human-in-the-loop Intelligence), 
an AI underwriting assistant for OnArcher, an SBA loan marketplace. You help brokers and customers 
through the pre-qualification process by collecting information in a friendly, conversational way.

Your goals:
1. Collect KYC/KYB information (name, business name, contact info)
2. Gather financial information for DSCR calculation
3. Guide document upload process
4. Explain the underwriting process clearly
5. Be professional but warm and encouraging

Keep responses concise and actionable. Ask one question at a time.`,
    messages: messages.map(m => ({
      role: m.role,
      content: m.content
    }))
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

export async function extractFinancialData(documentText: string) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: `You are a financial document analyzer. Extract key financial metrics from the provided document.
Return ONLY a JSON object with these fields (use 0 if not found):
{
  "revenue": number,
  "cogs": number,
  "operatingExpenses": number,
  "depreciation": number,
  "amortization": number,
  "ownerCompensation": number,
  "netIncome": number
}`,
    messages: [{
      role: 'user',
      content: `Extract financial data from this document:\n\n${documentText.substring(0, 50000)}`
    }]
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
  
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return {};
}
