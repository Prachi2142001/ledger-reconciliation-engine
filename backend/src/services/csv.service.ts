import fs from "fs";
import csv from "csv-parser";

export const parseCsv = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
       
        const isEmptyRow = Object.values(row).every(
          (value) => value === "" || value === null || value === undefined,
        );

        if (isEmptyRow) {
          return;
        }

        results.push(row);
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};
