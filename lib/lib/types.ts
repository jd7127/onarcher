export type UserType = 'broker' | 'customer';

export interface UserProfile {
  id: string;
  email: string;
  userType: UserType;
  companyName: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  userId: string;
  userEmail: string;
  status: 'collecting_info' | 'documents_pending' | 'underwriting' | 'pre_qualified' | 'pre_qual_accepted' | 'full_docs_collection' | 'in_review' | 'approved' | 'funded' | 'declined';
  businessName: string;
  loanType: 'all' | 'acquisition' | 'real_estate' | 'startup' | 'franchise';
  revenue?: number;
  requestedAmount?: number;
  preQualAmount?: number;
  dscr?: number;
  bankMatch?: string;
  bankId?: string;
  documents: Document[];
  uploadedDocumentIds: string[];
  createdAt: string;
  updatedAt: string;
  preQualAcceptedAt?: string;
}

export interface Document {
  id: string;
  dealId: string;
  requirementId: string;
  type: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  processed: boolean;
  extractedData?: any;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface FinancialData {
  revenue: number;
  cogs: number;
  operatingExpenses: number;
  depreciation: number;
  amortization: number;
  ownerCompensation: number;
  oneTimeExpenses: number;
  personalExpenses: number;
}
