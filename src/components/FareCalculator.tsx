import { useEffect, useState } from 'react';
import { ArrowLeftRight, Plane, Ship } from 'lucide-react';
import { findConnection } from '../data/canariasData';
import { UIStrings } from '../data/translations';
import { AudienceMode, IslandId, IslandInfo } from '../types/canarias';

interface FareCalculatorProps {
  islands: IslandInfo[];
  audience: AudienceMode;
  t: UIStrings;
  selectedIsland: IslandId;
}

export function FareCalculator({
  islands,
  audience,
  t,
  selectedIsland,
}: FareCalculatorProps) {
  const [fromIsland, setFromIsland] = useState<IslandId>(selectedIsland);
  const [toIsland, setToIsland] = useState<IslandId>(
    selectedIsland === 'tenerife' ? 'gran-canaria' : 'tenerife'
  );
  const [isResidentFare, setIsResidentFare] = useState<boolean>(
    audience === 'resident'
  );

  useEffect(() => {
    setIsResidentFare(audience === 'resident');
  }, [audience]);

  // Sync fare mode only when audience changes via a clean derived fallback or explicit toggle
  const connection = findConnection(fromIsland, toIsland);
  const discountedFare = connection
    ? Math.max(3, Math.round(connection.standardEur * 0.25))
    : 0;
  const displayedFare = connection
    ? isResidentFare
      ? discountedFare
      : connection.standardEur
    : 0;

  const handleSwap = () => {
    setFromIsland(toIsland);
    setToIsland(fromIsland);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-100">
        <div className="max-w-2xl">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111827] text-balance">
            {t.calculator.heading}
          </h3>
          <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
            {t.calculator.subheading}
          </p>
        </div>

        {/* Tariff toggle */}
        <div className="inline-flex items-center p-1 rounded-lg bg-[#F2F1EC] self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setIsResidentFare(true)}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              isResidentFare
                ? 'bg-white text-[#0B4F8C] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {t.audience.resident} (-75 %)
          </button>
          <button
            type="button"
            onClick={() => setIsResidentFare(false)}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              !isResidentFare
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {t.audience.tourist}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
        <div className="lg:col-span-4">
          <label
            htmlFor="calc-from"
            className="block text-xs font-medium text-neutral-600 mb-1.5"
          >
            {t.calculator.origin}
          </label>
          <select
            id="calc-from"
            value={fromIsland}
            onChange={(e) => setFromIsland(e.target.value as IslandId)}
            className="w-full min-h-[44px] rounded-xl border border-neutral-200 bg-[#FAFAF8] px-3.5 py-2.5 text-sm font-medium text-neutral-900 focus:border-[#0B4F8C] focus:outline-none"
          >
            {islands.map((isl) => (
              <option key={isl.id} value={isl.id}>
                {isl.name}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            aria-label={t.calculator.swapAction}
            className="min-h-[44px] min-w-[44px] rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 flex items-center justify-center transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="lg:col-span-4">
          <label
            htmlFor="calc-to"
            className="block text-xs font-medium text-neutral-600 mb-1.5"
          >
            {t.calculator.destination}
          </label>
          <select
            id="calc-to"
            value={toIsland}
            onChange={(e) => setToIsland(e.target.value as IslandId)}
            className="w-full min-h-[44px] rounded-xl border border-neutral-200 bg-[#FAFAF8] px-3.5 py-2.5 text-sm font-medium text-neutral-900 focus:border-[#0B4F8C] focus:outline-none"
          >
            {islands.map((isl) => (
              <option key={isl.id} value={isl.id}>
                {isl.name}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-xl bg-[#F2F1EC] px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-600">
                {t.calculator.estimatedFare}
              </div>
              <div className="font-mono-tabular text-2xl font-semibold text-[#0B4F8C] mt-0.5">
                {connection ? `${displayedFare} €` : '—'}
              </div>
            </div>
            {connection && (
              <div className="text-end text-xs text-neutral-600">
                <div className="inline-flex items-center gap-1.5 font-medium text-neutral-800">
                  {connection.mode === 'ferry' ? (
                    <Ship className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                  ) : (
                    <Plane className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                  )}
                  <span>
                    {connection.mode === 'ferry'
                      ? t.calculator.ferryLabel
                      : t.calculator.flightLabel}
                  </span>
                </div>
                <div className="font-mono-tabular mt-0.5">
                  {connection.durationMinutes} {t.calculator.minutesUnit}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
        {connection ? (
          <>
            <span>
              {t.calculator.operatorLabel}:{' '}
              <strong className="font-medium text-neutral-900">
                {connection.operator}
              </strong>
            </span>
            <span>
              {isResidentFare
                ? t.calculator.residentDiscountNote
                : t.calculator.standardFareNote}
            </span>
          </>
        ) : (
          <span>{t.calculator.sameIslandHint}</span>
        )}
      </div>
    </div>
  );
}
