export interface Summary {
  totalTransactions: number;
  totalCredits: number;
  totalDebits: number;
  netFlow: number;
  consolidatedTurnover: number;
  categoryBreakdown: Record<string, number>;
  recurringItems: any[];
  flags: {
    duplicates: number;
    transferMatches: number;
    balanceIssues: number;
  };
}

export interface Transaction {
  id: number;
  date: string;
  accountId: string;
  description: string;
  debit?: number | null;
  credit?: number | null;
  balance: number;
  counterparty: string | null;
  channel: string | null;
  category: string;
}