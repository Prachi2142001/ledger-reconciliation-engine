import { DEFAULT_CATEGORY_RULES } from "../config/category-rules";
import { USER_CATEGORY_RULES } from "../config/user-rules";

export const categorizeTransaction = (description: string): string => {
  const text = description.toUpperCase();

  for (const rule of USER_CATEGORY_RULES) {
    const matched = rule.keywords.some((keyword: string) =>
      text.includes(keyword.toUpperCase())
    );

    if (matched) {
      return rule.category;
    }
  }

  for (const rule of DEFAULT_CATEGORY_RULES) {
    const matched = rule.keywords.some((keyword: string) =>
      text.includes(keyword.toUpperCase())
    );

    if (matched) {
      return rule.category;
    }
  }

  return "UNCATEGORISED";
};