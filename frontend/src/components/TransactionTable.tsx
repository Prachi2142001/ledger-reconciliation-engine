import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  flaggedIds?: Set<number>;
  reconciliation?: any;
}

export default function TransactionTable({ transactions, flaggedIds }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Account</th>
            <th className="text-left p-3">Description</th>
            <th className="text-right p-3">Debit</th>
            <th className="text-right p-3">Credit</th>
            <th className="text-left p-3">Category</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => {
            const isFlagged = flaggedIds?.has(tx.id);

            return (
              <tr
                key={tx.id}
                className={`border-b hover:bg-gray-50 ${
                  isFlagged ? "bg-red-50" : ""
                }`}
              >
                <td className="p-3">
                  {new Date(tx.date).toLocaleDateString()}
                </td>

                <td className="p-3">{tx.accountId}</td>

                <td className="p-3">{tx.description}</td>

                <td className="p-3 text-right text-red-600">
                  {tx.debit ?? "-"}
                </td>

                <td className="p-3 text-right text-green-600">
                  {tx.credit ?? "-"}
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {tx.category}
                    </span>

                    {isFlagged && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        FLAGGED
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
