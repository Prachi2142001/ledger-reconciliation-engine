import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { parseCsv } from "../services/csv.service";
import { validateTransactions } from "../validators/transaction.validator";
import { saveTransactions } from "../services/transaction.service";
import { categorizeTransaction } from "../services/categorization.service";
import { detectRecurringTransactions } from "../services/recurrence.service";
import fs from "fs";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    let rows: any[] = [];

    const ext = req.file.originalname.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      rows = await parseCsv(req.file.path);
    } else if (ext === "json") {
      const fileContent = fs.readFileSync(req.file.path, "utf-8");

      rows = JSON.parse(fileContent);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
      });
    }
    const recurring = detectRecurringTransactions(rows);

    console.log("Recurring Transactions:", recurring);

    const validationErrors = validateTransactions(rows);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors,
      });
    }

    const result = await saveTransactions(rows);

    return res.json({
      success: true,
      totalRows: result.count,
      message: "Transactions saved successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to parse CSV",
    });
  }
});

export default router;
