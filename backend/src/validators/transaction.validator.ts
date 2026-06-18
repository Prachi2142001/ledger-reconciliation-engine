export interface ValidationError {
  row: number;
  field: string;
  error: string;
}

export const validateTransactions = (rows: any[]): ValidationError[] => {
  const errors: ValidationError[] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    if (!row.date) {
      errors.push({
        row: rowNumber,
        field: "date",
        error: "required",
      });
    } else if (isNaN(Date.parse(row.date))) {
      errors.push({
        row: rowNumber,
        field: "date",
        error: "invalid date format",
      });
    }

    if (!row.account_id) {
      errors.push({
        row: rowNumber,
        field: "account_id",
        error: "required",
      });
    }

    if (!row.description) {
      errors.push({
        row: rowNumber,
        field: "description",
        error: "required",
      });
    }

    if (
      row.balance === "" ||
      row.balance === undefined ||
      row.balance === null ||
      isNaN(Number(row.balance))
    ) {
      errors.push({
        row: rowNumber,
        field: "balance",
        error: "not a number",
      });
    }

    const hasDebit =
      row.debit !== "" && row.debit !== undefined && row.debit !== null;

    const hasCredit =
      row.credit !== "" && row.credit !== undefined && row.credit !== null;

    const isOpeningBalance =
      row.description &&
      row.description.toUpperCase().includes("OPENING BALANCE");

    if (hasDebit && hasCredit) {
      errors.push({
        row: rowNumber,
        field: "debit/credit",
        error: "both present",
      });
    }

    if (!hasDebit && !hasCredit && !isOpeningBalance) {
      errors.push({
        row: rowNumber,
        field: "debit/credit",
        error: "neither present",
      });
    }

    if (hasDebit && isNaN(Number(row.debit))) {
      errors.push({
        row: rowNumber,
        field: "debit",
        error: "not a number",
      });
    }

    if (hasCredit && isNaN(Number(row.credit))) {
      errors.push({
        row: rowNumber,
        field: "credit",
        error: "not a number",
      });
    }
  });

  return errors;
};
