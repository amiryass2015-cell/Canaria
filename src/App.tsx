import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Bus,
  Check,
  Compass,
  Languages,
  MapPin,
  MessageSquare,
  Plane,
  Search,
  Ship,
  Waves,
} from 'lucide-react';
import { ArchipelagoMap } from './components/ArchipelagoMap';
import { CanariasChatbot } from './components/CanariasChatbot';
import { DetailModal, ModalState } from './components/DetailModal';
import { IslandLiveWeather } from './components/IslandLiveWeather';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineIndicator, PWAInstallButton } from './components/PWAInstallButton';
import { ResilientImage } from './components/ResilientImage';
import { SurfWaveCalculator } from './components/SurfWaveCalculator';
import { TopBar } from './components/TopBar';
import { TransportHub } from './components/TransportHub';
import {
  AGENDA_EVENTS,
  BEACHES,
  ISLANDS,
  ROUTES,
  SERVICES,
} from './data/canariasData';
import { LIVE_STRINGS } from './data/liveStrings';
import { TRANSLATIONS } from './data/translations';
import {
  AudienceMode,
  BeachSpot,
  ChecklistItem,
  IslandId,
  Language,
  RouteItem,
  SavedEntryType,
  SavedItem,
  ServiceItem,
} from './types/canarias';

const STORAGE_LANG_KEY = 'mi_canarias_lang_v1';
const STORAGE_AUDIENCE_KEY = 'mi_canarias_audience_v1';
const STORAGE_SAVED_KEY = 'mi_canarias_saved_v1';
const STORAGE_CHECKLIST_KEY = 'mi_canarias_checklist_v1';

function readInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_LANG_KEY);
    if (saved === 'es' || saved === 'ar' || saved === 'en' || saved === 'fr') {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'es';
}

function readInitialAudience(): AudienceMode {
  try {
    const saved = localStorage.getItem(STORAGE_AUDIENCE_KEY);
    if (saved === 'resident' || saved === 'tourist') {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'resident';
}

function readInitialSaved(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return [];
}

function readInitialChecklist(): ChecklistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_CHECKLIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return [];
}

export default function App() {
  const [lang, setLang] = useState<Language>(readInitialLanguage);
  const [audience, setAudience] = useState<AudienceMode>(readInitialAudience);
  const [selectedIslandId, setSelectedIslandId] = useState<IslandId>('tenerife');
  const [savedItems, setSavedItems] = useState<SavedItem[]>(readInitialSaved);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(readInitialChecklist);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Services filter state
  const [serviceQuery, setServiceQuery] = useState('');
  const [serviceCategory, setServiceCategory] = useState<
    'all' | ServiceItem['category']
  >('all');

  // Routes, Beaches & Surf Calculator explorer state
  const [exploreTab, setExploreTab] = useState<'routes' | 'beaches' | 'surf'>(
    'routes'
  );
  const [routeIslandFilter, setRouteIslandFilter] = useState<'all' | IslandId>('all');
  const [routeTypeFilter, setRouteTypeFilter] = useState<
    'all' | RouteItem['category']
  >('all');
  const [beachKindFilter, setBeachKindFilter] = useState<
    'all' | BeachSpot['kind']
  >('all');

  // Agenda filter state
  const [agendaFilter, setAgendaFilter] = useState<'all' | 'event' | 'notice'>(
    'all'
  );

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterIsland, setNewsletterIsland] = useState<IslandId>('tenerife');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'error' | 'success'
  >('idle');

  // Mobile active section hint
  const [activeMobileTab, setActiveMobileTab] = useState<string>('islands');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_AUDIENCE_KEY, audience);
    } catch {
      // ignore
    }
  }, [audience]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedItems));
    } catch {
      // ignore
    }
  }, [savedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHECKLIST_KEY, JSON.stringify(checklist));
    } catch {
      // ignore
    }
  }, [checklist]);

  const selectedIsland = useMemo(
    () => ISLANDS.find((isl) => isl.id === selectedIslandId) ?? ISLANDS[0],
    [selectedIslandId]
  );

  const isSaved = (id: string, type: SavedEntryType) =>
    savedItems.some((item) => item.id === id && item.type === type);

  const toggleSave = (id: string, type: SavedEntryType) => {
    setSavedItems((prev) => {
      const exists = prev.some((item) => item.id === id && item.type === type);
      if (exists) {
        return prev.filter((item) => !(item.id === id && item.type === type));
      }
      return [...prev, { id, type }];
    });
  };

  const addChecklistItem = (text: string) => {
    setChecklist((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text, done: false },
    ]);
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const removeChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  const navigateToSection = (sectionId: string) => {
    setActiveMobileTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredServices = useMemo(() => {
    const q = serviceQuery.trim().toLowerCase();
    return SERVICES.filter((srv) => {
      if (serviceCategory !== 'all' && srv.category !== serviceCategory) {
        return false;
      }
      if (q) {
        const haystack = [
          srv.title[lang],
          srv.subtitle[lang],
          srv.description[lang],
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      const aMatch = a.audience === audience ? 0 : a.audience === 'both' ? 1 : 2;
      const bMatch = b.audience === audience ? 0 : b.audience === 'both' ? 1 : 2;
      return aMatch - bMatch;
    });
  }, [serviceQuery, serviceCategory, lang, audience]);

  const filteredRoutes = useMemo(() => {
    return ROUTES.filter((rt) => {
      if (routeIslandFilter !== 'all' && rt.island !== routeIslandFilter) {
        return false;
      }
      if (routeTypeFilter !== 'all' && rt.category !== routeTypeFilter) {
        return false;
      }
      return true;
    });
  }, [routeIslandFilter, routeTypeFilter]);

  const filteredBeaches = useMemo(() => {
    return BEACHES.filter((bch) => {
      if (routeIslandFilter !== 'all' && bch.island !== routeIslandFilter) {
        return false;
      }
      if (beachKindFilter !== 'all' && bch.kind !== beachKindFilter) {
        return false;
      }
      return true;
    });
  }, [routeIslandFilter, beachKindFilter]);

  const filteredAgenda = useMemo(() => {
    return AGENDA_EVENTS.filter((ev) => {
      if (agendaFilter !== 'all' && ev.type !== agendaFilter) return false;
      return true;
    }).sort((a, b) => {
      const aMatch = a.audience === audience ? 0 : a.audience === 'both' ? 1 : 2;
      const bMatch = b.audience === audience ? 0 : b.audience === 'both' ? 1 : 2;
      return aMatch - bMatch;
    });
  }, [agendaFilter, audience]);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      newsletterEmail.trim()
    );
    if (!emailValid) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  const primaryHighlights =
    audience === 'resident'
      ? selectedIsland.residentFocus
      : selectedIsland.touristFocus;
  const secondaryHighlights =
    audience === 'resident'
      ? selectedIsland.touristFocus
      : selectedIsland.residentFocus;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#111827]">
      <TopBar
        lang={lang}
        onChangeLang={setLang}
        t={t}
        onNavigateSection={navigateToSection}
      />

      <main className="flex-1 pb-20 md:pb-8">
        {/* HERO SECTION */}
        <section className="border-b border-neutral-200/80 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Editorial Column */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#0B4F8C] mb-3">
                    {t.hero.kicker}
                  </p>
                  <h1 className="font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.12] font-semibold tracking-tight text-[#111827] text-balance">
                    {audience === 'resident'
                      ? t.hero.titleResident
                      : t.hero.titleTourist}
                  </h1>
                  <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-xl">
                    {audience === 'resident'
                      ? t.hero.subtitleResident
                      : t.hero.subtitleTourist}
                  </p>
                </div>

                {/* Workspace Audience Mode Switcher + Primary Action */}
                <div className="space-y-5 pt-2">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-xs font-medium text-neutral-500">
                        {t.audience.label}
                      </span>
                      <div
                        role="group"
                        aria-label={t.audience.label}
                        className="inline-flex items-center p-1 rounded-xl bg-[#F2F1EC] self-start sm:self-auto"
                      >
                        <button
                          type="button"
                          onClick={() => setAudience('resident')}
                          aria-pressed={audience === 'resident'}
                          className={`min-h-[40px] px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            audience === 'resident'
                              ? 'bg-[#0B4F8C] text-white shadow-xs'
                              : 'text-neutral-700 hover:text-neutral-900'
                          }`}
                        >
                          {t.audience.resident}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAudience('tourist')}
                          aria-pressed={audience === 'tourist'}
                          className={`min-h-[40px] px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            audience === 'tourist'
                              ? 'bg-[#0B4F8C] text-white shadow-xs'
                              : 'text-neutral-700 hover:text-neutral-900'
                          }`}
                        >
                          {t.audience.tourist}
                        </button>
                      </div>
                    </div>
                    <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed">
                      {audience === 'resident'
                        ? t.audience.residentDesc
                        : t.audience.touristDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigateToSection('islands')}
                      className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#0B4F8C] hover:bg-[#093F70] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8C]"
                    >
                      <span>{t.hero.primaryCta}</span>
                      <ArrowRight
                        className="w-4 h-4 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalState({ kind: 'saved' })}
                      className="min-h-[46px] px-5 py-2.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800 text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Bookmark className="w-4 h-4 text-[#0B4F8C]" aria-hidden="true" />
                      <span className="tabular-nums">
                        {t.nav.saved} ({savedItems.length})
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setChatOpen(true)}
                      className="min-h-[46px] px-5 py-2.5 rounded-xl border border-neutral-200 bg-white hover:border-[#0B4F8C] text-neutral-800 text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0B4F8C]" aria-hidden="true" />
                      <span>{LIVE_STRINGS[lang].chat.openButton}</span>
                    </button>

                    <PWAInstallButton lang={lang} />
                  </div>
                </div>
              </div>

              {/* Right Visual Column */}
              <div className="lg:col-span-6">
                <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] rounded-2xl overflow-hidden border border-neutral-200">
                  <ResilientImage
                    src="/src/assets/images/hero_canarias_coast_1795643981922.jpg"
                    alt={t.hero.imageCaption}
                    fallbackTitle="MI CANARIAS"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between gap-4 text-white">
                    <span className="text-xs sm:text-sm font-medium">
                      {t.hero.imageCaption}
                    </span>
                    <span className="font-mono-tabular text-xs text-white/80 shrink-0">
                      28°16′N 16°38′W
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Archipelago Key Metrics Strip */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-neutral-200 rounded-2xl bg-white divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 rtl:lg:divide-x-reverse overflow-hidden">
              <div className="p-4 sm:p-5">
                <div className="text-xs text-neutral-500">
                  {t.metrics.islandsLabel}
                </div>
                <div className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#111827] tabular-nums">
                  {t.metrics.islandsValue}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-xs text-neutral-500">
                  {t.metrics.subsidyLabel}
                </div>
                <div className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#0B4F8C] tabular-nums">
                  {t.metrics.subsidyValue}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-xs text-neutral-500">
                  {t.metrics.languagesLabel}
                </div>
                <div className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#111827] tabular-nums">
                  {t.metrics.languagesValue}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-xs text-neutral-500">
                  {t.metrics.climateLabel}
                </div>
                <div className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#111827] tabular-nums">
                  {t.metrics.climateValue}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE 8-ISLAND ARCHIPELAGO EXPLORER */}
        <section id="islands" className="py-12 sm:py-16 border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111827] text-balance">
                {t.islandsSection.heading}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {t.islandsSection.subheading}
              </p>
            </div>

            {/* 8-Island Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {ISLANDS.map((isl) => {
                const active = isl.id === selectedIslandId;
                return (
                  <button
                    key={isl.id}
                    type="button"
                    onClick={() => setSelectedIslandId(isl.id)}
                    aria-pressed={active}
                    className={`min-h-[42px] px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 border ${
                      active
                        ? 'bg-[#0B4F8C] text-white border-[#0B4F8C]'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {isl.name}
                  </button>
                );
              })}
            </div>

            {/* Map + Selected Island Spotlight */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <ArchipelagoMap
                  islands={ISLANDS}
                  selectedId={selectedIslandId}
                  onSelect={setSelectedIslandId}
                  mapLabel={t.islandsSection.selectIslandHint}
                />

                {/* Island Photo & Technical Specs */}
                <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <ResilientImage
                      src={selectedIsland.image}
                      alt={selectedIsland.name}
                      fallbackTitle={selectedIsland.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-100">
                    <div>
                      <div className="text-xs text-neutral-500">
                        {t.islandsSection.capital}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-neutral-900 truncate">
                        {selectedIsland.capital}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">
                        {t.islandsSection.population}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-neutral-900 font-mono-tabular">
                        {selectedIsland.population}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">
                        {t.islandsSection.area}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-neutral-900 font-mono-tabular">
                        {selectedIsland.areaKm2}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">
                        {t.islandsSection.climate}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-[#0B4F8C] font-mono-tabular">
                        {selectedIsland.climateAvg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Island Details Panel */}
              <div className="lg:col-span-6 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
                  <div>
                    <div className="text-xs text-neutral-500">
                      {selectedIsland.province} · {selectedIsland.highestPeak}
                    </div>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#111827]">
                      {selectedIsland.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-[#0B4F8C]">
                      {selectedIsland.tagline[lang]}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSave(selectedIsland.id, 'island')}
                    className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                      isSaved(selectedIsland.id, 'island')
                        ? 'bg-[#0B4F8C] text-white'
                        : 'border border-neutral-200 bg-[#FAFAF8] text-neutral-800 hover:border-neutral-300'
                    }`}
                  >
                    {isSaved(selectedIsland.id, 'island') ? (
                      <Check className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Bookmark className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>
                      {isSaved(selectedIsland.id, 'island')
                        ? t.islandsSection.savedIsland
                        : t.islandsSection.saveIsland}
                    </span>
                  </button>
                </div>

                <p className="text-[15px] text-neutral-700 leading-relaxed">
                  {selectedIsland.summary[lang]}
                </p>

                {/* Live External Weather API + Search Grounded Briefing */}
                <IslandLiveWeather
                  islandId={selectedIsland.id}
                  lang={lang}
                  audience={audience}
                />

                {/* Island Microclimate Reference Strip */}
                <div className="rounded-xl border border-neutral-200/80 bg-[#FAFAF8] p-4 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-neutral-800">
                      {t.islandsSection.microclimateTitle}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {selectedIsland.microclimate.windSummary[lang]}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 pt-1 border-t border-neutral-200/60">
                    <div>
                      <div className="text-[11px] text-neutral-500">
                        {t.islandsSection.coastLabel}
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-neutral-900">
                        {selectedIsland.microclimate.coastTemp}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-500">
                        {t.islandsSection.summitLabel}
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-neutral-900">
                        {selectedIsland.microclimate.summitTemp}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-500">
                        {t.islandsSection.seaLabel}
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-[#0B4F8C]">
                        {selectedIsland.microclimate.seaTemp}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-500">
                        {t.islandsSection.uvLabel}
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-neutral-900">
                        {selectedIsland.microclimate.uvIndex}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Audience Focus */}
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-3">
                    {audience === 'resident'
                      ? t.islandsSection.residentEssentials
                      : t.islandsSection.touristEssentials}
                  </h4>
                  <div className="space-y-3">
                    {primaryHighlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-[#F2F1EC] p-4 space-y-1"
                      >
                        <div className="text-sm font-semibold text-neutral-900">
                          {item.title[lang]}
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {item.detail[lang]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Audience Focus (clean subtle list) */}
                <div className="pt-2 border-t border-neutral-100">
                  <h4 className="text-xs font-semibold text-neutral-500 mb-2.5">
                    {audience === 'resident'
                      ? t.islandsSection.touristEssentials
                      : t.islandsSection.residentEssentials}
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    {secondaryHighlights.map((item, idx) => (
                      <li key={idx}>
                        <span className="font-medium text-neutral-900">
                          {item.title[lang]}:
                        </span>{' '}
                        <span className="text-neutral-600">{item.detail[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ports & Airports */}
                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4 text-[#0B4F8C] shrink-0" aria-hidden="true" />
                      <span>{selectedIsland.ferryHubs.join(' · ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-[#0B4F8C] shrink-0" aria-hidden="true" />
                      <span>{selectedIsland.airports.join(' · ')}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => navigateToSection('transport')}
                      className="min-h-[42px] px-4 py-2 rounded-xl border border-neutral-200 hover:border-[#0B4F8C] text-sm font-semibold text-neutral-800 hover:text-[#0B4F8C] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Bus className="w-4 h-4 text-[#0B4F8C]" aria-hidden="true" />
                      <span>{t.nav.transport}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRouteIslandFilter(selectedIsland.id);
                        setExploreTab('surf');
                        navigateToSection('routes');
                      }}
                      className="min-h-[42px] px-4 py-2 rounded-xl border border-neutral-200 hover:border-[#0B4F8C] text-sm font-semibold text-neutral-800 hover:text-[#0B4F8C] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Waves className="w-4 h-4 text-[#0B4F8C]" aria-hidden="true" />
                      <span>{t.routesSection.tabSurf}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRouteIslandFilter(selectedIsland.id);
                        setExploreTab('routes');
                        navigateToSection('routes');
                      }}
                      className="min-h-[42px] px-4 py-2 rounded-xl border border-neutral-200 hover:border-[#0B4F8C] text-sm font-semibold text-[#0B4F8C] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Compass className="w-4 h-4" aria-hidden="true" />
                      <span>{t.islandsSection.viewRoutesForIsland}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AUDIENCE-ADAPTIVE SERVICES & PERMITS */}
        <section id="services" className="py-12 sm:py-16 border-b border-neutral-200/80 bg-[#F2F1EC]/55">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111827] text-balance">
                  {audience === 'resident'
                    ? t.servicesSection.headingResident
                    : t.servicesSection.headingTourist}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {audience === 'resident'
                    ? t.servicesSection.subheadingResident
                    : t.servicesSection.subheadingTourist}
                </p>
              </div>

              {/* Search Input */}
              <div className="w-full lg:w-80 relative">
                <Search
                  className="w-4 h-4 text-neutral-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={serviceQuery}
                  onChange={(e) => setServiceQuery(e.target.value)}
                  placeholder={t.servicesSection.searchPlaceholder}
                  aria-label={t.servicesSection.searchPlaceholder}
                  className="w-full min-h-[44px] ps-10 pe-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#0B4F8C] focus:outline-none"
                />
              </div>
            </div>

            {/* Useful Numbers & 4-Language Phrasebook Quick Access */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0B4F8C]/10 text-[#0B4F8C] flex items-center justify-center shrink-0">
                  <Languages className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[#111827]">
                    {t.servicesSection.utilitiesBannerTitle}
                  </h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-neutral-600">
                    {t.servicesSection.utilitiesBannerDesc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalState({ kind: 'phrasebook' })}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#111827] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
              >
                {t.servicesSection.openPhrasebookBtn}
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(
                ['all', 'mobility', 'civic', 'health', 'nature', 'culture'] as const
              ).map((cat) => {
                const active = serviceCategory === cat;
                const label =
                  cat === 'all'
                    ? t.servicesSection.allCategories
                    : t.servicesSection.categories[cat];
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setServiceCategory(cat)}
                    aria-pressed={active}
                    className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 border ${
                      active
                        ? 'bg-[#111827] text-white border-[#111827]'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center space-y-3">
                <p className="text-sm text-neutral-600">
                  {t.servicesSection.emptyState}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setServiceQuery('');
                    setServiceCategory('all');
                  }}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-[#0B4F8C] text-white text-sm font-semibold"
                >
                  {t.servicesSection.resetFilters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.map((srv) => {
                  const saved = isSaved(srv.id, 'service');
                  const islandName =
                    srv.island === 'all'
                      ? t.routesSection.allIslands
                      : ISLANDS.find((i) => i.id === srv.island)?.name ?? '';

                  return (
                    <article
                      key={srv.id}
                      className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col justify-between gap-5"
                    >
                      <div className="space-y-2.5">
                        <div className="text-xs text-neutral-500">
                          {t.servicesSection.categories[srv.category]}
                          <span aria-hidden="true"> · </span>
                          {islandName}
                          <span aria-hidden="true"> · </span>
                          {srv.audience === 'resident'
                            ? t.audience.resident
                            : srv.audience === 'tourist'
                            ? t.audience.tourist
                            : `${t.audience.resident} / ${t.audience.tourist}`}
                        </div>

                        <h3 className="font-display text-lg font-semibold text-[#111827] leading-snug">
                          {srv.title[lang]}
                        </h3>

                        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                          {srv.description[lang]}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setModalState({ kind: 'service', item: srv })}
                          className="min-h-[42px] px-4 py-2 rounded-xl bg-[#0B4F8C]/8 hover:bg-[#0B4F8C]/14 text-[#0B4F8C] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                        >
                          {t.servicesSection.openDetails}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSave(srv.id, 'service')}
                          aria-label={
                            saved
                              ? t.routesSection.savedAction
                              : t.routesSection.saveAction
                          }
                          className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                            saved
                              ? 'text-[#0B4F8C] bg-[#F2F1EC]'
                              : 'text-neutral-500 hover:text-neutral-900'
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${saved ? 'fill-current' : ''}`}
                            aria-hidden="true"
                          />
                          <span>
                            {saved
                              ? t.routesSection.savedAction
                              : t.routesSection.saveAction}
                          </span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2B: PUBLIC TRANSIT, AIRPORTS & INTER-ISLAND TRANSPORT */}
        <section id="transport" className="py-12 sm:py-16 border-b border-neutral-200/80 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TransportHub
              lang={lang}
              audience={audience}
              selectedIslandId={selectedIslandId}
              t={t}
            />
          </div>
        </section>

        {/* SECTION 3: CURATED ROUTES, BEACHES & NATURAL POOLS */}
        <section id="routes" className="py-12 sm:py-16 border-b border-neutral-200/80 bg-[#F2F1EC]/35">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111827] text-balance">
                  {t.routesSection.heading}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {t.routesSection.subheading}
                </p>
              </div>

              {/* Segmented Switcher: Routes vs Beaches & Natural Pools vs Surf Calculator */}
              <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#F2F1EC] self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => setExploreTab('routes')}
                  aria-pressed={exploreTab === 'routes'}
                  className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                    exploreTab === 'routes'
                      ? 'bg-white text-[#0B4F8C] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Compass className="w-4 h-4" aria-hidden="true" />
                  <span>{t.routesSection.tabRoutes}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExploreTab('beaches')}
                  aria-pressed={exploreTab === 'beaches'}
                  className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                    exploreTab === 'beaches'
                      ? 'bg-white text-[#0B4F8C] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Waves className="w-4 h-4" aria-hidden="true" />
                  <span>{t.routesSection.tabBeaches}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExploreTab('surf')}
                  aria-pressed={exploreTab === 'surf'}
                  className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                    exploreTab === 'surf'
                      ? 'bg-white text-[#0B4F8C] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Waves className="w-4 h-4" aria-hidden="true" />
                  <span>{t.routesSection.tabSurf}</span>
                </button>
              </div>
            </div>

            {/* Filters Bar (for Routes & Beaches tabs) */}
            {exploreTab !== 'surf' && (
              <div className="flex flex-wrap items-center gap-3">
                <select
                  aria-label={t.routesSection.allIslands}
                  value={routeIslandFilter}
                  onChange={(e) =>
                    setRouteIslandFilter(e.target.value as 'all' | IslandId)
                  }
                  className="min-h-[44px] rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-800 focus:border-[#0B4F8C] focus:outline-none"
                >
                  <option value="all">{t.routesSection.allIslands}</option>
                  {ISLANDS.map((isl) => (
                    <option key={isl.id} value={isl.id}>
                      {isl.name}
                    </option>
                  ))}
                </select>

                {exploreTab === 'routes' ? (
                  <select
                    aria-label={t.routesSection.allTypes}
                    value={routeTypeFilter}
                    onChange={(e) =>
                      setRouteTypeFilter(
                        e.target.value as 'all' | RouteItem['category']
                      )
                    }
                    className="min-h-[44px] rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-800 focus:border-[#0B4F8C] focus:outline-none"
                  >
                    <option value="all">{t.routesSection.allTypes}</option>
                    <option value="volcanic">{t.routesSection.types.volcanic}</option>
                    <option value="coastal">{t.routesSection.types.coastal}</option>
                    <option value="forest">{t.routesSection.types.forest}</option>
                    <option value="heritage">{t.routesSection.types.heritage}</option>
                  </select>
                ) : (
                  <select
                    aria-label={t.routesSection.beachKinds.all}
                    value={beachKindFilter}
                    onChange={(e) =>
                      setBeachKindFilter(
                        e.target.value as 'all' | BeachSpot['kind']
                      )
                    }
                    className="min-h-[44px] rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-800 focus:border-[#0B4F8C] focus:outline-none"
                  >
                    <option value="all">{t.routesSection.beachKinds.all}</option>
                    <option value="beach">{t.routesSection.beachKinds.beach}</option>
                    <option value="natural-pool">
                      {t.routesSection.beachKinds['natural-pool']}
                    </option>
                    <option value="cove">{t.routesSection.beachKinds.cove}</option>
                  </select>
                )}
              </div>
            )}

            {exploreTab === 'surf' ? (
              <SurfWaveCalculator
                lang={lang}
                selectedIslandFilter={routeIslandFilter}
                activeIslandId={selectedIslandId}
              />
            ) : exploreTab === 'routes' ? (
              filteredRoutes.length === 0 ? (
                <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center space-y-3">
                  <p className="text-sm text-neutral-600">
                    {t.routesSection.emptyState}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setRouteIslandFilter('all');
                      setRouteTypeFilter('all');
                    }}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-[#0B4F8C] text-white text-sm font-semibold"
                  >
                    {t.servicesSection.resetFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoutes.map((rt) => {
                    const islandName =
                      ISLANDS.find((i) => i.id === rt.island)?.name ?? rt.island;
                    const saved = isSaved(rt.id, 'route');

                    return (
                      <article
                        key={rt.id}
                        className="rounded-2xl border border-neutral-200 bg-white overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-4/3 overflow-hidden">
                            <ResilientImage
                              src={rt.image}
                              alt={rt.title[lang]}
                              fallbackTitle={rt.title[lang]}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="p-5 sm:p-6 space-y-2.5">
                            <div className="text-xs text-neutral-500">
                              <span>{islandName}</span>
                              <span aria-hidden="true"> · </span>
                              <span>{t.routesSection.types[rt.category]}</span>
                              <span aria-hidden="true"> · </span>
                              <span className="font-mono-tabular">
                                {rt.distanceKm} km
                              </span>
                              <span aria-hidden="true"> · </span>
                              <span className="font-mono-tabular">
                                {rt.durationHours} h
                              </span>
                            </div>

                            <h3 className="font-display text-lg font-semibold text-[#111827] leading-snug">
                              {rt.title[lang]}
                            </h3>

                            <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                              {rt.summary[lang]}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 sm:px-6 py-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setModalState({ kind: 'route', item: rt })}
                            className="min-h-[42px] px-4 py-2 rounded-xl bg-[#111827] hover:bg-neutral-800 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                          >
                            {t.routesSection.viewGuide}
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleSave(rt.id, 'route')}
                            className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                              saved
                                ? 'text-[#0B4F8C] bg-[#F2F1EC]'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                          >
                            <Bookmark
                              className={`w-4 h-4 ${saved ? 'fill-current' : ''}`}
                              aria-hidden="true"
                            />
                            <span>
                              {saved
                                ? t.routesSection.savedAction
                                : t.routesSection.saveAction}
                            </span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )
            ) : filteredBeaches.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center space-y-3">
                <p className="text-sm text-neutral-600">
                  {t.routesSection.emptyState}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setRouteIslandFilter('all');
                    setBeachKindFilter('all');
                  }}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-[#0B4F8C] text-white text-sm font-semibold"
                >
                  {t.servicesSection.resetFilters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBeaches.map((bch) => {
                  const islandName =
                    ISLANDS.find((i) => i.id === bch.island)?.name ?? bch.island;
                  const saved = isSaved(bch.id, 'beach');

                  return (
                    <article
                      key={bch.id}
                      className="rounded-2xl border border-neutral-200 bg-white overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-4/3 overflow-hidden">
                          <ResilientImage
                            src={bch.image}
                            alt={bch.name}
                            fallbackTitle={bch.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-5 sm:p-6 space-y-2.5">
                          <div className="text-xs text-neutral-500">
                            <span>{islandName}</span>
                            <span aria-hidden="true"> · </span>
                            <span>{t.routesSection.beachKinds[bch.kind]}</span>
                            <span aria-hidden="true"> · </span>
                            <span
                              className={
                                bch.swellRisk === 'caution'
                                  ? 'font-medium text-amber-700'
                                  : 'text-neutral-600'
                              }
                            >
                              {t.routesSection.swellRisk[bch.swellRisk]}
                            </span>
                          </div>

                          <h3 className="font-display text-lg font-semibold text-[#111827] leading-snug">
                            {bch.name}
                          </h3>

                          <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                            {bch.summary[lang]}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 py-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setModalState({ kind: 'beach', item: bch })}
                          className="min-h-[42px] px-4 py-2 rounded-xl bg-[#111827] hover:bg-neutral-800 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                        >
                          {t.routesSection.viewGuide}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSave(bch.id, 'beach')}
                          className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                            saved
                              ? 'text-[#0B4F8C] bg-[#F2F1EC]'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${saved ? 'fill-current' : ''}`}
                            aria-hidden="true"
                          />
                          <span>
                            {saved
                              ? t.routesSection.savedAction
                              : t.routesSection.saveAction}
                          </span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: AGENDA, FIELD NOTICES & ISLAND ALERTS SUBSCRIPTION */}
        <section id="agenda" className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111827] text-balance">
                  {t.agendaSection.heading}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {t.agendaSection.subheading}
                </p>
              </div>

              <div className="inline-flex items-center p-1 rounded-xl bg-[#F2F1EC] self-start sm:self-auto">
                {(['all', 'event', 'notice'] as const).map((kind) => {
                  const label =
                    kind === 'all'
                      ? t.agendaSection.filterAll
                      : kind === 'event'
                      ? t.agendaSection.filterEvents
                      : t.agendaSection.filterNotices;
                  const active = agendaFilter === kind;
                  return (
                    <button
                      key={kind}
                      type="button"
                      onClick={() => setAgendaFilter(kind)}
                      aria-pressed={active}
                      className={`min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-white text-[#111827] shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Agenda List */}
            <div className="rounded-2xl border border-neutral-200 bg-white divide-y divide-neutral-100">
              {filteredAgenda.map((ev) => {
                const islandName =
                  ISLANDS.find((i) => i.id === ev.island)?.name ?? ev.island;
                const saved = isSaved(ev.id, 'event');

                return (
                  <div
                    key={ev.id}
                    className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="text-xs text-neutral-500">
                        <span
                          className={
                            ev.type === 'notice'
                              ? 'font-semibold text-amber-700'
                              : 'font-semibold text-[#0B4F8C]'
                          }
                        >
                          {ev.type === 'notice'
                            ? t.agendaSection.noticeLabel
                            : t.agendaSection.eventLabel}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span>{islandName}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{ev.dateLabel[lang]}</span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-[#111827]">
                        {ev.title[lang]}
                      </h3>

                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {ev.description[lang]}
                      </p>

                      <div className="pt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                        <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{ev.location}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSave(ev.id, 'event')}
                      className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 self-start md:self-center border ${
                        saved
                          ? 'bg-[#0B4F8C] text-white border-[#0B4F8C]'
                          : 'bg-[#FAFAF8] text-neutral-800 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {saved
                          ? t.agendaSection.savedAction
                          : t.agendaSection.saveAction}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Island Alerts Newsletter Form */}
            <div className="rounded-2xl border border-neutral-200 bg-[#F2F1EC] p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111827] text-balance">
                    {t.newsletter.heading}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
                    {t.newsletter.subheading}
                  </p>
                </div>

                <form
                  onSubmit={handleNewsletterSubmit}
                  noValidate
                  className="lg:col-span-6 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      aria-label={t.newsletter.islandSelect}
                      value={newsletterIsland}
                      onChange={(e) =>
                        setNewsletterIsland(e.target.value as IslandId)
                      }
                      className="min-h-[44px] sm:w-44 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-neutral-800 focus:border-[#0B4F8C] focus:outline-none"
                    >
                      {ISLANDS.map((isl) => (
                        <option key={isl.id} value={isl.id}>
                          {isl.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus !== 'idle') {
                          setNewsletterStatus('idle');
                        }
                      }}
                      placeholder={t.newsletter.emailPlaceholder}
                      aria-label={t.newsletter.emailPlaceholder}
                      className="flex-1 min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#0B4F8C] focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0B4F8C] hover:bg-[#093F70] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      {t.newsletter.submit}
                    </button>
                  </div>

                  {newsletterStatus === 'error' && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {t.newsletter.invalidEmail}
                    </p>
                  )}
                  {newsletterStatus === 'success' && (
                    <p
                      role="status"
                      className="text-xs font-medium text-[#0B4F8C]"
                    >
                      {t.newsletter.successMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="border-t border-neutral-200 bg-white pb-20 md:pb-10 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="space-y-1">
            <div className="font-semibold text-neutral-900">{t.footer.tagline}</div>
            <div>{t.footer.copyright}</div>
          </div>

          <div className="flex items-center gap-3">
            <span>{t.footer.emergencyLabel}:</span>
            <span className="font-mono-tabular text-sm font-bold text-[#0B4F8C]">
              {t.footer.emergencyNumber}
            </span>
          </div>
        </div>
      </footer>

      <MobileBottomNav
        t={t}
        savedCount={savedItems.length}
        activeTab={activeMobileTab}
        onSelectSection={navigateToSection}
        onOpenSaved={() => setModalState({ kind: 'saved' })}
      />

      <DetailModal
        state={modalState}
        onClose={() => setModalState(null)}
        lang={lang}
        audience={audience}
        t={t}
        savedItems={savedItems}
        onToggleSave={toggleSave}
        onClearSaved={() => setSavedItems([])}
        onSelectIslandFromSaved={(id) => {
          setSelectedIslandId(id as IslandId);
          navigateToSection('islands');
        }}
        checklist={checklist}
        onAddChecklist={addChecklistItem}
        onToggleChecklist={toggleChecklistItem}
        onRemoveChecklist={removeChecklistItem}
      />

      <CanariasChatbot
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        lang={lang}
        audience={audience}
        selectedIslandId={selectedIsland.id}
        selectedIslandName={selectedIsland.name}
      />

      <OfflineIndicator lang={lang} />
    </div>
  );
}
