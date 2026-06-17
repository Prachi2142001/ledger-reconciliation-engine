import prisma from "../config/prisma";
import { categorizeTransaction } from "./categorization.service";

export const saveTransactions = async (rows: any[]) => {
  const transactions = rows.map((row) => ({
    date: new Date(row.date),
    accountId: row.account_id,
    description: row.description || "",
    debit: row.debit ? Number(row.debit) : null,
    credit: row.credit ? Number(row.credit) : null,
    balance: Number(row.balance),
    counterparty: row.counterparty || null,
    channel: row.channel || null,
    category: categorizeTransaction(row.description || ""),
  }));

  console.log(JSON.stringify(transactions, null, 2));
  return prisma.transaction.createMany({
    data: transactions,
  });
};

export const getTransactions = async (filters: {
  accountId?: string;
  category?: string;
}) => {
  return prisma.transaction.findMany({
    where: {
      ...(filters.accountId && {
        accountId: filters.accountId,
      }),
      ...(filters.category && {
        category: filters.category,
      }),
    },
    orderBy: {
      date: "desc",
    },
  });
};
