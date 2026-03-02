import { ArrowLeft, Clock, Users, Flame, Loader2, AlertTriangle } from 'lucide-react';
import { useRecipeDetail } from '../hooks/useQueries';
import type { NutritionStats } from '../types/spoonacular';
import { Skeleton } from '@/components/ui/skeleton';

interface RecipeDetailProps {
  recipeId: number;
  onBack: () => void;
  onNutritionCollected: (stats: NutritionStats) => void;
  collectedIds: Set<number>;
}

function NutritionCard({
  label,
  value,
  unit,
  color,
  icon,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  icon: string;
}) {
  return (
    <div className={`bg-card rounded-2xl p-4 border border-border shadow-card text-center`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-2xl font-bold ${color} mb-0.5`}>
        {Math.round(value)}
      </div>
      <div className="text-xs text-muted-foreground font-medium">{unit}</div>
      <div className="text-sm text-foreground font-medium mt-1">{label}</div>
    </div>
  );
}

export default function RecipeDetail({
  recipeId,
  onBack,
  onNutritionCollected,
  collectedIds,
}: RecipeDetailProps) {
  const { data: recipe, isLoading, isError } = useRecipeDetail(recipeId);

  // Collect nutrition data once when recipe loads
  if (recipe && !collectedIds.has(recipe.id)) {
    const nutrients = recipe.nutrition?.nutrients || [];
    const calories = nutrients.find((n) => n.name === 'Calories')?.amount || 0;
    const protein = nutrients.find((n) => n.name === 'Protein')?.amount || 0;
    const fat = nutrients.find((n) => n.name === 'Fat')?.amount || 0;
    const carbs = nutrients.find((n) => n.name === 'Carbohydrates')?.amount || 0;
    onNutritionCollected({ id: recipe.id, title: recipe.title, calories, protein, fat, carbs });
  }

  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-32 mb-8 rounded-full" />
          <div className="bg-card rounded-3xl shadow-spice border border-border overflow-hidden">
            <Skeleton className="h-72 w-full" />
            <div className="p-8 space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-2xl" />
                ))}
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !recipe) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="font-playfair text-2xl font-bold mb-2">Failed to Load Recipe</h3>
          <p className="text-muted-foreground mb-6">
            There was an error fetching the recipe details. Please try again.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-spice-crimson text-white font-semibold px-6 py-3 rounded-full hover:bg-spice-crimson/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>
        </div>
      </section>
    );
  }

  const nutrients = recipe.nutrition?.nutrients || [];
  const calories = nutrients.find((n) => n.name === 'Calories')?.amount || 0;
  const protein = nutrients.find((n) => n.name === 'Protein')?.amount || 0;
  const fat = nutrients.find((n) => n.name === 'Fat')?.amount || 0;
  const carbs = nutrients.find((n) => n.name === 'Carbohydrates')?.amount || 0;

  const steps =
    recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-spice-crimson font-semibold mb-8 hover:gap-3 transition-all duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Results
        </button>

        <div className="bg-card rounded-3xl shadow-spice border border-border overflow-hidden">
          {/* Hero image */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://via.placeholder.com/800x400?text=Recipe+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                {recipe.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                {recipe.readyInMinutes && (
                  <span className="flex items-center gap-1.5 text-white/90 text-sm">
                    <Clock className="w-4 h-4" />
                    {recipe.readyInMinutes} min
                  </span>
                )}
                {recipe.servings && (
                  <span className="flex items-center gap-1.5 text-white/90 text-sm">
                    <Users className="w-4 h-4" />
                    {recipe.servings} servings
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Nutrition cards */}
            <div className="mb-8">
              <h2 className="font-playfair text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                🥗 Nutrition Information
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <NutritionCard
                  label="Calories"
                  value={calories}
                  unit="kcal"
                  color="text-spice-crimson"
                  icon="🔥"
                />
                <NutritionCard
                  label="Protein"
                  value={protein}
                  unit="grams"
                  color="text-emerald-600"
                  icon="💪"
                />
                <NutritionCard
                  label="Fat"
                  value={fat}
                  unit="grams"
                  color="text-spice-saffron"
                  icon="🫒"
                />
                <NutritionCard
                  label="Carbs"
                  value={carbs}
                  unit="grams"
                  color="text-blue-600"
                  icon="🌾"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="font-playfair text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                📝 Ingredients
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.extendedIngredients?.map((ing, idx) => (
                  <div
                    key={`${ing.id}-${idx}`}
                    className="flex items-start gap-2 p-3 bg-muted/50 rounded-xl text-sm"
                  >
                    <span className="text-spice-crimson mt-0.5 flex-shrink-0">•</span>
                    <span className="text-foreground">{ing.original}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="font-playfair text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                👨‍🍳 Step-by-Step Instructions
              </h2>
              {steps.length > 0 ? (
                <ol className="space-y-4">
                  {steps.map((step) => (
                    <li key={step.number} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-spice-crimson text-white text-sm font-bold flex items-center justify-center shadow-spice">
                        {step.number}
                      </div>
                      <div className="flex-1 pt-1 text-foreground leading-relaxed text-sm sm:text-base">
                        {step.step}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground italic">
                  No step-by-step instructions available for this recipe.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
