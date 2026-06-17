import { Router } from "express";
import { reconcileTransactions } from "../controllers/reconciliation.controller";

const router = Router();

router.get("/", reconcileTransactions);

export default router;