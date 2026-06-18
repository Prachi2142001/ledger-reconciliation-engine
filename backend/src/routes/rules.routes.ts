import { Router } from "express";
import fs from "fs";
import path from "path";
import { upload } from "../middleware/upload.middleware";
import { CategoryRule, setUserRules } from "../config/user-rules";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (path.extname(req.file.originalname).toLowerCase() !== ".json") {
      return res.status(400).json({
        success: false,
        message: "Rules file must be JSON",
      });
    }

    const content = fs.readFileSync(req.file.path, "utf-8");

    const rules: CategoryRule[] = JSON.parse(content);

    setUserRules(rules);

    return res.json({
      success: true,
      message: "User rules updated successfully",
      rules,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: "Invalid rules file",
    });
  }
});

export default router;