import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes";
import transactionRoutes from "./routes/transaction.routes";
import reconciliationRoutes from "./routes/reconciliation.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Ledger Reconciliation Engine Running");
});

app.use("/api/upload", uploadRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reconcile", reconciliationRoutes);

export default app;
