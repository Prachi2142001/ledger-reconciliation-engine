import { Router } from "express";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post("/", upload.single("file"), (req, res) => {
  res.json({
    success: true,
    filename: req.file?.filename,
    originalName: req.file?.originalname,
  });
});

export default router;