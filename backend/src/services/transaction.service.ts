import prisma from "../config/prisma";

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
  }));

  return prisma.transaction.createMany({
    data: transactions,
  });
};