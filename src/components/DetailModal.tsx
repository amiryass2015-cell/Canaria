import { FormEvent, useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  Copy,
  Phone,
  Plus,
  Trash2,
  Volume2,
  X,
} from 'lucide-react';
import {
  AGENDA_EVENTS,
  BEACHES,
  ISLANDS,
  PHRASEBOOK,
  ROUTES,
  SERVICES,
  USEFUL_PHONES,
} from '../data/canariasData';
import { UIStrings } from '../data/translations';
import {
  AudienceMode,
  BeachSpot,
  ChecklistItem,
  Language,
  PhraseEntry,
  RouteItem,
  SavedEntryType,
  SavedItem,
  ServiceItem,
} from '../types/canarias';
import { ResilientImage } from './ResilientImage';

export type ModalState =
  | { kind: 'service'; item: ServiceItem }
  | { kind: 'route'; item: RouteItem }
  | { kind: 'beach'; item: BeachSpot }
  | { kind: 'phrasebook' }
  | { kind: 'saved' }
  | null;

interface DetailModalProps {
  state: ModalState;
  onClose: () => void;
  lang: Language;
  audience: AudienceMode;
  t: UIStrings;
  savedItems: SavedItem[];
  onToggleSave: (id: string, type: SavedEntryType) => void;
  onClearSaved: () => void;
  onSelectIslandFromSaved: (islandId: string) => void;
  checklist: ChecklistItem[];
  onAddChecklist: (text: string) => void;
  onToggleChecklist: (id: string) => void;
  onRemoveChecklist: (id: string) => void;
}

const SPEECH_LOCALE: Record<Language, string> = {
  es: 'es-ES',
  ar: 'ar-SA',
  en: 'en-GB',
  fr: 'fr-FR',
};

export function DetailModal({
  state,
  onClose,
  lang,
  audience,
  t,
  savedItems,
  onToggleSave,
  onClearSaved,
  onSelectIslandFromSaved,
  checklist,
  onAddChecklist,
  onToggleChecklist,
  onRemoveChecklist,
}: DetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [phraseCat, setPhraseCat] = useState<'all' | PhraseEntry['category']>('all');
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (!state) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [state, onClose]);

  if (!state) return null;

  const isSaved = (id: string, type: SavedEntryType) =>
    savedItems.some((item) => item.id === id && item.type === type);

  const resolveSavedTitle = (entry: SavedItem): { title: string; meta: string } => {
    if (entry.type === 'island') {
      const found = ISLANDS.find((i) => i.id === entry.id);
      return {
        title: found ? found.name : entry.id,
        meta: found ? `${found.capital} · ${found.climateAvg}` : '',
      };
    }
    if (entry.type === 'service') {
      const found = SERVICES.find((s) => s.id === entry.id);
      return {
        title: found ? found.title[lang] : entry.id,
        meta: found ? found.feeLabel[lang] : '',
      };
    }
    if (entry.type === 'route') {
      const found = ROUTES.find((r) => r.id === entry.id);
      const isl = found ? ISLANDS.find((i) => i.id === found.island)?.name : '';
      return {
        title: found ? found.title[lang] : entry.id,
        meta: found ? `${isl} · ${found.distanceKm} km` : '',
      };
    }
    if (entry.type === 'beach') {
      const found = BEACHES.find((b) => b.id === entry.id);
      const isl = found ? ISLANDS.find((i) => i.id === found.island)?.name : '';
      return {
        title: found ? found.name : entry.id,
        meta: found ? `${isl} · ${found.municipality}` : '',
      };
    }
    const found = AGENDA_EVENTS.find((ev) => ev.id === entry.id);
    const isl = found ? ISLANDS.find((i) => i.id === found.island)?.name : '';
    return {
      title: found ? found.title[lang] : entry.id,
      meta: found ? `${isl} · ${found.dateLabel[lang]}` : '',
    };
  };

  const handleCopySummary = async () => {
    const savedLines = savedItems.map((item) => {
      const info = resolveSavedTitle(item);
      return `- [${t.drawer.typeLabels[item.type]}] ${info.title} (${info.meta})`;
    });
    const taskLines = checklist.map(
      (task) => `- [${task.done ? 'x' : ' '}] ${task.text}`
    );
    const sections = [
      t.drawer.savedTitle,
      savedLines.length > 0 ? savedLines.join('\n') : '',
      taskLines.length > 0 ? `\n${t.drawer.checklistTitle}:\n${taskLines.join('\n')}` : '',
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(sections.join('\n\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  const handleSpeak = (text: string, speakLang: Language) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LOCALE[speakLang];
    window.speechSynthesis.speak(utterance);
  };

  const handleAddTaskSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;
    onAddChecklist(trimmed);
    setNewTask('');
  };

  const filteredPhrases = PHRASEBOOK.filter(
    (p) => phraseCat === 'all' || p.category === phraseCat
  );

  const canSpeak =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs md:p-6"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full md:max-w-2xl max-h-[88vh] bg-white rounded-t-3xl md:rounded-2xl border border-neutral-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Mobile bottom-sheet drag indicator */}
        <div className="md:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-neutral-300" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-neutral-100 flex items-center justify-between gap-4">
          <div className="text-xs font-medium text-neutral-500">
            {state.kind === 'service' && t.servicesSection.categories[state.item.category]}
            {state.kind === 'route' &&
              `${ISLANDS.find((i) => i.id === state.item.island)?.name ?? ''} · ${
                t.routesSection.types[state.item.category]
              }`}
            {state.kind === 'beach' &&
              `${ISLANDS.find((i) => i.id === state.item.island)?.name ?? ''} · ${
                t.routesSection.beachKinds[state.item.kind]
              }`}
            {state.kind === 'phrasebook' && `${t.brand} · ES / AR / EN / FR`}
            {state.kind === 'saved' && `${t.brand} · ${savedItems.length}`}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.drawer.close}
            className="min-h-[44px] min-w-[44px] -me-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-7 py-6 overflow-y-auto space-y-6">
          {state.kind === 'service' && (
            <>
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#111827] text-balance">
                  {state.item.title[lang]}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-500">
                  {state.item.subtitle[lang]}
                </p>
              </div>

              <p className="text-[15px] text-neutral-700 leading-relaxed">
                {state.item.description[lang]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-100">
                <div>
                  <div className="text-xs text-neutral-500">{t.drawer.validityLabel}</div>
                  <div className="mt-1 text-sm font-medium text-neutral-900">
                    {state.item.scheduleOrValidity[lang]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">{t.drawer.feeLabel}</div>
                  <div className="mt-1 text-sm font-medium text-[#0B4F8C]">
                    {state.item.feeLabel[lang]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">{t.drawer.portalLabel}</div>
                  <div className="mt-1 text-sm font-medium text-neutral-900">
                    {state.item.officialPortalLabel[lang]}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#F2F1EC] p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-[#111827] mb-3">
                  {t.drawer.requirementsTitle}
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {state.item.requirements[lang].map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono-tabular text-xs font-semibold text-[#0B4F8C] mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {state.kind === 'route' && (
            <>
              <div className="rounded-xl overflow-hidden aspect-video border border-neutral-200">
                <ResilientImage
                  src={state.item.image}
                  alt={state.item.title[lang]}
                  fallbackTitle={state.item.title[lang]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-[#111827] text-balance">
                  {state.item.title[lang]}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-600 font-mono-tabular">
                  <span>{state.item.distanceKm} km</span>
                  <span aria-hidden="true">·</span>
                  <span>{state.item.durationHours} h</span>
                  <span aria-hidden="true">·</span>
                  <span>+{state.item.elevationM} m</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans font-medium text-neutral-800">
                    {t.routesSection.difficulty[state.item.difficulty]}
                  </span>
                </div>
              </div>

              <p className="text-[15px] text-neutral-700 leading-relaxed">
                {state.item.summary[lang]}
              </p>

              <div>
                <h3 className="text-sm font-semibold text-[#111827] mb-2.5">
                  {t.drawer.highlightsTitle}
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {state.item.highlights[lang].map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono-tabular text-xs font-semibold text-[#0B4F8C] mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[#F2F1EC] p-4 sm:p-5">
                <h3 className="text-xs font-semibold text-[#0B4F8C] mb-1">
                  {audience === 'resident'
                    ? t.drawer.residentTipTitle
                    : t.drawer.touristTipTitle}
                </h3>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {audience === 'resident'
                    ? state.item.residentTip[lang]
                    : state.item.touristTip[lang]}
                </p>
              </div>
            </>
          )}

          {state.kind === 'beach' && (
            <>
              <div className="rounded-xl overflow-hidden aspect-video border border-neutral-200">
                <ResilientImage
                  src={state.item.image}
                  alt={state.item.name}
                  fallbackTitle={state.item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-[#111827] text-balance">
                  {state.item.name}
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {state.item.municipality} ·{' '}
                  {ISLANDS.find((i) => i.id === state.item.island)?.name}
                </p>
              </div>

              <p className="text-[15px] text-neutral-700 leading-relaxed">
                {state.item.summary[lang]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-100">
                <div>
                  <div className="text-xs text-neutral-500">{t.drawer.swellLabel}</div>
                  <div className="mt-1 text-sm font-medium text-neutral-900">
                    {t.routesSection.swellRisk[state.item.swellRisk]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">{t.drawer.lifeguardLabel}</div>
                  <div className="mt-1 text-sm font-medium text-neutral-900">
                    {state.item.lifeguardSeason[lang]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">{t.drawer.transitLabel}</div>
                  <div className="mt-1 text-sm font-medium text-[#0B4F8C]">
                    {state.item.busAccessible
                      ? t.routesSection.busYes
                      : t.routesSection.busNo}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#111827] mb-2.5">
                  {t.drawer.beachServicesTitle}
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {state.item.servicesList[lang].map((srv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono-tabular text-xs font-semibold text-[#0B4F8C] mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[#F2F1EC] p-4 sm:p-5">
                <h3 className="text-xs font-semibold text-[#0B4F8C] mb-1">
                  {audience === 'resident'
                    ? t.drawer.residentTipTitle
                    : t.drawer.touristTipTitle}
                </h3>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {audience === 'resident'
                    ? state.item.residentTip[lang]
                    : state.item.touristTip[lang]}
                </p>
              </div>
            </>
          )}

          {state.kind === 'phrasebook' && (
            <>
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#111827] text-balance">
                  {t.drawer.phrasebookTitle}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-600">
                  {t.drawer.phrasebookSubtitle}
                </p>
              </div>

              {/* Useful Official Phones */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#111827]">
                  {t.drawer.phonesTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {USEFUL_PHONES.map((ph) => (
                    <div
                      key={ph.id}
                      className="rounded-xl border border-neutral-200 bg-[#FAFAF8] p-4 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="font-mono-tabular text-lg font-bold text-[#0B4F8C] flex items-center gap-1.5">
                          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>{ph.number}</span>
                        </div>
                        <div className="text-xs font-semibold text-neutral-900">
                          {ph.label[lang]}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {ph.scope[lang]}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText(ph.id, ph.number)}
                        aria-label={t.drawer.copyAction}
                        className="min-h-[38px] px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:border-neutral-300 shrink-0"
                      >
                        {copiedKey === ph.id ? (
                          <Check className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Language Quick Phrases */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[#111827]">
                    {t.drawer.phrasesTitle}
                  </h3>
                  <div className="inline-flex items-center p-1 rounded-lg bg-[#F2F1EC]">
                    {(['all', 'daily', 'transport', 'emergency'] as const).map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setPhraseCat(cat)}
                          className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            phraseCat === cat
                              ? 'bg-white text-[#111827] shadow-xs'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          {t.drawer.phraseCategories[cat]}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredPhrases.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-xl border border-neutral-200 bg-white p-4 space-y-2.5"
                    >
                      {(['es', 'ar', 'en', 'fr'] as Language[]).map((code) => {
                        const rowKey = `${entry.id}-${code}`;
                        return (
                          <div
                            key={code}
                            dir={code === 'ar' ? 'rtl' : 'ltr'}
                            className="flex items-center justify-between gap-3 py-1 border-b last:border-b-0 border-neutral-100"
                          >
                            <div className="min-w-0 flex items-baseline gap-2.5">
                              <span className="font-mono-tabular text-[11px] font-semibold text-[#0B4F8C] shrink-0">
                                {code.toUpperCase()}
                              </span>
                              <span className="text-sm text-neutral-800">
                                {entry.texts[code]}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {canSpeak && (
                                <button
                                  type="button"
                                  onClick={() => handleSpeak(entry.texts[code], code)}
                                  aria-label={t.drawer.listenAction}
                                  className="min-h-[34px] min-w-[34px] rounded-lg text-neutral-500 hover:text-[#0B4F8C] hover:bg-neutral-50 flex items-center justify-center"
                                >
                                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyText(rowKey, entry.texts[code])
                                }
                                aria-label={t.drawer.copyAction}
                                className="min-h-[34px] min-w-[34px] rounded-lg text-neutral-500 hover:text-[#0B4F8C] hover:bg-neutral-50 flex items-center justify-center"
                              >
                                {copiedKey === rowKey ? (
                                  <Check
                                    className="w-3.5 h-3.5 text-[#0B4F8C]"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {state.kind === 'saved' && (
            <>
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#111827]">
                  {t.drawer.savedTitle}
                </h2>
              </div>

              {savedItems.length === 0 ? (
                <p className="text-sm text-neutral-600 py-6 text-center border border-dashed border-neutral-200 rounded-xl px-4">
                  {t.drawer.savedEmpty}
                </p>
              ) : (
                <ul className="divide-y divide-neutral-100 border-y border-neutral-100">
                  {savedItems.map((entry) => {
                    const info = resolveSavedTitle(entry);
                    return (
                      <li
                        key={`${entry.type}-${entry.id}`}
                        className="py-3.5 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="text-xs text-neutral-500">
                            {t.drawer.typeLabels[entry.type]} · {info.meta}
                          </div>
                          {entry.type === 'island' ? (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectIslandFromSaved(entry.id);
                                onClose();
                              }}
                              className="text-sm font-semibold text-[#0B4F8C] hover:underline text-start truncate block max-w-full"
                            >
                              {info.title}
                            </button>
                          ) : (
                            <div className="text-sm font-semibold text-neutral-900 truncate">
                              {info.title}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleSave(entry.id, entry.type)}
                          aria-label={t.drawer.removeItem}
                          className="min-h-[40px] min-w-[40px] rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Interactive Personal Checklist */}
              <div className="rounded-xl bg-[#F2F1EC] p-4 sm:p-5 space-y-3">
                <h3 className="text-sm font-semibold text-[#111827]">
                  {t.drawer.checklistTitle}
                </h3>

                <form onSubmit={handleAddTaskSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder={t.drawer.checklistPlaceholder}
                    aria-label={t.drawer.checklistPlaceholder}
                    className="flex-1 min-h-[42px] rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#0B4F8C] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="min-h-[42px] px-3.5 py-2 rounded-xl bg-[#0B4F8C] hover:bg-[#093F70] text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    <span>{t.drawer.checklistAdd}</span>
                  </button>
                </form>

                {checklist.length > 0 && (
                  <ul className="divide-y divide-neutral-200/70">
                    {checklist.map((task) => (
                      <li
                        key={task.id}
                        className="py-2 flex items-center justify-between gap-3"
                      >
                        <label className="flex items-center gap-2.5 cursor-pointer text-sm text-neutral-800 min-w-0 flex-1">
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => onToggleChecklist(task.id)}
                            className="w-4 h-4 accent-[#0B4F8C] rounded shrink-0"
                          />
                          <span
                            className={`truncate ${
                              task.done ? 'line-through text-neutral-400' : ''
                            }`}
                          >
                            {task.text}
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => onRemoveChecklist(task.id)}
                          aria-label={t.drawer.removeItem}
                          className="min-h-[36px] min-w-[36px] rounded-lg text-neutral-400 hover:text-red-600 flex items-center justify-center shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 sm:px-7 py-4 border-t border-neutral-100 bg-[#FAFAF8] flex flex-wrap items-center justify-between gap-3">
          {state.kind === 'service' && (
            <button
              type="button"
              onClick={() => onToggleSave(state.item.id, 'service')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
                isSaved(state.item.id, 'service')
                  ? 'bg-[#0B4F8C] text-white'
                  : 'bg-white border border-neutral-200 text-neutral-800 hover:border-neutral-300'
              }`}
            >
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              <span>
                {isSaved(state.item.id, 'service')
                  ? t.routesSection.savedAction
                  : t.routesSection.saveAction}
              </span>
            </button>
          )}

          {state.kind === 'route' && (
            <button
              type="button"
              onClick={() => onToggleSave(state.item.id, 'route')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
                isSaved(state.item.id, 'route')
                  ? 'bg-[#0B4F8C] text-white'
                  : 'bg-white border border-neutral-200 text-neutral-800 hover:border-neutral-300'
              }`}
            >
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              <span>
                {isSaved(state.item.id, 'route')
                  ? t.routesSection.savedAction
                  : t.routesSection.saveAction}
              </span>
            </button>
          )}

          {state.kind === 'beach' && (
            <button
              type="button"
              onClick={() => onToggleSave(state.item.id, 'beach')}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
                isSaved(state.item.id, 'beach')
                  ? 'bg-[#0B4F8C] text-white'
                  : 'bg-white border border-neutral-200 text-neutral-800 hover:border-neutral-300'
              }`}
            >
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              <span>
                {isSaved(state.item.id, 'beach')
                  ? t.routesSection.savedAction
                  : t.routesSection.saveAction}
              </span>
            </button>
          )}

          {state.kind === 'saved' &&
            (savedItems.length > 0 || checklist.length > 0) && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0B4F8C] text-white text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#093F70] transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span>
                    {copied ? t.drawer.copiedFeedback : t.drawer.copyItinerary}
                  </span>
                </button>
                {savedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSaved}
                    className="min-h-[44px] px-4 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
                  >
                    {t.drawer.clearAll}
                  </button>
                )}
              </div>
            )}

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 ms-auto"
          >
            {t.drawer.close}
          </button>
        </div>
      </div>
    </div>
  );
}
