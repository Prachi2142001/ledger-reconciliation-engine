interface Props {
  categories: Record<string, number>;
}

export default function CategoryBreakdown({ categories }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(categories).map(([category, amount]) => (
          <div key={category} className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">{category}</div>

            <div className="font-bold text-lg mt-1">₹{amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
