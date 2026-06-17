import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/", async (_, res) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "asc",
    },
  });

  res.json({
    success: true,
    count: transactions.length,
    data: transactions,
  });
});

export default router;