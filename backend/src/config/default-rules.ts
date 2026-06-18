export interface CategoryRule {
  keywords: string[];
  category: string;
}

export const DEFAULT_CATEGORY_RULES: CategoryRule[] = [
  {
    keywords: ["SALARY"],
    category: "SALARY",
  },
  {
    keywords: ["NETFLIX"],
    category: "ENTERTAINMENT",
  },
  {
    keywords: ["SWIGGY", "ZOMATO"],
    category: "FOOD",
  },
  {
    keywords: ["EMI"],
    category: "EMI",
  },
  {
    keywords: ["REFUND"],
    category: "REFUND",
  },
  {
    keywords: ["TRANSFER"],
    category: "TRANSFER",
  },
  {
    keywords: ["ELECTRICITY", "POWER", "BILL"],
    category: "UTILITY",
  },
  {
    keywords: ["WATER"],
    category: "UTILITY",
  },
  {
    keywords: ["GAS"],
    category: "UTILITY",
  },
];