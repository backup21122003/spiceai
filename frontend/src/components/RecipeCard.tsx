import { Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import type { SpoonacularRecipe } from '../types/spoonacular';

interface RecipeCardProps {
  recipe: SpoonacularRecipe;
  onViewDetail: (id: number) => void;
}

export default function RecipeCard({ recipe, onViewDetail }: RecipeCardProps) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border card-hover cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://via.placeholder.com/312x231?text=Recipe+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            <CheckCircle className="w-3 h-3" />
            {recipe.usedIngredientCount} used
          </span>
        </div>
        {recipe.missedIngredientCount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 bg-spice-saffron/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
              <AlertCircle className="w-3 h-3" />
              {recipe.missedIngredientCount} missing
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-base leading-snug mb-3 line-clamp-2 group-hover:text-spice-crimson transition-colors">
          {recipe.title}
        </h3>

        {/* Ingredient match bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Ingredient match</span>
            <span className="font-medium text-spice-crimson">
              {Math.round(
                (recipe.usedIngredientCount /
                  (recipe.usedIngredientCount + recipe.missedIngredientCount)) *
                  100
              )}
              %
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-spice-crimson to-spice-saffron rounded-full transition-all duration-500"
              style={{
                width: `${Math.round(
                  (recipe.usedIngredientCount /
                    (recipe.usedIngredientCount + recipe.missedIngredientCount)) *
                    100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Used ingredients preview */}
        {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {recipe.usedIngredients.slice(0, 3).map((ing) => (
              <span
                key={ing.id}
                className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5"
              >
                {ing.name}
              </span>
            ))}
            {recipe.usedIngredients.length > 3 && (
              <span className="text-xs text-muted-foreground px-1 py-0.5">
                +{recipe.usedIngredients.length - 3} more
              </span>
            )}
          </div>
        )}

        <button
          onClick={() => onViewDetail(recipe.id)}
          className="w-full bg-spice-crimson/10 hover:bg-spice-crimson text-spice-crimson hover:text-white font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm border border-spice-crimson/20 hover:border-spice-crimson hover:shadow-spice active:scale-[0.98]"
        >
          View Recipe →
        </button>
      </div>
    </div>
  );
}
