import { useQuery } from '@tanstack/react-query';
import type { SpoonacularRecipe, SpoonacularRecipeDetail } from '../types/spoonacular';

const API_KEY = 'f1a04579d22649258b5b03a04d119c6f';
const BASE_URL = 'https://api.spoonacular.com';

export function useSearchRecipes(ingredients: string, enabled: boolean) {
  return useQuery<SpoonacularRecipe[]>({
    queryKey: ['recipes', 'search', ingredients],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=8&cuisine=Indian&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data as SpoonacularRecipe[];
    },
    enabled: enabled && ingredients.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useRecipeDetail(recipeId: number | null) {
  return useQuery<SpoonacularRecipeDetail>({
    queryKey: ['recipe', 'detail', recipeId],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/recipes/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data as SpoonacularRecipeDetail;
    },
    enabled: recipeId !== null,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}
