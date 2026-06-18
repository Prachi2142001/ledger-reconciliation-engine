export interface CategoryRule {
  keywords: string[];
  category: string;
}

export let USER_CATEGORY_RULES: CategoryRule[] = [
  {
    keywords: ["ZOMATO"],
    category: "ENTERTAINMENT",
  },
];

export const setUserRules = (rules: CategoryRule[]) => {
  USER_CATEGORY_RULES = rules;
};