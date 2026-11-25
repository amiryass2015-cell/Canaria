export type Language = 'es' | 'ar' | 'en' | 'fr';

export type AudienceMode = 'resident' | 'tourist';

export type IslandId =
  | 'tenerife'
  | 'gran-canaria'
  | 'lanzarote'
  | 'fuerteventura'
  | 'la-palma'
  | 'la-gomera'
  | 'el-hierro'
  | 'la-graciosa';

export type LocalizedText = Record<Language, string>;

export interface IslandHighlight {
  title: LocalizedText;
  detail: LocalizedText;
}

export interface IslandMicroclimate {
  coastTemp: string;
  summitTemp: string;
  seaTemp: string;
  uvIndex: string;
  windSummary: LocalizedText;
}

export interface IslandInfo {
  id: IslandId;
  name: string;
  capital: string;
  province: 'Santa Cruz de Tenerife' | 'Las Palmas';
  population: string;
  areaKm2: string;
  highestPeak: string;
  climateAvg: string;
  microclimate: IslandMicroclimate;
  image: string;
  tagline: LocalizedText;
  summary: LocalizedText;
  residentFocus: IslandHighlight[];
  touristFocus: IslandHighlight[];
  ferryHubs: string[];
  airports: string[];
  /** Coordinates on our 700x290 archipelago SVG viewBox */
  mapPos: { x: number; y: number };
}

export interface ServiceItem {
  id: string;
  audience: AudienceMode | 'both';
  category: 'mobility' | 'civic' | 'health' | 'nature' | 'culture';
  island: IslandId | 'all';
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  requirements: Record<Language, string[]>;
  scheduleOrValidity: LocalizedText;
  officialPortalLabel: LocalizedText;
  feeLabel: LocalizedText;
}

export interface RouteItem {
  id: string;
  island: IslandId;
  category: 'volcanic' | 'coastal' | 'forest' | 'heritage';
  difficulty: 'easy' | 'moderate' | 'challenging';
  distanceKm: number;
  durationHours: number;
  elevationM: number;
  image: string;
  title: LocalizedText;
  summary: LocalizedText;
  highlights: Record<Language, string[]>;
  residentTip: LocalizedText;
  touristTip: LocalizedText;
}

export interface BeachSpot {
  id: string;
  island: IslandId;
  kind: 'beach' | 'natural-pool' | 'cove';
  swellRisk: 'calm' | 'moderate' | 'caution';
  busAccessible: boolean;
  lifeguardSeason: LocalizedText;
  image: string;
  name: string;
  municipality: string;
  summary: LocalizedText;
  servicesList: Record<Language, string[]>;
  residentTip: LocalizedText;
  touristTip: LocalizedText;
}

export interface AgendaEvent {
  id: string;
  island: IslandId;
  dateLabel: LocalizedText;
  monthIndex: number;
  audience: AudienceMode | 'both';
  type: 'event' | 'notice';
  title: LocalizedText;
  location: string;
  description: LocalizedText;
}

export interface InterIslandFare {
  from: IslandId;
  to: IslandId;
  mode: 'ferry' | 'flight';
  durationMinutes: number;
  standardEur: number;
  operator: string;
}

export interface UsefulPhone {
  id: string;
  number: string;
  label: LocalizedText;
  scope: LocalizedText;
}

export interface PhraseEntry {
  id: string;
  category: 'daily' | 'transport' | 'emergency';
  texts: Record<Language, string>;
}

export type SavedEntryType = 'island' | 'service' | 'route' | 'beach' | 'event';

export interface SavedItem {
  id: string;
  type: SavedEntryType;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface LiveWeatherData {
  island: IslandId;
  station: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  isDay: boolean;
  tempMax: number | null;
  tempMin: number | null;
  uvMax: number | null;
  observedAt: string;
  provider: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  model?: string;
  sources?: GroundingSource[];
}

export interface IslandBriefData {
  island: IslandId;
  summary: string;
  sources: GroundingSource[];
}

export type SurfSpotId =
  | 'el-socorro'
  | 'las-americas'
  | 'la-cicer'
  | 'el-confital'
  | 'famara'
  | 'el-cotillo'
  | 'flag-beach'
  | 'nogales'
  | 'valle-gran-rey'
  | 'arenas-blancas'
  | 'las-conchas';

export type SurfBottomType = 'beach' | 'reef' | 'point';

export type SurfSkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type SurfBoardType = 'longboard' | 'funboard' | 'shortboard';

export interface SurfSpotInfo {
  id: SurfSpotId;
  island: IslandId;
  name: string;
  municipality: string;
  bottom: SurfBottomType;
  offshoreDeg: number;
  idealSwellMinM: number;
  idealSwellMaxM: number;
  minSkill: SurfSkillLevel;
  description: LocalizedText;
  safetyNote: LocalizedText;
}

export interface LiveMarineHourly {
  time: string;
  waveHeight: number;
  wavePeriod: number;
}

export interface LiveMarineData {
  spot: SurfSpotId;
  island: IslandId;
  spotName: string;
  offshoreDeg: number;
  waveHeight: number;
  waveDirection: number;
  wavePeriod: number;
  swellHeight: number;
  swellDirection: number;
  swellPeriod: number;
  seaTemp: number | null;
  windSpeed: number;
  windGusts: number | null;
  windDirection: number;
  hourly: LiveMarineHourly[];
  observedAt: string;
  provider: string;
}

export interface TransportLineItem {
  code: string;
  route: string;
  kind: 'airport' | 'trunk' | 'tram' | 'rural' | 'maritime';
  frequency: LocalizedText;
  durationMin: number;
  standardFareEur: number;
}

export interface TransportPassOption {
  name: LocalizedText;
  audience: AudienceMode | 'both';
  priceNote: LocalizedText;
  detail: LocalizedText;
}

export interface IslandTransportInfo {
  island: IslandId;
  mainOperator: string;
  secondaryOperator?: string;
  cardName: string;
  airportConnectionSummary: LocalizedText;
  residentPassRule: LocalizedText;
  touristPayRule: LocalizedText;
  bikeAndSurfRule: LocalizedText;
  lines: TransportLineItem[];
  passes: TransportPassOption[];
}


