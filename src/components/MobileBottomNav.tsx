import { Bookmark, Bus, Compass, FileText, Map } from 'lucide-react';
import { UIStrings } from '../data/translations';

interface MobileBottomNavProps {
  t: UIStrings;
  savedCount: number;
  activeTab: string;
  onSelectSection: (sectionId: string) => void;
  onOpenSaved: () => void;
}

export function MobileBottomNav({
  t,
  savedCount,
  activeTab,
  onSelectSection,
  onOpenSaved,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/95 backdrop-blur-md border-t border-neutral-200 grid grid-cols-5 items-center"
    >
      <button
        type="button"
        onClick={() => onSelectSection('islands')}
        className={`h-full min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
          activeTab === 'islands' ? 'text-[#0B4F8C]' : 'text-neutral-500'
        }`}
      >
        <Map className="w-4.5 h-4.5" aria-hidden="true" />
        <span className="text-[10px] font-medium truncate max-w-[68px]">
          {t.nav.islands}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectSection('transport')}
        className={`h-full min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
          activeTab === 'transport' ? 'text-[#0B4F8C]' : 'text-neutral-500'
        }`}
      >
        <Bus className="w-4.5 h-4.5" aria-hidden="true" />
        <span className="text-[10px] font-medium truncate max-w-[68px]">
          {t.nav.transport}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectSection('services')}
        className={`h-full min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
          activeTab === 'services' ? 'text-[#0B4F8C]' : 'text-neutral-500'
        }`}
      >
        <FileText className="w-4.5 h-4.5" aria-hidden="true" />
        <span className="text-[10px] font-medium truncate max-w-[68px]">
          {t.nav.services}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectSection('routes')}
        className={`h-full min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
          activeTab === 'routes' ? 'text-[#0B4F8C]' : 'text-neutral-500'
        }`}
      >
        <Compass className="w-4.5 h-4.5" aria-hidden="true" />
        <span className="text-[10px] font-medium truncate max-w-[68px]">
          {t.nav.routes}
        </span>
      </button>

      <button
        type="button"
        onClick={onOpenSaved}
        className="h-full min-h-[44px] flex flex-col items-center justify-center gap-0.5 text-neutral-600 hover:text-[#0B4F8C] transition-colors"
      >
        <Bookmark className="w-4.5 h-4.5" aria-hidden="true" />
        <span className="text-[10px] font-medium truncate max-w-[70px] tabular-nums">
          {t.nav.saved} ({savedCount})
        </span>
      </button>
    </nav>
  );
}
