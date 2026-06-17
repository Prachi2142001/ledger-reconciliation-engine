export const detectRecurringTransactions = (
  transactions: any[]
) => {
  const groups = new Map<string, any[]>();

  transactions.forEach((txn) => {
    const amount = txn.credit || txn.debit;

    const key = `${txn.description}_${amount}`;

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key)?.push(txn);
  });

  const recurringTransactions: any[] = [];

  groups.forEach((txns) => {
    if (txns.length < 2) {
      return;
    }

    const sorted = txns.sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

    const gaps: number[] = [];

    for (let i = 1; i < sorted.length; i++) {
      const diff =
        (new Date(sorted[i].date).getTime() -
          new Date(sorted[i - 1].date).getTime()) /
        (1000 * 60 * 60 * 24);

      gaps.push(diff);
    }

    const monthly = gaps.every(
      (gap) => gap >= 25 && gap <= 35
    );

    recurringTransactions.push({
      description: sorted[0].description,
      amount: sorted[0].credit || sorted[0].debit,
      occurrences: sorted.length,
      recurrence: monthly ? "MONTHLY" : "RECURRING",
    });
  });

  return recurringTransactions;
};