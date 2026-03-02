import { ChefHat } from 'lucide-react';
import RecipeCard from './RecipeCard';
import type { SpoonacularRecipe } from '../types/spoonacular';
import { Skeleton } from '@/components/ui/skeleton';

interface RecipeGridProps {
  recipes: SpoonacularRecipe[];
  isLoading: boolean;
  hasSearched: boolean;
  onViewDetail: (id: number) => void;
}

function RecipeCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function RecipeGrid({ recipes, isLoading, hasSearched, onViewDetail }: RecipeGridProps) {
  if (!hasSearched && !isLoading) return null;

  return (
    <section id="recipes" className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        {(isLoading || recipes.length > 0) && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-spice-saffron/15 text-spice-crimson rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <ChefHat className="w-4 h-4" />
              <span>{isLoading ? 'Searching recipes...' : `${recipes.length} recipes found`}</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground">
              {isLoading ? 'Finding Your Recipes' : 'Recommended Recipes'}
            </h2>
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && hasSearched && recipes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
              No Indian Recipes Found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any Indian recipes with those ingredients. Try different ingredients
              or check your spelling.
            </p>
          </div>
        )}

        {/* Recipe grid */}
        {!isLoading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onViewDetail={onViewDetail} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
