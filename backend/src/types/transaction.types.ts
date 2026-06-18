export interface Transaction {
  id: number;
  date: Date;
  accountId: string;
  description: string;
  debit: number | null;
  credit: number | null;
  balance: number;
  category: string | null;
  counterparty: string | null;
  channel: string | null;
}

export interface AccountSummary {
  accountId: string;
  moneyIn: number;
  moneyOut: number;
}