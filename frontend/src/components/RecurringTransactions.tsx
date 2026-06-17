interface Props {
  items: any[];
}

export default function RecurringTransactions({ items }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Recurring Transactions</h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="font-medium">{item.description}</div>

            <div className="text-sm text-gray-500 mt-1">
              Amount: ₹{item.amount}
            </div>

            <div className="text-sm text-gray-500">
              Count: {item.occurrences}
            </div>

            <div className="text-xs text-blue-600 font-medium mt-1">
              {item.recurrence}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
