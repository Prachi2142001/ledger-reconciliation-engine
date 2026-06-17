interface Props {
  flags: {
    duplicates: number;
    transferMatches: number;
    balanceIssues: number;
  };
}

export default function FlagPanel({ flags }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Integrity Flags</h2>

      <div className="space-y-3">
        <div className="flex justify-between bg-gray-50 p-3 rounded">
          <span>Duplicate Rows</span>
          <span className="font-semibold text-red-600">{flags.duplicates}</span>
        </div>

        <div className="flex justify-between bg-gray-50 p-3 rounded">
          <span>Transfer Matches</span>
          <span className="font-semibold text-blue-600">
            {flags.transferMatches}
          </span>
        </div>

        <div className="flex justify-between bg-gray-50 p-3 rounded">
          <span>Balance Issues</span>
          <span className="font-semibold text-orange-600">
            {flags.balanceIssues}
          </span>
        </div>
      </div>
    </div>
  );
}
