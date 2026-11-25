import { useState } from 'react';
import { Download, Smartphone, WifiOff, X } from 'lucide-react';
import { LIVE_STRINGS } from '../data/liveStrings';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types/canarias';

interface PWAInstallButtonProps {
  lang: Language;
}

export function PWAInstallButton({ lang }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const s = LIVE_STRINGS[lang].pwa;

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="min-h-[46px] px-4 py-2.5 rounded-xl border border-[#0B4F8C]/30 bg-white hover:border-[#0B4F8C] text-[#0B4F8C] text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
      >
        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{s.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="min-h-[46px] px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:border-[#0B4F8C] text-neutral-800 text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
        >
          <Smartphone className="w-4 h-4 text-[#0B4F8C] shrink-0" aria-hidden="true" />
          <span>{s.installIOS}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
            aria-label={s.iosTitle}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowIOSGuide(false);
            }}
          >
            <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-[#111827]">
                  {s.iosTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label={s.close}
                  className="min-h-[40px] min-w-[40px] -m-1 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <ol className="space-y-2 text-sm text-neutral-700 leading-relaxed list-decimal list-inside">
                <li>{s.iosStep1}</li>
                <li>{s.iosStep2}</li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full min-h-[44px] rounded-xl bg-[#0B4F8C] hover:bg-[#093F70] text-white text-sm font-semibold transition-colors"
              >
                {s.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}

interface OfflineIndicatorProps {
  lang: Language;
}

export function OfflineIndicator({ lang }: OfflineIndicatorProps) {
  const isOnline = useOnlineStatus();
  const s = LIVE_STRINGS[lang].pwa;

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-16 md:bottom-4 start-4 z-40 max-w-sm rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-amber-950 shadow-lg flex items-start gap-2.5"
    >
      <WifiOff
        className="w-4 h-4 text-amber-700 shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div className="space-y-0.5">
        <div className="text-xs font-semibold">{s.offlineBadge}</div>
        <div className="text-[11px] text-amber-900 leading-snug">
          {s.offlineHint}
        </div>
      </div>
    </div>
  );
}
