export default function HeroSection() {
  const scrollToSearch = () => {
    const el = document.getElementById('search');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[560px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/spiceai-hero.dim_1440x500.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.52 0.22 25 / 0.88) 0%, oklch(0.62 0.18 40 / 0.82) 40%, oklch(0.78 0.14 65 / 0.75) 100%)',
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 bg-spice-saffron blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-10 bg-spice-amber blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6 text-white/90 text-sm font-medium">
          <span>🌶️</span>
          <span>Powered by Spoonacular API</span>
        </div>

        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
          🍛 SpiceAI
        </h1>

        <p className="text-white/90 text-sm sm:text-base font-semibold tracking-widest uppercase mb-4 drop-shadow">
          Ingredient-Based Recipe Recommendation System
        </p>
        <p className="text-white/75 text-xs sm:text-sm tracking-wider uppercase mb-8">
          with Data Analytics
        </p>

        <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover authentic Indian recipes tailored to the ingredients you already have.
          Enter what's in your kitchen and let SpiceAI do the magic! ✨
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToSearch}
            className="inline-flex items-center gap-2 bg-white text-spice-crimson font-semibold px-8 py-3.5 rounded-full shadow-spice-lg hover:bg-spice-cream transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🔍 Find Recipes
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('analytics');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/25 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📊 View Analytics
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {[
            { value: '5000+', label: 'Recipes' },
            { value: '100%', label: 'Indian Cuisine' },
            { value: 'Real-time', label: 'Analytics' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-white font-bold text-xl">{stat.value}</div>
              <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="oklch(0.98 0.012 75)"
          />
        </svg>
      </div>
    </section>
  );
}
