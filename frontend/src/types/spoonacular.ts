export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  usedIngredients: SpoonacularIngredient[];
  missedIngredients: SpoonacularIngredient[];
}

export interface SpoonacularIngredient {
  id: number;
  name: string;
  original: string;
  image: string;
  amount: number;
  unit: string;
}

export interface SpoonacularNutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export interface SpoonacularRecipeDetail {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  extendedIngredients: SpoonacularIngredient[];
  analyzedInstructions: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: { id: number; name: string; image: string }[];
    }[];
  }[];
  nutrition: {
    nutrients: SpoonacularNutrient[];
  };
}

export interface NutritionStats {
  id: number;
  title: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}
