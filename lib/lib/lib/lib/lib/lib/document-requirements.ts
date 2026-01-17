export interface DocumentRequirement {
  id: string;
  category: string;
  name: string;
  description: string;
  required: boolean;
  forPreQual: boolean;
  forFullSubmission: boolean;
  applicableFor?: 'all' | 'acquisition' | 'real_estate' | 'startup' | 'franchise';
  icon: string;
  acceptedFormats: string[];
}

export const SBA_DOCUMENT_REQUIREMENTS: DocumentRequirement[] = [
  {
    id: 'sba_form_1919',
    category: 'Application Forms',
    name: 'SBA Form 1919 - Borrower Information Form',
    description: 'Required for all co-applicants and 20%+ owners (must be within 90 days)',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📋',
    acceptedFormats: ['.pdf', '.jpg', '.png']
  },
  {
    id: 'sba_form_1920',
    category: 'Application Forms',
    name: 'SBA Form 1920 - Lender Application',
    description: 'Completed by lender (must be within 90 days)',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📋',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'personal_financial_statement',
    category: 'Personal Documents',
    name: 'Personal Financial Statement (SBA Form 413)',
    description: 'For all 20%+ owners, spouses, and guarantors (within 90 days)',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '💰',
    acceptedFormats: ['.pdf', '.xlsx']
  },
  {
    id: 'personal_tax_returns',
    category: 'Personal Documents',
    name: 'Personal Tax Returns (3 Years)',
    description: 'Signed federal tax returns for all 20%+ owners',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📄',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'government_id',
    category: 'Personal Documents',
    name: 'Government-Issued Photo ID',
    description: "Driver's license or passport for all 20%+ owners",
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '🪪',
    acceptedFormats: ['.pdf', '.jpg', '.png']
  },
  {
    id: 'resume',
    category: 'Personal Documents',
    name: 'Resume / Management Profile',
    description: 'Professional background for all principals',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📝',
    acceptedFormats: ['.pdf', '.docx']
  },
  {
    id: 'business_tax_returns',
    category: 'Business Financials',
    name: 'Business Tax Returns (3 Years)',
    description: 'Complete federal tax returns with all schedules',
    required: true,
    forPreQual: true,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📊',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'current_pl',
    category: 'Business Financials',
    name: 'Current Profit & Loss Statement',
    description: 'YTD P&L within 90 days of submission',
    required: true,
    forPreQual: true,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '💰',
    acceptedFormats: ['.pdf', '.xlsx']
  },
  {
    id: 'current_balance_sheet',
    category: 'Business Financials',
    name: 'Current Balance Sheet',
    description: 'Within 120 days of submission',
    required: true,
    forPreQual: true,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📈',
    acceptedFormats: ['.pdf', '.xlsx']
  },
  {
    id: 'bank_statements',
    category: 'Business Financials',
    name: 'Business Bank Statements (6 Months)',
    description: 'Last 6 months of business bank statements',
    required: true,
    forPreQual: true,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '🏦',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'debt_schedule',
    category: 'Business Financials',
    name: 'Business Debt Schedule',
    description: 'All current business debts with terms and balances',
    required: true,
    forPreQual: true,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📝',
    acceptedFormats: ['.pdf', '.xlsx']
  },
  {
    id: 'cash_flow_projections',
    category: 'Business Financials',
    name: 'Cash Flow Projections',
    description: '2-3 year projections with assumptions',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📊',
    acceptedFormats: ['.pdf', '.xlsx']
  },
  {
    id: 'business_plan',
    category: 'Business Documents',
    name: 'Business Plan',
    description: 'Detailed plan with use of proceeds',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📖',
    acceptedFormats: ['.pdf', '.docx']
  },
  {
    id: 'business_licenses',
    category: 'Business Documents',
    name: 'Business Licenses & Permits',
    description: 'All applicable licenses and permits',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📜',
    acceptedFormats: ['.pdf', '.jpg', '.png']
  },
  {
    id: 'articles_of_incorporation',
    category: 'Business Documents',
    name: 'Articles of Incorporation/Organization',
    description: 'Business formation documents',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '🏢',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'operating_agreement',
    category: 'Business Documents',
    name: 'Operating Agreement/Bylaws',
    description: 'Corporate governance documents',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '📋',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'lease_agreement',
    category: 'Business Documents',
    name: 'Commercial Lease Agreement',
    description: 'Current business lease (if applicable)',
    required: false,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'all',
    icon: '🏪',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'purchase_agreement',
    category: 'Acquisition Documents',
    name: 'Business/Asset Purchase Agreement',
    description: 'Signed agreement to purchase business',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'acquisition',
    icon: '📄',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'letter_of_intent',
    category: 'Acquisition Documents',
    name: 'Letter of Intent',
    description: 'Signed LOI to purchase business',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'acquisition',
    icon: '✉️',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'business_valuation',
    category: 'Acquisition Documents',
    name: 'Business Valuation',
    description: 'Third-party valuation or broker opinion',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'acquisition',
    icon: '💎',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'seller_tax_returns',
    category: 'Acquisition Documents',
    name: "Seller's Tax Returns (3 Years)",
    description: 'Business tax returns from current owner',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'acquisition',
    icon: '📊',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'seller_financials',
    category: 'Acquisition Documents',
    name: "Seller's Financial Statements (3 Years)",
    description: 'P&L and Balance Sheets from seller',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'acquisition',
    icon: '📈',
    acceptedFormats: ['.pdf', '.xlsx']
  },
  {
    id: 'real_estate_purchase_agreement',
    category: 'Real Estate Documents',
    name: 'Real Estate Purchase Agreement',
    description: 'Agreement for property purchase',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'real_estate',
    icon: '🏢',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'property_appraisal',
    category: 'Real Estate Documents',
    name: 'Property Appraisal',
    description: 'Third-party appraisal of property',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'real_estate',
    icon: '🏘️',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'environmental_report',
    category: 'Real Estate Documents',
    name: 'Environmental Investigation Report',
    description: 'Phase I or Phase II environmental assessment',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'real_estate',
    icon: '🌍',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'franchise_agreement',
    category: 'Franchise Documents',
    name: 'Franchise Agreement',
    description: 'Signed franchise agreement',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'franchise',
    icon: '🏪',
    acceptedFormats: ['.pdf']
  },
  {
    id: 'franchise_disclosure_document',
    category: 'Franchise Documents',
    name: 'Franchise Disclosure Document (FDD)',
    description: 'Complete FDD from franchisor',
    required: true,
    forPreQual: false,
    forFullSubmission: true,
    applicableFor: 'franchise',
    icon: '📋',
    acceptedFormats: ['.pdf']
  }
];

export interface BankOverlay {
  bankId: string;
  bankName: string;
  additionalRequirements: DocumentRequirement[];
  modifiedRequirements: {
    documentId: string;
    changes: Partial<DocumentRequirement>;
  }[];
  minimumCreditScore?: number;
  minimumDSCR?: number;
  maximumLTV?: number;
  notes?: string[];
}

export const BANK_OVERLAYS: Record<string, BankOverlay> = {
  'smartbiz': {
    bankId: 'smartbiz',
    bankName: 'SmartBiz Bank',
    additionalRequirements: [
      {
        id: 'smartbiz_questionnaire',
        category: 'Bank-Specific',
        name: 'SmartBiz Supplemental Questionnaire',
        description: 'Additional business information form',
        required: true,
        forPreQual: false,
        forFullSubmission: true,
        applicableFor: 'all',
        icon: '📝',
        acceptedFormats: ['.pdf']
      },
      {
        id: 'smartbiz_insurance_quote',
        category: 'Bank-Specific',
        name: 'Business Insurance Quote',
        description: 'Current insurance coverage or quote',
        required: true,
        forPreQual: false,
        forFullSubmission: true,
        applicableFor: 'all',
        icon: '🛡️',
        acceptedFormats: ['.pdf']
      }
    ],
    modifiedRequirements: [
      {
        documentId: 'bank_statements',
        changes: {
          description: 'Last 12 months of business bank statements (SmartBiz requires 12 vs standard 6)'
        }
      }
    ],
    minimumCreditScore: 680,
    minimumDSCR: 1.25,
    maximumLTV: 0.85,
    notes: [
      'SmartBiz requires 12 months of bank statements instead of 6',
      'Personal guarantees required for all 20%+ owners',
      'Business must have been operating for at least 2 years',
      'Minimum FICO score of 680 for all guarantors'
    ]
  }
};

export function getRequiredDocuments(
  loanType: 'all' | 'acquisition' | 'real_estate' | 'startup' | 'franchise',
  stage: 'pre_qual' | 'full_submission',
  bankId?: string
): DocumentRequirement[] {
  let requirements = SBA_DOCUMENT_REQUIREMENTS.filter(doc => {
    const stageMatch = stage === 'pre_qual' ? doc.forPreQual : doc.forFullSubmission;
    const typeMatch = doc.applicableFor === 'all' || doc.applicableFor === loanType;
    return stageMatch && typeMatch;
  });

  if (bankId && BANK_OVERLAYS[bankId]) {
    const overlay = BANK_OVERLAYS[bankId];
    
    if (stage === 'full_submission') {
      requirements = [...requirements, ...overlay.additionalRequirements];
    }
    
    requirements = requirements.map(doc => {
      const modification = overlay.modifiedRequirements.find(m => m.documentId === doc.id);
      if (modification) {
        return { ...doc, ...modification.changes };
      }
      return doc;
    });
  }

  return requirements;
}

export function getDocumentProgress(
  uploadedDocuments: string[],
  requiredDocuments: DocumentRequirement[]
): {
  completed: number;
  total: number;
  percentage: number;
  missing: DocumentRequirement[];
} {
  const requiredIds = requiredDocuments.filter(d => d.required).map(d => d.id);
  const completed = requiredIds.filter(id => uploadedDocuments.includes(id)).length;
  const total = requiredIds.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const missing = requiredDocuments.filter(d => d.required && !uploadedDocuments.includes(d.id));

  return { completed, total, percentage, missing };
}
