const requiredColumns = [
  "date",
  "account_id",
  "description",
  "debit",
  "credit",
  "balance",
  "counterparty",
  "channel",
];

export const validateSchema = (rows: any[]) => {
  if (!rows.length) {
    return {
      valid: false,
      error: "File is empty",
    };
  }

  const headers = Object.keys(rows[0]);

  for (const column of requiredColumns) {
    if (!headers.includes(column)) {
      return {
        valid: false,
        error: `Missing required column: ${column}`,
      };
    }
  }

  return {
    valid: true,
  };
};