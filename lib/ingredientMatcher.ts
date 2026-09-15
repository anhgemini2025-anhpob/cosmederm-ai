import type { Ingredient } from "./types";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function splitIngredientList(raw: string): string[] {
  return raw
    .split(/[,;•\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && !/^\d+$/.test(s));
}

export interface MatchResult {
  token: string;
  ingredient: Ingredient | null;
}

export function matchIngredients(tokens: string[], database: Ingredient[]): MatchResult[] {
  const normalizedDb = database.map((ing) => ({ ing, norm: normalize(ing.inci_name) }));

  return tokens.map((token) => {
    const normToken = normalize(token);
    if (normToken.length < 3) return { token, ingredient: null };

    let best: Ingredient | null = null;
    for (const { ing, norm } of normalizedDb) {
      if (norm === normToken) {
        best = ing;
        break;
      }
      if (norm.includes(normToken) || normToken.includes(norm)) {
        if (!best) best = ing;
      }
    }
    return { token, ingredient: best };
  });
}
