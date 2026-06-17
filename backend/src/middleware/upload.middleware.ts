import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext !== ".csv" && ext !== ".json") {
      return cb(
        new Error("Only CSV and JSON files are allowed")
      );
    }

    cb(null, true);
  },
});