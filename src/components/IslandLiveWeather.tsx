import { useCallback, useEffect, useState } from 'react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  ExternalLink,
  RefreshCw,
  Search,
  Sun,
  Wind,
} from 'lucide-react';
import { LIVE_STRINGS } from '../data/liveStrings';
import {
  AudienceMode,
  IslandBriefData,
  IslandId,
  Language,
  LiveWeatherData,
} from '../types/canarias';

interface IslandLiveWeatherProps {
  islandId: IslandId;
  lang: Language;
  audience: AudienceMode;
}

function compassDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function getWeatherDescriptor(
  code: number,
  labels: (typeof LIVE_STRINGS)['es']['weather']['conditions']
) {
  if (code === 0) return { label: labels.clear, Icon: Sun };
  if (code === 1 || code === 2) {
    return { label: labels.partlyCloudy, Icon: CloudSun };
  }
  if (code === 3) return { label: labels.cloudy, Icon: Cloud };
  if (code === 45 || code === 48) return { label: labels.fog, Icon: CloudFog };
  if (code >= 51 && code <= 57) {
    return { label: labels.drizzle, Icon: CloudDrizzle };
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return { label: labels.rain, Icon: CloudRain };
  }
  if (code >= 95) return { label: labels.storm, Icon: CloudLightning };
  return { label: labels.partlyCloudy, Icon: CloudSun };
}

export function IslandLiveWeather({
  islandId,
  lang,
  audience,
}: IslandLiveWeatherProps) {
  const s = LIVE_STRINGS[lang];
  const [weather, setWeather] = useState<LiveWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [brief, setBrief] = useState<IslandBriefData | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/weather?island=${encodeURIComponent(islandId)}`
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as LiveWeatherData;
      setWeather(data);
    } catch {
      setError(s.weather.error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [islandId, s.weather.error]);

  useEffect(() => {
    fetchWeather();
    setBrief(null);
    setBriefError(null);
  }, [fetchWeather]);

  const handleLoadBrief = async () => {
    setBriefLoading(true);
    setBriefError(null);
    try {
      const res = await fetch('/api/island-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ island: islandId, lang, audience }),
      });
      const data = (await res.json()) as IslandBriefData & { error?: string };
      if (!res.ok) {
        throw new Error(data.error || s.brief.error);
      }
      setBrief(data);
    } catch (err) {
      setBriefError(err instanceof Error ? err.message : s.brief.error);
    } finally {
      setBriefLoading(false);
    }
  };

  const descriptor = weather
    ? getWeatherDescriptor(weather.weatherCode, s.weather.conditions)
    : null;
  const WeatherIcon = descriptor?.Icon ?? CloudSun;

  const formattedTime = weather?.observedAt
    ? weather.observedAt.slice(11, 16)
    : '';

  return (
    <div className="space-y-3">
      {/* Live External Weather Card */}
      <div className="rounded-xl border border-neutral-200/90 bg-[#FAFAF8] p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-[#111827]">
              {s.weather.title}
            </div>
            {weather && (
              <div className="text-[11px] text-neutral-500">
                {s.weather.station}: {weather.station}
                {formattedTime ? ` · ${formattedTime}` : ''}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={fetchWeather}
            disabled={loading}
            aria-label={s.weather.refresh}
            className="min-h-[36px] px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white hover:border-neutral-300 text-xs font-medium text-neutral-700 inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span>{s.weather.refresh}</span>
          </button>
        </div>

        {loading && !weather && (
          <div className="py-3 text-xs text-neutral-500">{s.weather.loading}</div>
        )}

        {error && !loading && (
          <div className="py-2 flex items-center justify-between gap-3 text-xs text-red-700">
            <span>{error}</span>
            <button
              type="button"
              onClick={fetchWeather}
              className="px-2.5 py-1 rounded-md border border-red-200 bg-white font-semibold hover:bg-red-50"
            >
              {s.weather.retry}
            </button>
          </div>
        )}

        {weather && descriptor && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-neutral-200/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B4F8C]/10 text-[#0B4F8C] flex items-center justify-center shrink-0">
                  <WeatherIcon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-mono-tabular text-2xl font-semibold text-[#111827]">
                    {weather.temperature} °C
                  </div>
                  <div className="text-xs text-neutral-600">
                    {descriptor.label} · {s.weather.feelsLike}{' '}
                    <span className="font-mono-tabular">
                      {weather.apparentTemperature} °C
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-500">
                {s.weather.sourceLabel}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-neutral-200/60">
              <div>
                <div className="text-[11px] text-neutral-500">
                  {s.weather.wind}
                </div>
                <div className="font-mono-tabular text-xs sm:text-sm font-semibold text-neutral-900 inline-flex items-center gap-1 mt-0.5">
                  <Wind className="w-3.5 h-3.5 text-[#0B4F8C]" aria-hidden="true" />
                  <span>
                    {weather.windSpeed} km/h {compassDirection(weather.windDirection)}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-neutral-500">
                  {s.weather.humidity}
                </div>
                <div className="font-mono-tabular text-xs sm:text-sm font-semibold text-neutral-900 mt-0.5">
                  {weather.humidity} %
                </div>
              </div>

              <div>
                <div className="text-[11px] text-neutral-500">
                  {s.weather.range}
                </div>
                <div className="font-mono-tabular text-xs sm:text-sm font-semibold text-neutral-900 mt-0.5">
                  {weather.tempMin !== null && weather.tempMax !== null
                    ? `${weather.tempMin}° / ${weather.tempMax}°`
                    : '—'}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-neutral-500">
                  {s.weather.uvMax}
                </div>
                <div className="font-mono-tabular text-xs sm:text-sm font-semibold text-[#0B4F8C] mt-0.5">
                  {weather.uvMax !== null ? weather.uvMax : '—'}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Optional Google Search Grounded Live Briefing */}
      <div className="rounded-xl border border-neutral-200/80 bg-white p-3.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium text-neutral-700">
            {s.brief.title}
          </span>
          <button
            type="button"
            onClick={handleLoadBrief}
            disabled={briefLoading}
            className="min-h-[36px] px-3 py-1.5 rounded-lg bg-[#0B4F8C]/8 hover:bg-[#0B4F8C]/15 text-[#0B4F8C] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {briefLoading ? s.brief.loading : s.brief.buttonLabel}
            </span>
          </button>
        </div>

        {briefError && (
          <p className="text-xs text-red-700">{briefError}</p>
        )}

        {brief && (
          <div className="pt-2 border-t border-neutral-100 space-y-2">
            <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {brief.summary}
            </div>
            {brief.sources.length > 0 && (
              <div className="pt-1.5 space-y-1">
                <div className="text-[11px] font-medium text-neutral-500">
                  {s.brief.sourcesLabel}
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {brief.sources.map((src, idx) => (
                    <li key={idx}>
                      <a
                        href={src.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0B4F8C] hover:underline inline-flex items-center gap-1"
                      >
                        <span className="truncate max-w-[200px]">{src.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
