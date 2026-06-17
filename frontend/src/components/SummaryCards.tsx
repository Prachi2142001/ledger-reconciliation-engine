import { Summary } from "../types";

interface Props {
  summary: Summary;
}

export default function SummaryCards({ summary }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Total Transactions</p>
        <h3 className="mt-2 text-2xl font-bold">{summary.totalTransactions}</h3>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Total Credits</p>
        <h3 className="mt-2 text-2xl font-bold text-green-600">
          ₹{summary.totalCredits}
        </h3>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Total Debits</p>
        <h3 className="mt-2 text-2xl font-bold text-red-600">
          ₹{summary.totalDebits}
        </h3>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Net Flow</p>
        <h3 className="mt-2 text-2xl font-bold text-blue-600">
          ₹{summary.netFlow}
        </h3>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Consolidated Turnover</p>
        <h3 className="mt-2 text-2xl font-bold text-purple-600">
          ₹{summary.consolidatedTurnover}
        </h3>
      </div>
    </div>
  );
}
