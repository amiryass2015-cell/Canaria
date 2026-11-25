import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Language } from '../types/canarias';
import { UIStrings } from '../data/translations';

interface TopBarProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  t: UIStrings;
  onNavigateSection: (sectionId: string) => void;
}

const LANGUAGE_ORDER: Language[] = ['es', 'ar', 'en', 'fr'];

export function TopBar({
  lang,
  onChangeLang,
  t,
  onNavigateSection,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const navItems = [
    { id: 'islands', label: t.nav.islands },
    { id: 'services', label: t.nav.services },
    { id: 'transport', label: t.nav.transport },
    { id: 'routes', label: t.nav.routes },
    { id: 'agenda', label: t.nav.agenda },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/92 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 md:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-lg md:text-xl font-bold tracking-tight text-[#111827] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B4F8C] rounded-sm"
        >
          {t.brand}
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateSection(item.id)}
              className="py-1.5 hover:text-[#0B4F8C] transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-[#0B4F8C]/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B4F8C]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Single compact Language Switcher */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            className="min-h-[40px] md:min-h-[40px] px-3.5 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8C]"
          >
            <Globe className="w-4 h-4 text-[#0B4F8C]" aria-hidden="true" />
            <span className="font-mono-tabular">{t.languages[lang].code}</span>
            <span className="hidden sm:inline text-neutral-500 font-normal">
              {t.languages[lang].native}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-150 ${
                menuOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
            <div
              role="listbox"
              aria-label="Language selector"
              className="absolute end-0 mt-2 w-44 bg-white border border-neutral-200 rounded-xl shadow-lg py-1.5 z-50"
            >
              {LANGUAGE_ORDER.map((code) => {
                const isSelected = code === lang;
                return (
                  <button
                    key={code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChangeLang(code);
                      setMenuOpen(false);
                    }}
                    className={`w-full min-h-[42px] px-3.5 py-2 text-start text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#0B4F8C]/8 text-[#0B4F8C] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{t.languages[code].native}</span>
                    <span className="font-mono-tabular text-xs text-neutral-400">
                      {t.languages[code].code}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
