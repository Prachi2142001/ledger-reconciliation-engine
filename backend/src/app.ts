import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Ledger Reconciliation Engine Running");
});

app.use("/api/upload", uploadRoutes);

export default app;