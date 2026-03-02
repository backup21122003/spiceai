# Specification

## Summary
**Goal:** Build SpiceAI, a full-page React application for ingredient-based Indian recipe recommendations with data analytics, using the Spoonacular API.

**Planned changes:**
- Sticky navbar with SpiceAI logo on the left and anchor links (Search, Recipes, Analytics) on the right; frosted-glass effect transitioning to solid on scroll
- Hero header section with SpiceAI brand name (curry bowl emoji), full subtitle, hero banner image background with warm gradient overlay
- Ingredient search section with comma-separated input, Find Recipes button, loading spinner ("Cooking delicious Indian recipes..."), and empty-input validation
- Calls Spoonacular `findByIngredients` API with `cuisine=Indian`, displays up to 5 results
- Responsive recipe card grid (2–4 columns) showing image, title, green "Used" badge, orange "Missing" badge, and View Recipe button with hover lift/scale effect
- Recipe detail view fetching full recipe info including nutrition; displays title, image, 4 nutrition stat cards (Calories, Protein, Fat, Carbs), ingredient list, numbered instructions, and Back to Results button
- Data Analytics section with a bar chart (Calorie Comparison across session-viewed recipes) and a doughnut chart (Protein/Fat/Carbs breakdown for last viewed recipe), using Recharts or react-chartjs-2, updating dynamically
- Warm Indian-cuisine theme: saffron-to-crimson palette (#E63946, #F4A261, #FFF8F0, #2D6A4F), Poppins font, rounded cards, soft shadows, 1200px max-width centered layout, spice pattern tile on section backgrounds
- All images (hero banner, spice pattern, logo) served from `/assets/generated/`

**User-visible outcome:** Users can enter ingredients, discover Indian recipes from Spoonacular, view detailed nutrition and cooking instructions, and see dynamic calorie and macronutrient charts — all within a visually rich, themed single-page experience.
