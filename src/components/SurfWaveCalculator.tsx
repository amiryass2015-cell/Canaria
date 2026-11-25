import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Compass,
  Gauge,
  RefreshCw,
  ShieldAlert,
  Sliders,
  Waves,
  Wind,
} from 'lucide-react';
import { ISLANDS } from '../data/canariasData';
import { SURF_SPOTS_CATALOG, SURF_STRINGS } from '../data/surfData';
import {
  IslandId,
  Language,
  LiveMarineData,
  SurfBoardType,
  SurfSkillLevel,
  SurfSpotId,
} from '../types/canarias';

interface SurfWaveCalculatorProps {
  lang: Language;
  selectedIslandFilter: 'all' | IslandId;
  activeIslandId: IslandId;
}

type WindQuality = 'offshore' | 'crossOffshore' | 'crossShore' | 'onshore';

function compassDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const normalized = ((deg % 360) + 360) % 360;
  return dirs[Math.round(normalized / 45) % 8];
}

function classifyWindAlignment(
  windDeg: number,
  offshoreDeg: number
): WindQuality {
  const diff = Math.abs((((windDeg - offshoreDeg) % 360) + 540) % 360 - 180);
  if (diff <= 45) return 'offshore';
  if (diff <= 80) return 'crossOffshore';
  if (diff <= 115) return 'crossShore';
  return 'onshore';
}

export function SurfWaveCalculator({
  lang,
  selectedIslandFilter,
  activeIslandId,
}: SurfWaveCalculatorProps) {
  const s = SURF_STRINGS[lang];

  const [islandScope, setIslandScope] = useState<'all' | IslandId>(
    selectedIslandFilter !== 'all' ? selectedIslandFilter : 'all'
  );
  const [spotId, setSpotId] = useState<SurfSpotId>(() => {
    const initialIsland =
      selectedIslandFilter !== 'all' ? selectedIslandFilter : activeIslandId;
    const match = SURF_SPOTS_CATALOG.find((sp) => sp.island === initialIsland);
    return match ? match.id : 'famara';
  });

  // Sync island filter if parent filter changes explicitly
  useEffect(() => {
    setIslandScope(selectedIslandFilter);
    if (selectedIslandFilter !== 'all') {
      const firstMatch = SURF_SPOTS_CATALOG.find(
        (sp) => sp.island === selectedIslandFilter
      );
      if (firstMatch) {
        setSpotId(firstMatch.id);
      }
    }
  }, [selectedIslandFilter]);

  const visibleSpots = useMemo(() => {
    if (islandScope === 'all') return SURF_SPOTS_CATALOG;
    return SURF_SPOTS_CATALOG.filter((sp) => sp.island === islandScope);
  }, [islandScope]);

  const currentSpot = useMemo(
    () =>
      SURF_SPOTS_CATALOG.find((sp) => sp.id === spotId) ?? SURF_SPOTS_CATALOG[0],
    [spotId]
  );

  // Live Open-Meteo Marine state
  const [marine, setMarine] = useState<LiveMarineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulator / Surfer profile state
  const [mode, setMode] = useState<'live' | 'simulator'>('live');
  const [simWaveHeight, setSimWaveHeight] = useState<number>(1.3);
  const [simWavePeriod, setSimWavePeriod] = useState<number>(11);
  const [simWindSpeed, setSimWindSpeed] = useState<number>(14);
  const [simWindQuality, setSimWindQuality] =
    useState<WindQuality>('offshore');

  const [skill, setSkill] = useState<SurfSkillLevel>('intermediate');
  const [boardType, setBoardType] = useState<SurfBoardType>('funboard');
  const [weightKg, setWeightKg] = useState<number>(74);

  const fetchMarine = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/marine?spot=${encodeURIComponent(spotId)}`
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as LiveMarineData;
      setMarine(data);
      // Seed simulator values from live conditions for intuitive tweaking
      setSimWaveHeight(
        Math.min(4.5, Math.max(0.3, Number(data.waveHeight.toFixed(1))))
      );
      setSimWavePeriod(
        Math.min(20, Math.max(5, Math.round(data.wavePeriod)))
      );
      setSimWindSpeed(Math.min(50, Math.max(0, Math.round(data.windSpeed))));
      setSimWindQuality(
        classifyWindAlignment(data.windDirection, data.offshoreDeg)
      );
    } catch {
      setError(s.error);
      setMarine(null);
    } finally {
      setLoading(false);
    }
  }, [spotId, s.error]);

  useEffect(() => {
    fetchMarine();
  }, [fetchMarine]);

  // Active calculation parameters (Live API vs Custom Simulator)
  const calcInputs = useMemo(() => {
    if (mode === 'live' && marine) {
      return {
        waveHeight: marine.waveHeight,
        wavePeriod: marine.wavePeriod,
        windSpeed: marine.windSpeed,
        windQuality: classifyWindAlignment(
          marine.windDirection,
          marine.offshoreDeg
        ),
        seaTemp: marine.seaTemp ?? 20.5,
      };
    }
    return {
      waveHeight: simWaveHeight,
      wavePeriod: simWavePeriod,
      windSpeed: simWindSpeed,
      windQuality: simWindQuality,
      seaTemp: marine?.seaTemp ?? 20.5,
    };
  }, [mode, marine, simWaveHeight, simWavePeriod, simWindSpeed, simWindQuality]);

  // Physics & gear calculation
  const computed = useMemo(() => {
    const { waveHeight, wavePeriod, windSpeed, windQuality, seaTemp } =
      calcInputs;

    // 1. Deep-water wave energy flux: P ≈ 0.49 * Hs^2 * Tp (kW/m)
    const wavePower = Math.max(
      0.5,
      Math.round(0.49 * waveHeight * waveHeight * wavePeriod * 10) / 10
    );

    const powerClass: keyof typeof s.powerClasses =
      wavePower < 8
        ? 'gentle'
        : wavePower < 25
        ? 'playable'
        : wavePower < 60
        ? 'solid'
        : 'heavy';

    // 2. Breaking wave face height accounting for period shoaling & bottom steepness
    const periodDelta = Math.max(0, wavePeriod - 8);
    const shoalingBase =
      currentSpot.bottom === 'reef'
        ? 1.2 + periodDelta * 0.025
        : currentSpot.bottom === 'point'
        ? 1.14 + periodDelta * 0.02
        : 1.06 + periodDelta * 0.015;
    const faceMin = Math.round(waveHeight * shoalingBase * 0.88 * 10) / 10;
    const faceMax = Math.round(waveHeight * shoalingBase * 1.12 * 10) / 10;
    const faceMid = (faceMin + faceMax) / 2;

    // 3. Recommended board volume (liters)
    const skillFactor =
      skill === 'beginner' ? 0.82 : skill === 'intermediate' ? 0.5 : 0.37;
    let baseVol = weightKg * skillFactor;
    if (boardType === 'longboard') {
      baseVol = Math.max(58, baseVol + 22);
    } else if (boardType === 'funboard') {
      baseVol = Math.max(38, baseVol + 9);
    }
    // Slight volume adjustment for wave power
    const waveAdj = wavePower < 10 ? 4 : wavePower > 45 ? -2 : 0;
    const volMin = Math.max(22, Math.round(baseVol + waveAdj - 2));
    const volMax = Math.max(volMin + 4, Math.round(baseVol + waveAdj + 4));

    // 4. Wetsuit advice combining Atlantic sea temp + wind chill
    const effectiveTemp = seaTemp - (windSpeed > 22 ? 1.5 : 0);
    const wetsuitKey: keyof typeof s.wetsuits =
      effectiveTemp >= 22.5
        ? 'shorty'
        : effectiveTemp >= 20.8
        ? 'spring32'
        : effectiveTemp >= 18.8
        ? 'full32'
        : 'full43';

    // 5. Session suitability verdict
    const skillRank: Record<SurfSkillLevel, number> = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
    };

    let verdictKey: keyof typeof s.verdicts = 'good';
    const reasons: string[] = [];

    if (waveHeight < 0.45 || wavePower < 3.5) {
      verdictKey = 'flatOrSmall';
      reasons.push(s.verdictReasons.tooSmall);
    } else if (
      skillRank[skill] < skillRank[currentSpot.minSkill] ||
      (skill === 'beginner' && (faceMid > 1.5 || wavePower > 24)) ||
      (skill === 'intermediate' && (faceMid > 2.7 || wavePower > 65))
    ) {
      verdictKey = 'notRecommended';
      reasons.push(s.verdictReasons.tooHeavyForSkill);
    } else if (
      waveHeight >= currentSpot.idealSwellMinM &&
      waveHeight <= currentSpot.idealSwellMaxM &&
      (windQuality === 'offshore' || windQuality === 'crossOffshore') &&
      windSpeed <= 26
    ) {
      verdictKey = 'ideal';
      reasons.push(s.verdictReasons.idealMatch);
    } else if (
      (windQuality === 'onshore' && windSpeed >= 20) ||
      faceMid > currentSpot.idealSwellMaxM * 1.15
    ) {
      verdictKey = 'challenging';
      if (windQuality === 'onshore' && windSpeed >= 18) {
        reasons.push(s.verdictReasons.windOnshoreChop);
      } else {
        reasons.push(s.verdictReasons.goodMatch);
      }
    } else {
      verdictKey = 'good';
      reasons.push(s.verdictReasons.goodMatch);
      if (windQuality === 'onshore' && windSpeed >= 18) {
        reasons.push(s.verdictReasons.windOnshoreChop);
      }
    }

    if (currentSpot.bottom === 'reef') {
      reasons.push(s.verdictReasons.reefCaution);
    }

    return {
      wavePower,
      powerClass,
      faceMin,
      faceMax,
      volMin,
      volMax,
      wetsuitKey,
      verdictKey,
      reasons,
      seaTemp,
    };
  }, [calcInputs, currentSpot, skill, boardType, weightKg, s]);

  const islandName =
    ISLANDS.find((isl) => isl.id === currentSpot.island)?.name ??
    currentSpot.island;

  const maxHourlyHeight = useMemo(() => {
    if (!marine?.hourly?.length) return 2;
    return Math.max(1.2, ...marine.hourly.map((h) => h.waveHeight));
  }, [marine]);

  const verdictBadgeStyle: Record<keyof typeof s.verdicts, string> = {
    heading: '',
    ideal: 'bg-[#0B4F8C]/10 text-[#0B4F8C] border-[#0B4F8C]/25',
    good: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    challenging: 'bg-amber-50 text-amber-800 border-amber-200',
    notRecommended: 'bg-red-50 text-red-800 border-red-200',
    flatOrSmall: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Spot Selector + Live / Simulator Switcher */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 border-b border-neutral-100 pb-5">
          <div className="max-w-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-medium text-[#0B4F8C]">
              <Waves className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{s.providerLabel}</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111827] text-balance">
              {s.title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {s.subtitle}
            </p>
          </div>

          <div
            role="group"
            aria-label={s.title}
            className="inline-flex items-center p-1 rounded-xl bg-[#F2F1EC] self-start shrink-0"
          >
            <button
              type="button"
              onClick={() => setMode('live')}
              aria-pressed={mode === 'live'}
              className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                mode === 'live'
                  ? 'bg-[#0B4F8C] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              {s.liveMode}
            </button>
            <button
              type="button"
              onClick={() => setMode('simulator')}
              aria-pressed={mode === 'simulator'}
              className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                mode === 'simulator'
                  ? 'bg-[#0B4F8C] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{s.simulatorMode}</span>
            </button>
          </div>
        </div>

        {/* Island Scope + Surf Spot Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 space-y-1.5">
            <label
              htmlFor="surf-island-filter"
              className="block text-xs font-medium text-neutral-600"
            >
              {s.islandBadgePrefix}
            </label>
            <select
              id="surf-island-filter"
              value={islandScope}
              onChange={(e) => {
                const next = e.target.value as 'all' | IslandId;
                setIslandScope(next);
                if (next !== 'all') {
                  const first = SURF_SPOTS_CATALOG.find(
                    (sp) => sp.island === next
                  );
                  if (first) setSpotId(first.id);
                }
              }}
              className="w-full min-h-[44px] rounded-xl border border-neutral-200 bg-[#FAFAF8] px-3.5 py-2 text-sm font-medium text-neutral-900 focus:border-[#0B4F8C] focus:outline-none"
            >
              <option value="all">{s.islandFilterAll}</option>
              {ISLANDS.map((isl) => (
                <option key={isl.id} value={isl.id}>
                  {isl.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-6 space-y-1.5">
            <label
              htmlFor="surf-spot-select"
              className="block text-xs font-medium text-neutral-600"
            >
              {s.spotLabel}
            </label>
            <select
              id="surf-spot-select"
              value={spotId}
              onChange={(e) => setSpotId(e.target.value as SurfSpotId)}
              className="w-full min-h-[44px] rounded-xl border border-neutral-200 bg-[#FAFAF8] px-3.5 py-2 text-sm font-semibold text-neutral-900 focus:border-[#0B4F8C] focus:outline-none"
            >
              {visibleSpots.map((sp) => {
                const islLabel =
                  ISLANDS.find((i) => i.id === sp.island)?.name ?? sp.island;
                return (
                  <option key={sp.id} value={sp.id}>
                    {sp.name} — {islLabel}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              type="button"
              onClick={fetchMarine}
              disabled={loading}
              className="w-full md:w-auto min-h-[44px] px-4 py-2 rounded-xl border border-neutral-200 bg-white hover:border-[#0B4F8C] text-xs font-semibold text-neutral-800 inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>{s.syncLive}</span>
            </button>
          </div>
        </div>

        {/* Selected Spot Summary Strip */}
        <div className="rounded-xl bg-[#FAFAF8] border border-neutral-200/80 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs text-neutral-500">
              <span>{islandName}</span>
              <span aria-hidden="true"> · </span>
              <span>{currentSpot.municipality}</span>
              <span aria-hidden="true"> · </span>
              <span>{s.bottomTypes[currentSpot.bottom]}</span>
              <span aria-hidden="true"> · </span>
              <span>
                {s.metrics.spotRange}:{' '}
                <strong className="font-mono-tabular text-neutral-800">
                  {currentSpot.idealSwellMinM}–{currentSpot.idealSwellMaxM} m
                </strong>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {currentSpot.description[lang]}
            </p>
          </div>

          {marine && (
            <div className="text-[11px] text-neutral-500 shrink-0 font-mono-tabular">
              {s.observedAt}: {marine.observedAt.slice(11, 16)}
            </div>
          )}
        </div>

        {/* Live API Error / Loading Notice */}
        {loading && !marine && (
          <div className="rounded-xl border border-neutral-200 bg-[#FAFAF8] p-4 text-xs text-neutral-600">
            {s.loading}
          </div>
        )}

        {error && !loading && mode === 'live' && (
          <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-red-800">
            <span>{error}</span>
            <button
              type="button"
              onClick={fetchMarine}
              className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white border border-red-200 font-semibold hover:bg-red-50"
            >
              {s.retry}
            </button>
          </div>
        )}

        {/* Main 2-Column Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Inputs (Surfer Profile + Wave/Wind Controls) */}
          <div className="lg:col-span-5 rounded-xl border border-neutral-200 bg-[#FAFAF8] p-5 space-y-5">
            <h4 className="text-sm font-semibold text-[#111827] border-b border-neutral-200/80 pb-3">
              {s.inputsHeading}
            </h4>

            {/* Skill Level */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-neutral-600">
                {s.skillLabel}
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F2F1EC]">
                {(['beginner', 'intermediate', 'advanced'] as const).map(
                  (lvl) => {
                    const active = skill === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSkill(lvl)}
                        aria-pressed={active}
                        className={`min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                          active
                            ? 'bg-[#111827] text-white'
                            : 'text-neutral-700 hover:text-neutral-900'
                        }`}
                      >
                        {s.skills[lvl]}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Board Type */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-neutral-600">
                {s.boardLabel}
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F2F1EC]">
                {(['longboard', 'funboard', 'shortboard'] as const).map(
                  (b) => {
                    const active = boardType === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBoardType(b)}
                        aria-pressed={active}
                        className={`min-h-[40px] px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors truncate ${
                          active
                            ? 'bg-[#0B4F8C] text-white'
                            : 'text-neutral-700 hover:text-neutral-900'
                        }`}
                      >
                        {s.boards[b]}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Surfer Weight */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="surf-weight-slider"
                  className="font-medium text-neutral-600"
                >
                  {s.surferWeightLabel}
                </label>
                <span className="font-mono-tabular font-semibold text-neutral-900">
                  {weightKg} kg
                </span>
              </div>
              <input
                id="surf-weight-slider"
                type="range"
                min={45}
                max={115}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-[#0B4F8C] cursor-pointer"
              />
            </div>

            {/* Wave Height & Period & Wind Controls (interactive in Simulator, read-only readout / quick-switch in Live) */}
            <div className="pt-3 border-t border-neutral-200/80 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="surf-height-slider"
                    className="font-medium text-neutral-600"
                  >
                    {s.waveHeightLabel}
                  </label>
                  <span className="font-mono-tabular font-semibold text-[#0B4F8C]">
                    {calcInputs.waveHeight.toFixed(1)} m
                  </span>
                </div>
                <input
                  id="surf-height-slider"
                  type="range"
                  min={0.3}
                  max={4.5}
                  step={0.1}
                  value={calcInputs.waveHeight}
                  onChange={(e) => {
                    if (mode !== 'simulator') setMode('simulator');
                    setSimWaveHeight(Number(e.target.value));
                  }}
                  className="w-full accent-[#0B4F8C] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="surf-period-slider"
                    className="font-medium text-neutral-600"
                  >
                    {s.wavePeriodLabel}
                  </label>
                  <span className="font-mono-tabular font-semibold text-neutral-900">
                    {calcInputs.wavePeriod.toFixed(0)} s
                  </span>
                </div>
                <input
                  id="surf-period-slider"
                  type="range"
                  min={5}
                  max={20}
                  step={1}
                  value={calcInputs.wavePeriod}
                  onChange={(e) => {
                    if (mode !== 'simulator') setMode('simulator');
                    setSimWavePeriod(Number(e.target.value));
                  }}
                  className="w-full accent-[#0B4F8C] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="surf-wind-slider"
                    className="font-medium text-neutral-600"
                  >
                    {s.windSpeedLabel}
                  </label>
                  <span className="font-mono-tabular font-semibold text-neutral-900">
                    {calcInputs.windSpeed} km/h
                  </span>
                </div>
                <input
                  id="surf-wind-slider"
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={calcInputs.windSpeed}
                  onChange={(e) => {
                    if (mode !== 'simulator') setMode('simulator');
                    setSimWindSpeed(Number(e.target.value));
                  }}
                  className="w-full accent-[#0B4F8C] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="surf-wind-quality"
                  className="block text-xs font-medium text-neutral-600"
                >
                  {s.windQualityInputLabel}
                </label>
                <select
                  id="surf-wind-quality"
                  value={calcInputs.windQuality}
                  onChange={(e) => {
                    if (mode !== 'simulator') setMode('simulator');
                    setSimWindQuality(e.target.value as WindQuality);
                  }}
                  className="w-full min-h-[40px] rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 focus:border-[#0B4F8C] focus:outline-none"
                >
                  <option value="offshore">{s.windQualities.offshore}</option>
                  <option value="crossOffshore">
                    {s.windQualities.crossOffshore}
                  </option>
                  <option value="crossShore">
                    {s.windQualities.crossShore}
                  </option>
                  <option value="onshore">{s.windQualities.onshore}</option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT: Physics Calculations, Verdict & 12h Forecast */}
          <div className="lg:col-span-7 space-y-5">
            {/* Session Suitability Verdict */}
            <div
              className={`rounded-xl border p-5 space-y-2.5 ${verdictBadgeStyle[computed.verdictKey]}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  {s.verdicts.heading}
                </span>
                <span className="font-mono-tabular text-xs font-semibold">
                  {s.powerClasses[computed.powerClass]} · {computed.wavePower} kW/m
                </span>
              </div>
              <div className="font-display text-xl sm:text-2xl font-semibold">
                {s.verdicts[computed.verdictKey]}
              </div>
              <ul className="space-y-1 text-xs sm:text-sm leading-relaxed opacity-95">
                {computed.reasons.map((reason, idx) => (
                  <li key={idx}>• {reason}</li>
                ))}
              </ul>
            </div>

            {/* 6-Card Computed Telemetry & Gear Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">
                  {s.metrics.breakingFace}
                </div>
                <div className="mt-1 font-mono-tabular text-xl font-semibold text-[#0B4F8C]">
                  {computed.faceMin}–{computed.faceMax} m
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                  <span>{s.metrics.wavePower}</span>
                </div>
                <div className="mt-1 font-mono-tabular text-xl font-semibold text-[#111827]">
                  {computed.wavePower} kW/m
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">
                  {s.metrics.recommendedVolume}
                </div>
                <div className="mt-1 font-mono-tabular text-xl font-semibold text-[#111827]">
                  {computed.volMin}–{computed.volMax} L
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                  <span>{s.metrics.primarySwell}</span>
                </div>
                <div className="mt-1 font-mono-tabular text-sm font-semibold text-neutral-900">
                  {marine && mode === 'live'
                    ? `${marine.swellHeight} m @ ${marine.swellPeriod} s · ${compassDirection(
                        marine.swellDirection
                      )}`
                    : `${calcInputs.waveHeight.toFixed(1)} m @ ${calcInputs.wavePeriod} s`}
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                  <span>{s.metrics.windAlignment}</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-neutral-900">
                  {s.windQualities[calcInputs.windQuality]}
                </div>
                {marine && mode === 'live' && (
                  <div className="font-mono-tabular text-[11px] text-neutral-500 mt-0.5">
                    {marine.windSpeed} km/h {compassDirection(marine.windDirection)}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">
                  {s.metrics.seaTemp}
                </div>
                <div className="mt-1 font-mono-tabular text-sm font-semibold text-neutral-900">
                  {computed.seaTemp} °C
                </div>
                <div className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                  {s.wetsuits[computed.wetsuitKey]}
                </div>
              </div>
            </div>

            {/* 12-Hour Live Marine Trend */}
            {marine && marine.hourly.length > 0 && (
              <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-[#111827]">
                      {s.hourlyHeading}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {s.hourlyNote}
                    </div>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono-tabular">
                    {marine.provider}
                  </div>
                </div>

                {/* Preserve LTR time progression even in Arabic RTL */}
                <div dir="ltr" className="overflow-x-auto pb-1">
                  <div className="grid grid-cols-12 gap-1.5 min-w-[460px] items-end pt-2">
                    {marine.hourly.slice(0, 12).map((pt) => {
                      const pct = Math.max(
                        16,
                        Math.round((pt.waveHeight / maxHourlyHeight) * 100)
                      );
                      return (
                        <div
                          key={pt.time}
                          className="flex flex-col items-center gap-1"
                        >
                          <span className="font-mono-tabular text-[10px] font-semibold text-neutral-800">
                            {pt.waveHeight.toFixed(1)}
                          </span>
                          <div className="w-full h-16 flex items-end justify-center bg-[#FAFAF8] rounded-md p-0.5">
                            <div
                              className="w-full rounded-sm bg-[#0B4F8C]/85"
                              style={{ height: `${pct}%` }}
                            />
                          </div>
                          <span className="font-mono-tabular text-[10px] text-neutral-500">
                            {pt.wavePeriod.toFixed(0)}s
                          </span>
                          <span className="font-mono-tabular text-[10px] text-neutral-600">
                            {pt.time}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Local Safety + Formula Note */}
            <div className="rounded-xl border border-neutral-200/80 bg-[#F2F1EC]/80 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
                <ShieldAlert
                  className="w-4 h-4 text-amber-700 shrink-0"
                  aria-hidden="true"
                />
                <span>{s.safetyTitle}</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {currentSpot.safetyNote[lang]}
              </p>
              <p className="text-[11px] text-neutral-500 pt-1">
                {s.formulaNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
