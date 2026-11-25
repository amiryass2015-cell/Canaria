import { useEffect, useMemo, useState } from 'react';
import {
  Bike,
  Bus,
  CreditCard,
  PlaneLanding,
  Ship,
  TrainFront,
} from 'lucide-react';
import { ISLANDS } from '../data/canariasData';
import { ISLAND_TRANSPORT, TRANSPORT_STRINGS } from '../data/transportData';
import { UIStrings } from '../data/translations';
import {
  AudienceMode,
  IslandId,
  Language,
  TransportLineItem,
} from '../types/canarias';
import { FareCalculator } from './FareCalculator';

interface TransportHubProps {
  lang: Language;
  audience: AudienceMode;
  selectedIslandId: IslandId;
  t: UIStrings;
}

function getLineIcon(kind: TransportLineItem['kind']) {
  if (kind === 'airport') return PlaneLanding;
  if (kind === 'tram') return TrainFront;
  if (kind === 'maritime') return Ship;
  return Bus;
}

export function TransportHub({
  lang,
  audience,
  selectedIslandId,
  t,
}: TransportHubProps) {
  const s = TRANSPORT_STRINGS[lang];
  const [islandId, setIslandId] = useState<IslandId>(selectedIslandId);
  const [activeView, setActiveView] = useState<'lines' | 'passes'>('lines');

  // Estimator inputs
  const [tripsCount, setTripsCount] = useState<number>(16);
  const [airportTrips, setAirportTrips] = useState<number>(2);

  useEffect(() => {
    setIslandId(selectedIslandId);
  }, [selectedIslandId]);

  const info = ISLAND_TRANSPORT[islandId];
  const islandInfo = useMemo(
    () => ISLANDS.find((isl) => isl.id === islandId) ?? ISLANDS[0],
    [islandId]
  );

  // Compute typical single fare & airport transfer fare from island lines
  const estimator = useMemo(() => {
    const nonAirportLines = info.lines.filter((l) => l.kind !== 'airport');
    const airportLine = info.lines.find((l) => l.kind === 'airport');

    const avgLocalFare =
      nonAirportLines.length > 0
        ? nonAirportLines.reduce((acc, l) => acc + l.standardFareEur, 0) /
          nonAirportLines.length
        : 2.5;
    const airportFare = airportLine ? airportLine.standardFareEur : 3.0;

    const totalStandardEur =
      Math.round((tripsCount * avgLocalFare + airportTrips * airportFare) * 10) /
      10;

    const sortedPasses = [...info.passes].sort((a, b) => {
      const aMatch = a.audience === audience ? 0 : 1;
      const bMatch = b.audience === audience ? 0 : 1;
      return aMatch - bMatch;
    });

    const isResidentFree = audience === 'resident';
    const shouldUseTouristPass =
      !isResidentFree && (totalStandardEur >= 14 || tripsCount >= 8);

    return {
      totalStandardEur,
      sortedPasses,
      isResidentFree,
      shouldUseTouristPass,
    };
  }, [info, tripsCount, airportTrips, audience]);

  return (
    <div className="space-y-8">
      {/* Section Header + Island Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-medium text-[#0B4F8C] mb-2">
            {s.sectionKicker}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111827] text-balance">
            {s.heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
            {s.subheading}
          </p>
        </div>

        {/* Island Switcher */}
        <div className="w-full sm:w-64 shrink-0">
          <label
            htmlFor="transport-island-select"
            className="block text-xs font-medium text-neutral-600 mb-1.5"
          >
            {s.islandSelectorLabel}
          </label>
          <select
            id="transport-island-select"
            value={islandId}
            onChange={(e) => setIslandId(e.target.value as IslandId)}
            className="w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 focus:border-[#0B4F8C] focus:outline-none"
          >
            {ISLANDS.map((isl) => (
              <option key={isl.id} value={isl.id}>
                {isl.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Island Bus / Tram / Airport Network Card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7 space-y-6">
        {/* Top Metadata + View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <div>
              <div className="text-xs text-neutral-500">{s.operatorLabel}</div>
              <div className="mt-0.5 text-sm font-semibold text-[#111827]">
                {info.mainOperator}
              </div>
              {info.secondaryOperator && (
                <div className="text-xs text-neutral-600 mt-0.5">
                  {info.secondaryOperator}
                </div>
              )}
            </div>

            <div>
              <div className="text-xs text-neutral-500">{s.cardLabel}</div>
              <div className="mt-0.5 text-sm font-semibold text-[#0B4F8C]">
                {info.cardName}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">
                {islandInfo.airports.join(' · ')}
              </div>
            </div>

            <div>
              <div className="text-xs text-neutral-500">{s.airportHubLabel}</div>
              <p className="mt-0.5 text-xs text-neutral-700 leading-relaxed">
                {info.airportConnectionSummary[lang]}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-[#F2F1EC] self-start lg:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveView('lines')}
              aria-pressed={activeView === 'lines'}
              className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'lines'
                  ? 'bg-white text-[#0B4F8C] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Bus className="w-4 h-4" aria-hidden="true" />
              <span>{s.tabLines}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('passes')}
              aria-pressed={activeView === 'passes'}
              className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'passes'
                  ? 'bg-white text-[#0B4F8C] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <CreditCard className="w-4 h-4" aria-hidden="true" />
              <span>{s.tabPasses}</span>
            </button>
          </div>
        </div>

        {activeView === 'lines' ? (
          <div className="space-y-5">
            {/* Key Island Lines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {info.lines.map((line) => {
                const Icon = getLineIcon(line.kind);
                return (
                  <div
                    key={line.code + line.route}
                    className="rounded-xl border border-neutral-200/90 bg-[#FAFAF8] p-4 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Icon
                          className="w-3.5 h-3.5 text-[#0B4F8C] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-mono-tabular font-semibold text-[#111827]">
                          {line.code}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{s.lineKindLabels[line.kind]}</span>
                      </div>
                      <div className="text-sm font-semibold text-[#111827] leading-snug">
                        {line.route}
                      </div>
                      <div className="text-xs text-neutral-600">
                        {line.frequency[lang]} ·{' '}
                        <span className="font-mono-tabular">
                          {line.durationMin} {s.minutesUnit}
                        </span>
                      </div>
                    </div>

                    <div className="text-end shrink-0">
                      <div className="text-[11px] text-neutral-500">
                        {s.singleFareLabel}
                      </div>
                      <div className="font-mono-tabular text-base font-semibold text-[#0B4F8C] mt-0.5">
                        {line.standardFareEur.toFixed(2)} €
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Audience-focused Practical Advice + Bike/Surf Rule */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="rounded-xl bg-[#F2F1EC] p-4 space-y-1">
                <div className="text-xs font-semibold text-[#0B4F8C]">
                  {s.residentRulesTitle}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  {info.residentPassRule[lang]}
                </p>
              </div>
              <div className="rounded-xl bg-[#F2F1EC] p-4 space-y-1">
                <div className="text-xs font-semibold text-[#111827]">
                  {s.touristRulesTitle}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  {info.touristPayRule[lang]}
                </p>
              </div>
              <div className="rounded-xl bg-[#F2F1EC] p-4 space-y-1">
                <div className="text-xs font-semibold text-[#111827] inline-flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                  <span>{s.bikeSurfTitle}</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  {info.bikeAndSurfRule[lang]}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Cards & Passes List */}
            <div className="lg:col-span-6 space-y-3.5">
              {estimator.sortedPasses.map((pass, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 bg-[#FAFAF8] p-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#0B4F8C]">
                      {pass.audience === 'resident'
                        ? t.audience.resident
                        : pass.audience === 'tourist'
                        ? t.audience.tourist
                        : `${t.audience.resident} / ${t.audience.tourist}`}
                    </span>
                    <span className="font-mono-tabular text-xs font-semibold text-neutral-900">
                      {pass.priceNote[lang]}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[#111827]">
                    {pass.name[lang]}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {pass.detail[lang]}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Transit Pass Cost Estimator */}
            <div className="lg:col-span-6 rounded-xl border border-neutral-200 bg-[#FAFAF8] p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-[#111827]">
                  {s.estimator.heading}
                </h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  {s.estimator.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="transport-trips-slider"
                      className="font-medium text-neutral-700"
                    >
                      {s.estimator.tripsPerWeekLabel}
                    </label>
                    <span className="font-mono-tabular font-semibold text-[#111827]">
                      {tripsCount}
                    </span>
                  </div>
                  <input
                    id="transport-trips-slider"
                    type="range"
                    min={2}
                    max={45}
                    step={1}
                    value={tripsCount}
                    onChange={(e) => setTripsCount(Number(e.target.value))}
                    className="w-full accent-[#0B4F8C] cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="transport-airport-slider"
                      className="font-medium text-neutral-700"
                    >
                      {s.estimator.airportTransfersLabel}
                    </label>
                    <span className="font-mono-tabular font-semibold text-[#111827]">
                      {airportTrips}
                    </span>
                  </div>
                  <input
                    id="transport-airport-slider"
                    type="range"
                    min={0}
                    max={4}
                    step={1}
                    value={airportTrips}
                    onChange={(e) => setAirportTrips(Number(e.target.value))}
                    className="w-full accent-[#0B4F8C] cursor-pointer"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-neutral-600">
                    {s.estimator.singleCostLabel}
                  </span>
                  <span className="font-mono-tabular text-lg font-semibold text-[#111827]">
                    {estimator.totalStandardEur.toFixed(1)} €
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1">
                  <div className="text-[11px] font-medium text-[#0B4F8C]">
                    {s.estimator.recommendedOptionLabel}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#111827]">
                    {estimator.isResidentFree
                      ? s.estimator.residentFreeResult
                      : estimator.shouldUseTouristPass
                      ? s.estimator.touristPassHint
                      : s.estimator.touristSingleHint}
                  </div>
                  {estimator.isResidentFree && (
                    <p className="text-[11px] text-neutral-600">
                      {s.estimator.residentSavingsNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inter-island Ferry & Flight Fare Calculator (-75% Resident Subsidy) */}
      <FareCalculator
        islands={ISLANDS}
        audience={audience}
        t={t}
        selectedIsland={islandId}
      />
    </div>
  );
}
