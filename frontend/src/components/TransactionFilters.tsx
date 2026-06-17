interface Props {
  accountFilter: string;
  setAccountFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  monthFilter: string;
  setMonthFilter: (value: string) => void;
  flaggedOnly: boolean;
  setFlaggedOnly: (value: boolean) => void;
}

export default function TransactionFilters({
  accountFilter,
  setAccountFilter,
  categoryFilter,
  setCategoryFilter,
  monthFilter,
  setMonthFilter,
  flaggedOnly,
  setFlaggedOnly,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="grid md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Account"
          value={accountFilter}
          onChange={(e) => setAccountFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          placeholder="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={flaggedOnly}
            onChange={(e) => setFlaggedOnly(e.target.checked)}
          />
          Flagged Only
        </label>
      </div>
    </div>
  );
}
