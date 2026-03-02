import { useState, KeyboardEvent } from 'react';
import { Search, X, ChefHat, Loader2 } from 'lucide-react';

interface IngredientSearchProps {
  onSearch: (ingredients: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  'tomato, onion, paneer',
  'chicken, ginger, garlic',
  'potato, cumin, coriander',
  'lentils, turmeric, mustard seeds',
  'rice, coconut, curry leaves',
];

export default function IngredientSearch({ onSearch, isLoading }: IngredientSearchProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (value: string) => {
    const trimmed = value.trim().replace(/,+$/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setInput('');
    setError('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (input.trim()) {
        handleAddTag(input);
      } else if (tags.length > 0) {
        handleSubmit();
      }
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    const allIngredients = [...tags, ...(input.trim() ? [input.trim()] : [])];
    if (allIngredients.length === 0) {
      setError('Please enter at least one ingredient!');
      return;
    }
    setError('');
    if (input.trim()) {
      setTags((prev) => [...prev, input.trim()]);
      setInput('');
    }
    onSearch(allIngredients.join(','));
  };

  const handleSuggestion = (suggestion: string) => {
    const parts = suggestion.split(',').map((s) => s.trim()).filter(Boolean);
    setTags(parts);
    setInput('');
    setError('');
    onSearch(suggestion);
  };

  const clearAll = () => {
    setTags([]);
    setInput('');
    setError('');
  };

  return (
    <section id="search" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-spice-crimson/10 text-spice-crimson rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <ChefHat className="w-4 h-4" />
            <span>What's in your kitchen?</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Find Your Perfect Recipe
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Enter the ingredients you have and we'll find the best Indian recipes for you.
            Type an ingredient and press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Enter</kbd> or <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">,</kbd> to add it.
          </p>
        </div>

        {/* Search box */}
        <div className="bg-card rounded-3xl shadow-spice border border-border p-6">
          {/* Tag input area */}
          <div
            className={`flex flex-wrap gap-2 min-h-[52px] p-3 rounded-2xl border-2 transition-colors bg-background ${
              error ? 'border-destructive' : 'border-border focus-within:border-spice-crimson'
            }`}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-spice-crimson/10 text-spice-crimson border border-spice-crimson/20 rounded-full px-3 py-1 text-sm font-medium"
              >
                🌿 {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-spice-crimson/70 transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder={tags.length === 0 ? 'e.g. tomato, onion, paneer...' : 'Add more...'}
              className="flex-1 min-w-[140px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm py-1"
            />
            {(tags.length > 0 || input) && (
              <button
                onClick={clearAll}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Clear all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {error && (
            <p className="text-destructive text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span> {error}
            </p>
          )}

          {/* Search button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-spice-crimson text-white font-semibold py-3.5 rounded-2xl hover:bg-spice-crimson/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-spice"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Cooking delicious Indian recipes...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Find Recipes</span>
              </>
            )}
          </button>

          {/* Quick suggestions */}
          <div className="mt-5">
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
              ✨ Quick suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="text-xs bg-muted hover:bg-spice-saffron/20 hover:text-spice-crimson border border-border hover:border-spice-saffron/40 rounded-full px-3 py-1.5 transition-all duration-150 text-muted-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
