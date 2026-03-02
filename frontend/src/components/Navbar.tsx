import { useState, useEffect } from 'react';
import { UtensilsCrossed } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-spice-cream/95 glass-nav shadow-card border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <img
              src="/assets/generated/spiceai-logo.dim_120x40.png"
              alt="SpiceAI"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              className="hidden items-center gap-2"
              style={{ display: 'none' }}
            >
              <div className="w-8 h-8 rounded-full bg-spice-crimson flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </div>
              <span className="font-playfair font-bold text-xl text-spice-crimson">SpiceAI</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: '🔍 Search', id: 'search' },
              { label: '🍽️ Recipes', id: 'recipes' },
              { label: '📊 Analytics', id: 'analytics' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-foreground hover:bg-spice-crimson/10 hover:text-spice-crimson'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/15'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 w-full rounded transition-all ${scrolled ? 'bg-foreground' : 'bg-white'}`} />
              <span className={`block h-0.5 w-full rounded transition-all ${scrolled ? 'bg-foreground' : 'bg-white'}`} />
              <span className={`block h-0.5 w-full rounded transition-all ${scrolled ? 'bg-foreground' : 'bg-white'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-spice-cream/98 glass-nav border-t border-border py-3 px-2 rounded-b-2xl shadow-card">
            {[
              { label: '🔍 Search', id: 'search' },
              { label: '🍽️ Recipes', id: 'recipes' },
              { label: '📊 Analytics', id: 'analytics' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-spice-crimson/10 hover:text-spice-crimson transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
