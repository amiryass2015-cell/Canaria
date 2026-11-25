import 'dotenv/config';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface IslandCoord {
  name: string;
  lat: number;
  lon: number;
  stationLabel: string;
}

const ISLAND_COORDS: Record<string, IslandCoord> = {
  tenerife: {
    name: 'Tenerife',
    lat: 28.4636,
    lon: -16.2518,
    stationLabel: 'Santa Cruz de Tenerife',
  },
  'gran-canaria': {
    name: 'Gran Canaria',
    lat: 28.1235,
    lon: -15.4363,
    stationLabel: 'Las Palmas de Gran Canaria',
  },
  lanzarote: {
    name: 'Lanzarote',
    lat: 28.963,
    lon: -13.5477,
    stationLabel: 'Arrecife',
  },
  fuerteventura: {
    name: 'Fuerteventura',
    lat: 28.5004,
    lon: -13.8627,
    stationLabel: 'Puerto del Rosario',
  },
  'la-palma': {
    name: 'La Palma',
    lat: 28.6835,
    lon: -17.7642,
    stationLabel: 'Santa Cruz de La Palma',
  },
  'la-gomera': {
    name: 'La Gomera',
    lat: 28.0916,
    lon: -17.1133,
    stationLabel: 'San Sebastián de La Gomera',
  },
  'el-hierro': {
    name: 'El Hierro',
    lat: 27.8063,
    lon: -17.9158,
    stationLabel: 'Valverde',
  },
  'la-graciosa': {
    name: 'La Graciosa',
    lat: 29.2315,
    lon: -13.5034,
    stationLabel: 'Caleta de Sebo',
  },
};

interface CachedWeather {
  expiresAt: number;
  payload: unknown;
}

interface SurfSpotCoord {
  id: string;
  island: string;
  name: string;
  lat: number;
  lon: number;
  /** Direction wind blows FROM for clean offshore grooming (degrees 0-359) */
  offshoreDeg: number;
}

const SURF_SPOTS: Record<string, SurfSpotCoord> = {
  'el-socorro': {
    id: 'el-socorro',
    island: 'tenerife',
    name: 'Playa del Socorro (Los Realejos)',
    lat: 28.3958,
    lon: -16.6022,
    offshoreDeg: 165,
  },
  'las-americas': {
    id: 'las-americas',
    island: 'tenerife',
    name: 'Playa de las Américas — La Derecha',
    lat: 28.0558,
    lon: -16.7368,
    offshoreDeg: 45,
  },
  'la-cicer': {
    id: 'la-cicer',
    island: 'gran-canaria',
    name: 'Las Canteras — La Cícer',
    lat: 28.1325,
    lon: -15.4488,
    offshoreDeg: 140,
  },
  'el-confital': {
    id: 'el-confital',
    island: 'gran-canaria',
    name: 'El Confital (La Isleta)',
    lat: 28.1592,
    lon: -15.4375,
    offshoreDeg: 120,
  },
  famara: {
    id: 'famara',
    island: 'lanzarote',
    name: 'Playa de Famara',
    lat: 29.1189,
    lon: -13.5625,
    offshoreDeg: 145,
  },
  'el-cotillo': {
    id: 'el-cotillo',
    island: 'fuerteventura',
    name: 'El Cotillo — Piedra Playa',
    lat: 28.6788,
    lon: -14.0117,
    offshoreDeg: 105,
  },
  'flag-beach': {
    id: 'flag-beach',
    island: 'fuerteventura',
    name: 'Corralejo — Flag Beach / Rocky Point',
    lat: 28.7242,
    lon: -13.8602,
    offshoreDeg: 225,
  },
  nogales: {
    id: 'nogales',
    island: 'la-palma',
    name: 'Playa de Nogales (Puntallana)',
    lat: 28.7606,
    lon: -17.7347,
    offshoreDeg: 250,
  },
  'valle-gran-rey': {
    id: 'valle-gran-rey',
    island: 'la-gomera',
    name: 'Valle Gran Rey — La Puntilla',
    lat: 28.0956,
    lon: -17.3435,
    offshoreDeg: 55,
  },
  'arenas-blancas': {
    id: 'arenas-blancas',
    island: 'el-hierro',
    name: 'Arenas Blancas (El Golfo)',
    lat: 27.7678,
    lon: -18.1244,
    offshoreDeg: 120,
  },
  'las-conchas': {
    id: 'las-conchas',
    island: 'la-graciosa',
    name: 'Playa de las Conchas',
    lat: 29.2775,
    lon: -13.5142,
    offshoreDeg: 155,
  },
};

const weatherCache = new Map<string, CachedWeather>();
const marineCache = new Map<string, CachedWeather>();

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function isSafeHttpUrl(raw: string | undefined): raw is string {
  if (!raw) return false;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // 1. Live External Weather API Proxy (Open-Meteo)
  app.get('/api/weather', async (req: Request, res: Response) => {
    const rawIsland =
      typeof req.query.island === 'string' ? req.query.island : '';
    const coord = ISLAND_COORDS[rawIsland];
    if (!coord) {
      res.status(400).json({ error: 'Invalid island identifier' });
      return;
    }

    const now = Date.now();
    const cached = weatherCache.get(rawIsland);
    if (cached && cached.expiresAt > now) {
      res.json(cached.payload);
      return;
    }

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${coord.lat}&longitude=${coord.lon}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day` +
      `&daily=temperature_2m_max,temperature_2m_min,uv_index_max` +
      `&timezone=Atlantic%2FCanary&forecast_days=1`;

    try {
      const upstream = await fetch(url, {
        signal: AbortSignal.timeout(7000),
      });
      if (!upstream.ok) {
        res
          .status(502)
          .json({ error: `Weather provider returned ${upstream.status}` });
        return;
      }

      const data = (await upstream.json()) as {
        current?: {
          time: string;
          temperature_2m: number;
          apparent_temperature: number;
          relative_humidity_2m: number;
          weather_code: number;
          wind_speed_10m: number;
          wind_direction_10m: number;
          is_day: number;
        };
        daily?: {
          temperature_2m_max?: number[];
          temperature_2m_min?: number[];
          uv_index_max?: number[];
        };
      };

      if (!data.current) {
        res.status(502).json({ error: 'Incomplete weather payload' });
        return;
      }

      const payload = {
        island: rawIsland,
        station: coord.stationLabel,
        temperature: Math.round(data.current.temperature_2m * 10) / 10,
        apparentTemperature:
          Math.round(data.current.apparent_temperature * 10) / 10,
        humidity: Math.round(data.current.relative_humidity_2m),
        weatherCode: data.current.weather_code,
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: Math.round(data.current.wind_direction_10m),
        isDay: data.current.is_day === 1,
        tempMax:
          typeof data.daily?.temperature_2m_max?.[0] === 'number'
            ? Math.round(data.daily.temperature_2m_max[0])
            : null,
        tempMin:
          typeof data.daily?.temperature_2m_min?.[0] === 'number'
            ? Math.round(data.daily.temperature_2m_min[0])
            : null,
        uvMax:
          typeof data.daily?.uv_index_max?.[0] === 'number'
            ? Math.round(data.daily.uv_index_max[0] * 10) / 10
            : null,
        observedAt: data.current.time,
        provider: 'Open-Meteo',
      };

      weatherCache.set(rawIsland, {
        expiresAt: now + 5 * 60 * 1000,
        payload,
      });

      res.json(payload);
    } catch (error) {
      console.error('Weather API error:', error);
      res.status(502).json({ error: 'Unable to fetch live weather' });
    }
  });

  // 1b. Live Marine & Wind Surf API Proxy (Open-Meteo Marine + Forecast)
  app.get('/api/marine', async (req: Request, res: Response) => {
    const rawSpot = typeof req.query.spot === 'string' ? req.query.spot : '';
    const spot = SURF_SPOTS[rawSpot];
    if (!spot) {
      res.status(400).json({ error: 'Invalid surf spot identifier' });
      return;
    }

    const now = Date.now();
    const cached = marineCache.get(rawSpot);
    if (cached && cached.expiresAt > now) {
      res.json(cached.payload);
      return;
    }

    const marineUrl =
      `https://marine-api.open-meteo.com/v1/marine` +
      `?latitude=${spot.lat}&longitude=${spot.lon}` +
      `&current=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,sea_surface_temperature` +
      `&hourly=wave_height,wave_period` +
      `&timezone=Atlantic%2FCanary&forecast_days=2`;

    const windUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${spot.lat}&longitude=${spot.lon}` +
      `&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m` +
      `&timezone=Atlantic%2FCanary&forecast_days=1`;

    try {
      const [marineRes, windRes] = await Promise.all([
        fetch(marineUrl, { signal: AbortSignal.timeout(7000) }),
        fetch(windUrl, { signal: AbortSignal.timeout(7000) }),
      ]);

      if (!marineRes.ok || !windRes.ok) {
        res.status(502).json({
          error: `Marine/wind provider returned ${marineRes.status}/${windRes.status}`,
        });
        return;
      }

      const marineData = (await marineRes.json()) as {
        current?: {
          time: string;
          wave_height?: number;
          wave_direction?: number;
          wave_period?: number;
          swell_wave_height?: number;
          swell_wave_direction?: number;
          swell_wave_period?: number;
          sea_surface_temperature?: number;
        };
        hourly?: {
          time?: string[];
          wave_height?: Array<number | null>;
          wave_period?: Array<number | null>;
        };
      };

      const windData = (await windRes.json()) as {
        current?: {
          wind_speed_10m?: number;
          wind_direction_10m?: number;
          wind_gusts_10m?: number;
        };
      };

      if (
        !marineData.current ||
        typeof marineData.current.wave_height !== 'number' ||
        typeof marineData.current.wave_period !== 'number' ||
        !windData.current ||
        typeof windData.current.wind_speed_10m !== 'number'
      ) {
        res.status(502).json({ error: 'Incomplete marine/wind payload' });
        return;
      }

      const currentTimeStr = marineData.current.time;
      const hourlyTimes = marineData.hourly?.time ?? [];
      const hourlyHeights = marineData.hourly?.wave_height ?? [];
      const hourlyPeriods = marineData.hourly?.wave_period ?? [];

      const currentHourPrefix = currentTimeStr.slice(0, 13);
      let startIdx = hourlyTimes.findIndex((t) => t.startsWith(currentHourPrefix));
      if (startIdx < 0) startIdx = 0;

      const hourly = [];
      for (let i = startIdx; i < Math.min(hourlyTimes.length, startIdx + 12); i++) {
        const hVal = hourlyHeights[i];
        const pVal = hourlyPeriods[i];
        if (typeof hVal === 'number' && typeof pVal === 'number') {
          hourly.push({
            time: hourlyTimes[i].slice(11, 16),
            waveHeight: Math.round(hVal * 100) / 100,
            wavePeriod: Math.round(pVal * 10) / 10,
          });
        }
      }

      const payload = {
        spot: spot.id,
        island: spot.island,
        spotName: spot.name,
        offshoreDeg: spot.offshoreDeg,
        waveHeight: Math.round(marineData.current.wave_height * 100) / 100,
        waveDirection: Math.round(marineData.current.wave_direction ?? 0),
        wavePeriod: Math.round(marineData.current.wave_period * 10) / 10,
        swellHeight:
          typeof marineData.current.swell_wave_height === 'number'
            ? Math.round(marineData.current.swell_wave_height * 100) / 100
            : Math.round(marineData.current.wave_height * 100) / 100,
        swellDirection: Math.round(
          marineData.current.swell_wave_direction ??
            marineData.current.wave_direction ??
            0
        ),
        swellPeriod:
          typeof marineData.current.swell_wave_period === 'number'
            ? Math.round(marineData.current.swell_wave_period * 10) / 10
            : Math.round(marineData.current.wave_period * 10) / 10,
        seaTemp:
          typeof marineData.current.sea_surface_temperature === 'number'
            ? Math.round(marineData.current.sea_surface_temperature * 10) / 10
            : null,
        windSpeed: Math.round(windData.current.wind_speed_10m),
        windGusts:
          typeof windData.current.wind_gusts_10m === 'number'
            ? Math.round(windData.current.wind_gusts_10m)
            : null,
        windDirection: Math.round(windData.current.wind_direction_10m ?? 0),
        hourly,
        observedAt: currentTimeStr,
        provider: 'Open-Meteo Marine',
      };

      marineCache.set(rawSpot, {
        expiresAt: now + 5 * 60 * 1000,
        payload,
      });

      res.json(payload);
    } catch (error) {
      console.error('Marine API error:', error);
      res.status(502).json({ error: 'Unable to fetch live marine conditions' });
    }
  });

  // 2. Multi-turn Gemini Chatbot with optional Google Search Grounding
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        messages?: Array<{ role?: string; text?: string }>;
        lang?: string;
        audience?: string;
        island?: string;
        useSearch?: boolean;
        fastMode?: boolean;
      };

      if (!Array.isArray(body.messages) || body.messages.length === 0) {
        res.status(400).json({ error: 'Messages array is required' });
        return;
      }

      const cleanMessages = body.messages
        .slice(-20)
        .filter(
          (m) =>
            (m.role === 'user' || m.role === 'model') &&
            typeof m.text === 'string' &&
            m.text.trim().length > 0
        )
        .map((m) => ({
          role: m.role as 'user' | 'model',
          text: (m.text as string).trim().slice(0, 2000),
        }));

      if (
        cleanMessages.length === 0 ||
        cleanMessages[cleanMessages.length - 1].role !== 'user'
      ) {
        res.status(400).json({ error: 'Last message must be from user' });
        return;
      }

      const langCode =
        body.lang === 'ar' || body.lang === 'en' || body.lang === 'fr'
          ? body.lang
          : 'es';
      const audienceLabel =
        body.audience === 'tourist' ? 'tourist/visitor' : 'Canary Islands resident';
      const islandCoord =
        typeof body.island === 'string' && ISLAND_COORDS[body.island]
          ? ISLAND_COORDS[body.island].name
          : 'Canary Islands';

      const useSearch = body.useSearch === true;
      const model = useSearch ? 'gemini-4-hydrogen' : 'gemini-3.1-flash-lite';

      const languageNames: Record<string, string> = {
        es: 'Spanish',
        ar: 'Arabic',
        en: 'English',
        fr: 'French',
      };

      const systemInstruction =
        `You are the official bilingual/multilingual civic & travel assistant of MI CANARIAS, ` +
        `helping residents and visitors across the eight Canary Islands (Tenerife, Gran Canaria, ` +
        `Lanzarote, Fuerteventura, La Palma, La Gomera, El Hierro, La Graciosa). ` +
        `Respond strictly in ${languageNames[langCode]}. ` +
        `The user's active profile is: ${audienceLabel}. Selected island context: ${islandCoord}. ` +
        `Be accurate, practical, concise (2-4 short paragraphs or bullet points max), and cite official Canary Islands procedures ` +
        `(75% resident discount / SARA, 012, SCS health appointments, 112 emergencies, Teide/Lobos permits, Cabildos, guaguas/ferries). ` +
        `Never invent fake phone numbers or fake reservation links.`;

      const ai = getGeminiClient();

      const priorHistory = cleanMessages.slice(0, -1).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      const latestUserMessage = cleanMessages[cleanMessages.length - 1].text;

      let response;
      let usedModel = model;
      let fallbackUsed = false;

      try {
        const chat = ai.chats.create({
          model,
          history: priorHistory,
          config: {
            systemInstruction,
            ...(useSearch
              ? {
                  tools: [{ googleSearch: {} }],
                  thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
                }
              : {}),
          },
        });
        response = await chat.sendMessage({ message: latestUserMessage });
      } catch (primaryErr) {
        const primaryMsg =
          primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
        const isQuotaOrRate =
          primaryMsg.includes('429') ||
          primaryMsg.includes('RESOURCE_EXHAUSTED');

        if (useSearch && isQuotaOrRate) {
          usedModel = 'gemini-3.1-flash-lite';
          fallbackUsed = true;
          const fallbackChat = ai.chats.create({
            model: usedModel,
            history: priorHistory,
            config: {
              systemInstruction,
            },
          });
          response = await fallbackChat.sendMessage({
            message: latestUserMessage,
          });
        } else {
          throw primaryErr;
        }
      }

      const rawChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const sources: Array<{ title: string; uri: string }> = [];
      const seenUris = new Set<string>();

      for (const chunk of rawChunks) {
        const uri = chunk.web?.uri;
        const title = chunk.web?.title;
        if (isSafeHttpUrl(uri) && !seenUris.has(uri)) {
          seenUris.add(uri);
          sources.push({
            uri,
            title: title && title.trim() ? title.trim() : uri,
          });
        }
      }

      res.json({
        reply: response.text ?? '',
        model: usedModel,
        fallbackUsed,
        sources: sources.slice(0, 5),
      });
    } catch (error) {
      const rawMessage =
        error instanceof Error ? error.message : 'Gemini chat request failed';
      console.error('Gemini chat error:', error);
      if (rawMessage === 'GEMINI_API_KEY_MISSING') {
        res.status(503).json({
          error:
            'GEMINI_API_KEY is not configured in Settings > Secrets.',
        });
        return;
      }
      if (
        rawMessage.includes('429') ||
        rawMessage.includes('RESOURCE_EXHAUSTED')
      ) {
        res.status(429).json({
          error: 'API quota temporarily exceeded. Please try again in a moment.',
        });
        return;
      }
      res.status(502).json({ error: 'Unable to reach assistant service right now.' });
    }
  });

  // 3. Up-to-date Island Brief via Google Search Grounding (with fast-model fallback on quota limits)
  app.post('/api/island-brief', async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        island?: string;
        lang?: string;
        audience?: string;
      };
      const coord =
        typeof body.island === 'string' ? ISLAND_COORDS[body.island] : undefined;
      if (!coord) {
        res.status(400).json({ error: 'Invalid island identifier' });
        return;
      }

      const langCode =
        body.lang === 'ar' || body.lang === 'en' || body.lang === 'fr'
          ? body.lang
          : 'es';
      const languageNames: Record<string, string> = {
        es: 'Spanish',
        ar: 'Arabic',
        en: 'English',
        fr: 'French',
      };
      const audienceFocus =
        body.audience === 'tourist'
          ? 'trail permits, ferry crossings, beaches, and current cultural events'
          : 'local civic notices, road/trail advisories, public transport, and weather alerts';

      const promptText =
        `Provide a concise, practical briefing for ${coord.name} (Canary Islands) ` +
        `focused on ${audienceFocus}. Write in ${languageNames[langCode]} in 3 short bullet points.`;

      const ai = getGeminiClient();
      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-4-hydrogen',
          contents: promptText,
          config: {
            systemInstruction:
              'You are a factual regional information assistant for the Canary Islands. Keep summaries concise and grounded in current search results.',
            tools: [{ googleSearch: {} }],
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });
      } catch (primaryErr) {
        const msg =
          primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
        if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: promptText,
            config: {
              systemInstruction:
                'You are a factual regional information assistant for the Canary Islands. Keep summaries concise and practical.',
            },
          });
        } else {
          throw primaryErr;
        }
      }

      const rawChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const sources: Array<{ title: string; uri: string }> = [];
      const seenUris = new Set<string>();

      for (const chunk of rawChunks) {
        const uri = chunk.web?.uri;
        const title = chunk.web?.title;
        if (isSafeHttpUrl(uri) && !seenUris.has(uri)) {
          seenUris.add(uri);
          sources.push({
            uri,
            title: title && title.trim() ? title.trim() : uri,
          });
        }
      }

      res.json({
        island: body.island,
        summary: response.text ?? '',
        sources: sources.slice(0, 4),
      });
    } catch (error) {
      const rawMessage =
        error instanceof Error ? error.message : 'Search grounding failed';
      console.error('Island brief error:', error);
      if (rawMessage === 'GEMINI_API_KEY_MISSING') {
        res.status(503).json({
          error: 'GEMINI_API_KEY is not configured in Settings > Secrets.',
        });
        return;
      }
      if (
        rawMessage.includes('429') ||
        rawMessage.includes('RESOURCE_EXHAUSTED')
      ) {
        res.status(429).json({
          error: 'API quota temporarily exceeded. Please try again in a moment.',
        });
        return;
      }
      res.status(502).json({ error: 'Unable to fetch briefing right now.' });
    }
  });

  // Vite dev middleware or production static assets
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MI CANARIAS server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
