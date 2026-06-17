import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  checkRunningBalance,
  detectDuplicates,
  detectOutOfOrderDates,
  detectBothDebitCredit,
  detectNeitherDebitCredit,
  detectTransfers,
  getSummary,
} from "../services/reconciliation.service";

export const reconcileTransactions = async (req: Request, res: Response) => {
  const transactions = await prisma.transaction.findMany();
  const runningBalanceIssues = checkRunningBalance(transactions);
  const duplicateIssues = detectDuplicates(transactions);
  const outOfOrderIssues = detectOutOfOrderDates(transactions);
  const bothIssues = detectBothDebitCredit(transactions);
  const neitherIssues = detectNeitherDebitCredit(transactions);
  const transfers = detectTransfers(transactions);
  const summary = await getSummary();

  res.json({
    success: true,
    summary,
    runningBalanceIssues,
    duplicateIssues,
    outOfOrderIssues,
    bothIssues,
    neitherIssues,
    transfers,
  });
};
