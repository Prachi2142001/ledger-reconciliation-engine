import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { accountId, category, month } = req.query;

    const where: any = {};

    if (accountId) {
      where.accountId = accountId;
    }

    if (category) {
      where.category = category;
    }

    if (month) {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: {
        date: "asc",
      },
    });

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
});

export default router;