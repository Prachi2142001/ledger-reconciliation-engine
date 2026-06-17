import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { parseCsv } from "../services/csv.service";
import { validateTransactions } from "../validators/transaction.validator";
import { saveTransactions } from "../services/transaction.service";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const rows = await parseCsv(req.file.path);

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
