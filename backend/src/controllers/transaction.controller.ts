import { Request, Response } from "express";
import { getTransactions } from "../services/transaction.service";

export const listTransactions = async (
  req: Request,
  res: Response
) => {
  try {
    const { accountId, category } = req.query;

    const transactions = await getTransactions({
      accountId: accountId as string,
      category: category as string,
    });

    return res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};