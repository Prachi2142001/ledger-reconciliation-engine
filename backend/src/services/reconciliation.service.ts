import prisma from "../config/prisma";
import { detectRecurringTransactions } from "./recurrence.service";

export const checkRunningBalance = (transactions: any[]) => {
  const issues: any[] = [];

  const accounts = transactions.reduce((acc: any, tx: any) => {
    if (!acc[tx.accountId]) {
      acc[tx.accountId] = [];
    }

    acc[tx.accountId].push(tx);
    return acc;
  }, {});

  for (const accountId in accounts) {
    const rows = accounts[accountId];

    rows.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    for (let i = 1; i < rows.length; i++) {
      const previous = rows[i - 1];
      const current = rows[i];

      const expected =
        previous.balance - (current.debit || 0) + (current.credit || 0);

      if (Number(expected.toFixed(2)) !== current.balance) {
        issues.push({
          account: accountId,
          row: i + 1,
          expected,
          actual: current.balance,
          delta: current.balance - expected,
        });
      }
    }
  }

  return issues;
};

export const detectDuplicates = (transactions: any[]) => {
  const issues: any[] = [];
  const seen = new Set();

  transactions.forEach((tx) => {
    const key = [
      tx.accountId,
      tx.date.toISOString(),
      tx.description,
      tx.debit,
      tx.credit,
      tx.balance,
    ].join("|");

    if (seen.has(key)) {
      issues.push({
        issue: "duplicate_row",
        account: tx.accountId,
        transactionId: tx.id,
      });
    }

    seen.add(key);
  });

  return issues;
};

export const detectOutOfOrderDates = (transactions: any[]) => {
  const issues: any[] = [];

  const accounts = transactions.reduce((acc: any, tx: any) => {
    if (!acc[tx.accountId]) acc[tx.accountId] = [];
    acc[tx.accountId].push(tx);
    return acc;
  }, {});

  for (const accountId in accounts) {
    const rows = accounts[accountId];

    for (let i = 1; i < rows.length; i++) {
      if (
        new Date(rows[i].date).getTime() < new Date(rows[i - 1].date).getTime()
      ) {
        issues.push({
          issue: "out_of_order_date",
          account: accountId,
          transactionId: rows[i].id,
        });
      }
    }
  }

  return issues;
};

export const detectBothDebitCredit = (transactions: any[]) => {
  return transactions
    .filter((tx) => tx.debit && tx.credit)
    .map((tx) => ({
      issue: "both_debit_credit",
      account: tx.accountId,
      transactionId: tx.id,
    }));
};

export const detectNeitherDebitCredit = (transactions: any[]) => {
  return transactions
    .filter((tx) => !tx.debit && !tx.credit)
    .map((tx) => ({
      issue: "neither_debit_credit",
      account: tx.accountId,
      transactionId: tx.id,
    }));
};

export const detectTransfers = (transactions: any[]) => {
  const matches: any[] = [];

  const debits = transactions.filter((t) => t.debit);
  const credits = transactions.filter((t) => t.credit);

  for (const debitTx of debits) {
    const match = credits.find(
      (creditTx) =>
        creditTx.accountId !== debitTx.accountId &&
        creditTx.credit === debitTx.debit &&
        Math.abs(
          new Date(creditTx.date).getTime() - new Date(debitTx.date).getTime(),
        ) <=
          3 * 24 * 60 * 60 * 1000,
    );

    if (match) {
      matches.push({
        fromAccount: debitTx.accountId,
        toAccount: match.accountId,
        amount: debitTx.debit,
        debitTransactionId: debitTx.id,
        creditTransactionId: match.id,
      });
    }
  }

  return matches;
};

export const getSummary = async () => {
  const transactions = await prisma.transaction.findMany();

  const totalCredits = transactions.reduce(
    (sum, tx) => sum + (tx.credit || 0),
    0,
  );

  const totalDebits = transactions.reduce(
    (sum, tx) => sum + (tx.debit || 0),
    0,
  );

  const categoryBreakdown = transactions.reduce(
    (acc: Record<string, number>, tx) => {
      const category = tx.category || "UNCATEGORISED";

      acc[category] = (acc[category] || 0) + (tx.debit || 0) + (tx.credit || 0);

      return acc;
    },
    {},
  );

  const recurringItems = detectRecurringTransactions(transactions);

  const duplicateFlags = detectDuplicates(transactions);

  const transferMatches = detectTransfers(transactions);

  const balanceIssues = checkRunningBalance(transactions);

  return {
    totalTransactions: transactions.length,
    totalCredits,
    totalDebits,
    netFlow: totalCredits - totalDebits,
    categoryBreakdown,
    recurringItems,
    flags: {
      duplicates: duplicateFlags.length,
      transferMatches: transferMatches.length,
      balanceIssues: balanceIssues.length,
    },
  };
};
