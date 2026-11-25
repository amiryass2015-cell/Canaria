import { IslandId, IslandInfo } from '../types/canarias';

interface ArchipelagoMapProps {
  islands: IslandInfo[];
  selectedId: IslandId;
  onSelect: (id: IslandId) => void;
  mapLabel: string;
}

const ISLAND_SHAPES: Record<IslandId, { path: string; labelOffset: { dx: number; dy: number } }> = {
  'la-graciosa': {
    path: 'M598,32 L611,29 L616,38 L607,47 L597,42 Z',
    labelOffset: { dx: 0, dy: -16 },
  },
  lanzarote: {
    path: 'M569,55 L596,49 L608,65 L597,95 L574,104 L562,91 L566,70 Z',
    labelOffset: { dx: -4, dy: 28 },
  },
  fuerteventura: {
    path: 'M535,121 L557,125 L555,155 L536,184 L506,197 L495,188 L516,165 L521,134 Z',
    labelOffset: { dx: 18, dy: 38 },
  },
  'gran-canaria': {
    path: 'M384,173 L414,170 L427,192 L419,217 L393,224 L375,204 Z',
    labelOffset: { dx: 0, dy: 36 },
  },
  tenerife: {
    path: 'M246,162 L279,144 L318,136 L325,151 L296,177 L268,191 L244,180 Z',
    labelOffset: { dx: 4, dy: -26 },
  },
  'la-gomera': {
    path: 'M192,188 L214,183 L222,199 L207,213 L189,205 Z',
    labelOffset: { dx: 0, dy: 28 },
  },
  'la-palma': {
    path: 'M126,95 L147,96 L151,123 L140,148 L126,141 L122,115 Z',
    labelOffset: { dx: 0, dy: -24 },
  },
  'el-hierro': {
    path: 'M91,241 L117,232 L123,246 L104,262 L89,254 Z',
    labelOffset: { dx: 0, dy: 28 },
  },
};

export function ArchipelagoMap({
  islands,
  selectedId,
  onSelect,
  mapLabel,
}: ArchipelagoMapProps) {
  return (
    <div dir="ltr" className="relative rounded-2xl border border-neutral-200/90 bg-[#EAF0F5] overflow-hidden">
      <div className="px-4 pt-3.5 pb-1 flex items-center justify-between text-xs text-neutral-600">
        <span className="font-medium">{mapLabel}</span>
        <span className="font-mono-tabular text-neutral-500">28°N · 16°W</span>
      </div>

      <svg
        viewBox="0 0 700 290"
        className="w-full h-auto block select-none"
        role="img"
        aria-label={mapLabel}
      >
        <defs>
          <pattern id="oceanGrid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path
              d="M 35 0 L 0 0 0 35"
              fill="none"
              stroke="rgba(11, 79, 140, 0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="700" height="290" fill="url(#oceanGrid)" />

        {/* Subtle maritime routes connecting primary hubs */}
        <g stroke="rgba(11, 79, 140, 0.22)" strokeWidth="1.2" strokeDasharray="4 4" fill="none">
          <path d="M280,165 Q340,165 400,195" />
          <path d="M280,165 Q235,180 205,195" />
          <path d="M280,165 Q210,140 135,120" />
          <path d="M205,195 Q150,220 105,245" />
          <path d="M400,195 Q465,180 525,155" />
          <path d="M525,155 Q560,120 585,80" />
          <path d="M585,80 L605,38" />
        </g>

        {islands.map((island) => {
          const shape = ISLAND_SHAPES[island.id];
          const isSelected = island.id === selectedId;
          return (
            <g
              key={island.id}
              onClick={() => onSelect(island.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(island.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={island.name}
              className="cursor-pointer focus:outline-none group"
            >
              <path
                d={shape.path}
                className="transition-colors duration-150"
                fill={isSelected ? '#0B4F8C' : '#FFFFFF'}
                stroke={isSelected ? '#073661' : '#64748B'}
                strokeWidth={isSelected ? 2 : 1.3}
              />
              <circle
                cx={island.mapPos.x}
                cy={island.mapPos.y}
                r={isSelected ? 3.5 : 2.5}
                fill={isSelected ? '#F59E0B' : '#0B4F8C'}
              />
              <text
                x={island.mapPos.x + shape.labelOffset.dx}
                y={island.mapPos.y + shape.labelOffset.dy}
                textAnchor="middle"
                className={`text-[11px] font-medium transition-colors ${
                  isSelected
                    ? 'fill-[#0B4F8C] font-bold'
                    : 'fill-neutral-700 group-hover:fill-[#0B4F8C]'
                }`}
              >
                {island.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
