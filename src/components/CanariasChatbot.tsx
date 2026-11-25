import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  MessageSquare,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import { LIVE_STRINGS } from '../data/liveStrings';
import {
  AudienceMode,
  ChatMessage,
  GroundingSource,
  IslandId,
  Language,
} from '../types/canarias';

interface CanariasChatbotProps {
  open: boolean;
  onClose: () => void;
  lang: Language;
  audience: AudienceMode;
  selectedIslandId: IslandId;
  selectedIslandName: string;
}

export function CanariasChatbot({
  open,
  onClose,
  lang,
  audience,
  selectedIslandId,
  selectedIslandName,
}: CanariasChatbotProps) {
  const s = LIVE_STRINGS[lang].chat;
  const [messages, setMessages] = useState<
    Array<ChatMessage & { fallbackUsed?: boolean }>
  >([]);
  const [input, setInput] = useState('');
  const [useSearch, setUseSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedText, setLastFailedText] = useState<string | null>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, open]);

  if (!open) return null;

  const sendMessageText = async (rawText: string, isRetry = false) => {
    const trimmed = rawText.trim();
    if (!trimmed || loading) return;

    setError(null);
    setLastFailedText(null);

    const nextMessages = isRetry
      ? messages
      : [
          ...messages,
          {
            id: `${Date.now()}-u`,
            role: 'user' as const,
            text: trimmed,
          },
        ];

    if (!isRetry) {
      setMessages(nextMessages);
      setInput('');
    }
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, text: m.text })),
          lang,
          audience,
          island: selectedIslandId,
          useSearch,
          fastMode: !useSearch,
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        model?: string;
        fallbackUsed?: boolean;
        sources?: GroundingSource[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      const modelMsg: ChatMessage & { fallbackUsed?: boolean } = {
        id: `${Date.now()}-m`,
        role: 'model',
        text: data.reply || '',
        model: data.model,
        fallbackUsed: data.fallbackUsed,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
      setLastFailedText(trimmed);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessageText(input);
  };

  const starterPrompts =
    audience === 'resident'
      ? s.starterPromptsResident
      : s.starterPromptsTourist;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={s.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full md:max-w-2xl h-[86vh] md:h-[78vh] bg-white rounded-t-3xl md:rounded-2xl border border-neutral-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Mobile drag affordance */}
        <div className="md:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-neutral-300" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-neutral-100 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0B4F8C] shrink-0" aria-hidden="true" />
              <h2 className="font-display text-lg sm:text-xl font-semibold text-[#111827] truncate">
                {s.title}
              </h2>
            </div>
            <p className="mt-0.5 text-xs text-neutral-500">
              {selectedIslandName} ·{' '}
              {audience === 'resident' ? s.roleNoteResident : s.roleNoteTourist}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setError(null);
                }}
                aria-label={s.clear}
                className="min-h-[40px] px-2.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-red-600 hover:bg-neutral-100 inline-flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{s.clear}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label={s.close}
              className="min-h-[44px] min-w-[44px] -me-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Model / Grounding Mode Bar */}
        <div className="px-5 sm:px-6 py-2.5 bg-[#FAFAF8] border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-neutral-600">{s.subtitle}</span>
          <div className="inline-flex items-center p-0.5 rounded-lg bg-[#F2F1EC]">
            <button
              type="button"
              onClick={() => setUseSearch(true)}
              aria-pressed={useSearch}
              className={`min-h-[32px] px-3 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                useSearch
                  ? 'bg-white text-[#0B4F8C] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {s.modeSearch}
            </button>
            <button
              type="button"
              onClick={() => setUseSearch(false)}
              aria-pressed={!useSearch}
              className={`min-h-[32px] px-3 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                !useSearch
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {s.modeFast}
            </button>
          </div>
        </div>

        {/* Scrollable Conversation Thread */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-4 py-2">
              <p className="text-sm text-neutral-600">{s.emptyTitle}</p>
              <div className="space-y-2.5">
                {starterPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sendMessageText(prompt)}
                    className="w-full text-start rounded-xl border border-neutral-200 bg-[#FAFAF8] hover:border-[#0B4F8C] hover:bg-white px-4 py-3 text-sm text-neutral-800 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-[#0B4F8C] text-white'
                        : 'bg-[#F2F1EC] text-[#111827]'
                    }`}
                  >
                    {msg.text}

                    {!isUser && msg.fallbackUsed && (
                      <div className="mt-2.5 pt-2 border-t border-neutral-300/60 text-[11px] text-neutral-600">
                        {s.fallbackNote}
                      </div>
                    )}

                    {!isUser && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-300/60 space-y-1">
                        <div className="text-[11px] font-semibold text-neutral-600">
                          {s.sourcesLabel}
                        </div>
                        <ul className="space-y-1">
                          {msg.sources.map((src, i) => (
                            <li key={i}>
                              <a
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#0B4F8C] hover:underline inline-flex items-center gap-1"
                              >
                                <span className="truncate max-w-[260px]">
                                  {src.title}
                                </span>
                                <ExternalLink
                                  className="w-3 h-3 shrink-0"
                                  aria-hidden="true"
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {loading && (
            <div className="flex items-start">
              <div className="rounded-2xl bg-[#F2F1EC] px-4 py-3 text-sm text-neutral-600">
                {s.thinking}
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800 flex flex-wrap items-center justify-between gap-2"
            >
              <span>{error}</span>
              {lastFailedText && (
                <button
                  type="button"
                  onClick={() => sendMessageText(lastFailedText, true)}
                  className="px-3 py-1 rounded-lg bg-white border border-red-200 font-semibold hover:bg-red-100/50"
                >
                  {s.retry}
                </button>
              )}
            </div>
          )}

          <div ref={threadEndRef} />
        </div>

        {/* Input Composer */}
        <form
          onSubmit={handleSubmit}
          className="px-5 sm:px-6 py-4 border-t border-neutral-100 bg-[#FAFAF8] flex items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={s.placeholder}
            aria-label={s.placeholder}
            disabled={loading}
            className="flex-1 min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#0B4F8C] focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label={s.send}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0B4F8C] hover:bg-[#093F70] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors disabled:opacity-50 shrink-0"
          >
            <Send className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            <span className="hidden sm:inline">{s.send}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
