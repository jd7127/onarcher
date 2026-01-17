# OnArcher - SBA Loan Marketplace

SBA loan pre-qualification platform powered by ARCHI (Automated Risk, Cashflow & Human-in-the-loop Intelligence).

## Features

- 🤖 AI-powered conversational underwriting with ARCHI
- 📊 Real-time DSCR calculations
- 📄 Complete SBA document collection workflow
- 🏦 Automated bank matching
- 🎯 Pre-qualification in minutes

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude (Sonnet 4)
- **Email**: Resend
- **Storage**: Supabase Storage

## Setup

### Prerequisites

- Node.js 20+ installed
- Supabase account
- Anthropic API key
- Resend API key

### Environment Variables

Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_key
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

Run this SQL in your Supabase SQL Editor:
```sql
-- See deployment guide for complete schema
```

### Local Development
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy!

## License

Private - All rights reserved
