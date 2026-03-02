import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IngredientSearch from './components/IngredientSearch';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetail from './components/RecipeDetail';
import AnalyticsSection from './components/AnalyticsSection';
import { useSearchRecipes } from './hooks/useQueries';
import type { NutritionStats } from './types/spoonacular';
import { Heart } from 'lucide-react';

type View = 'list' | 'detail';

export default function App() {
  const [searchIngredients, setSearchIngredients] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [view, setView] = useState<View>('list');
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [nutritionStats, setNutritionStats] = useState<NutritionStats[]>([]);
  const [collectedIds] = useState<Set<number>>(new Set());

  const { data: recipes = [], isLoading } = useSearchRecipes(searchIngredients, searchEnabled);

  const handleSearch = useCallback((ingredients: string) => {
    setSearchIngredients(ingredients);
    setSearchEnabled(true);
    setHasSearched(true);
    setView('list');
    setSelectedRecipeId(null);
    // Scroll to recipes section after a short delay
    setTimeout(() => {
      const el = document.getElementById('recipes');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }, []);

  const handleViewDetail = useCallback((id: number) => {
    setSelectedRecipeId(id);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setView('list');
    setSelectedRecipeId(null);
    setTimeout(() => {
      const el = document.getElementById('recipes');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleNutritionCollected = useCallback(
    (stats: NutritionStats) => {
      if (!collectedIds.has(stats.id)) {
        collectedIds.add(stats.id);
        setNutritionStats((prev) => [...prev, stats]);
      }
    },
    [collectedIds]
  );

  const appId = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'spiceai';

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Search */}
        <IngredientSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* Recipe List or Detail */}
        {view === 'list' ? (
          <RecipeGrid
            recipes={recipes}
            isLoading={isLoading}
            hasSearched={hasSearched}
            onViewDetail={handleViewDetail}
          />
        ) : (
          selectedRecipeId !== null && (
            <RecipeDetail
              recipeId={selectedRecipeId}
              onBack={handleBack}
              onNutritionCollected={handleNutritionCollected}
              collectedIds={collectedIds}
            />
          )
        )}

        {/* Analytics */}
        <AnalyticsSection nutritionStats={nutritionStats} />
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="font-playfair text-2xl font-bold mb-1">🍛 SpiceAI</div>
              <p className="text-background/60 text-sm max-w-xs">
                Ingredient-Based Recipe Recommendation System with Data Analytics
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-6 text-sm text-background/70">
                {['Search', 'Recipes', 'Analytics'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const el = document.getElementById(item.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-background transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Attribution */}
            <div className="text-center md:text-right text-sm text-background/60">
              <p className="flex items-center gap-1 justify-center md:justify-end">
                Built with{' '}
                <Heart className="w-3.5 h-3.5 text-spice-saffron fill-spice-saffron" />{' '}
                using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spice-saffron hover:text-background transition-colors font-medium"
                >
                  caffeine.ai
                </a>
              </p>
              <p className="mt-1">© {new Date().getFullYear()} SpiceAI. All rights reserved.</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-background/10 text-center text-xs text-background/40">
            Powered by Spoonacular API · Indian Cuisine Specialist · Real-time Nutrition Analytics
          </div>
        </div>
      </footer>
    </div>
  );
}
