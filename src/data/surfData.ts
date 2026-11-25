import {
  Language,
  SurfBoardType,
  SurfBottomType,
  SurfSkillLevel,
  SurfSpotInfo,
} from '../types/canarias';

export const SURF_SPOTS_CATALOG: SurfSpotInfo[] = [
  {
    id: 'el-socorro',
    island: 'tenerife',
    name: 'Playa del Socorro',
    municipality: 'Los Realejos',
    bottom: 'beach',
    offshoreDeg: 165,
    idealSwellMinM: 0.9,
    idealSwellMaxM: 2.5,
    minSkill: 'intermediate',
    description: {
      es: 'Pico constante de arena volcánica en el norte de Tenerife. Recibe swell del Atlántico norte todo el año con picos rápidos de derecha e izquierda.',
      ar: 'شاطئ بركاني ثابت في شمال تينيريفي يستقبل أمواج الأطلسي الشمالية طوال العام بقمم سريعة يميناً ويساراً.',
      en: 'Consistent volcanic-sand beach break on Tenerife’s north coast catching year-round North Atlantic swells with punchy lefts and rights.',
      fr: 'Beach-break volcanique régulier au nord de Tenerife, exposé toute l’année aux houles de l’Atlantique Nord avec droites et gauches dynamiques.',
    },
    safetyNote: {
      es: 'Corrientes de retorno frecuentes con marea bajando; respeta siempre la zona balizada y el canal lateral.',
      ar: 'تيارات سحب متكررة عند انحسار المد؛ احترم دائماً المنطقة المحددة وقناة الدخول الجانبية.',
      en: 'Strong rip currents on outgoing tides; enter via the side channel and follow lifeguard flags.',
      fr: 'Courants d’arrachement fréquents à marée descendante ; utilisez les chenaux latéraux et respectez les drapeaux.',
    },
  },
  {
    id: 'las-americas',
    island: 'tenerife',
    name: 'Playa de las Américas — La Derecha',
    municipality: 'Arona',
    bottom: 'reef',
    offshoreDeg: 45,
    idealSwellMinM: 1.0,
    idealSwellMaxM: 2.8,
    minSkill: 'intermediate',
    description: {
      es: 'Fondo volcánico de piedra con olas nobles y largas cuando entran marejadas del oeste o noroeste. Muy protegida del alisio.',
      ar: 'قاع بركاني صخري يمنح موجات منتظمة وطويلة عند دخول أمواج الغرب والشمال الغربي مع حماية جيدة من الرياح التجارية.',
      en: 'Volcanic reef break firing clean, long walls on W/NW swells and staying sheltered from trade winds.',
      fr: 'Reef volcanique offrant de longs murs propres par houle O/NO, bien abrité des alizés.',
    },
    safetyNote: {
      es: 'Fondo de roca poco profundo en marea baja y presencia de erizos; recomendados escarpines y cuidado al caer.',
      ar: 'قاع صخري ضحل عند الجزر ووجود قنافذ بحرية؛ يُنصح بأحذية النيوبرين والحذر عند السقوط.',
      en: 'Shallow volcanic rock and sea urchins at low tide; reef booties recommended and fall flat.',
      fr: 'Fond rocheux peu profond à marée basse et présence d’oursins ; chaussons recommandés.',
    },
  },
  {
    id: 'la-cicer',
    island: 'gran-canaria',
    name: 'Las Canteras — La Cícer',
    municipality: 'Las Palmas de Gran Canaria',
    bottom: 'beach',
    offshoreDeg: 140,
    idealSwellMinM: 0.7,
    idealSwellMaxM: 2.2,
    minSkill: 'beginner',
    description: {
      es: 'Zona sur de Las Canteras sin barra coralina protectora: epicentro urbano para principiantes, longboard y surf diario en la capital.',
      ar: 'الطرف الجنوبي لشاطئ لاس كانتيراس دون حاجز صخري، مركز حضري مثالي للمبتدئين واللونغ بورد والتدريب اليومي.',
      en: 'Open southern end of Las Canteras beach with no barrier reef — Gran Canaria’s urban hub for all levels.',
      fr: 'Extrémité sud ouverte de Las Canteras sans barre rocheuse — spot urbain de référence pour tous niveaux.',
    },
    safetyNote: {
      es: 'Atención a las tablas en horas punta de escuela y al muro lateral con pleamar viva.',
      ar: 'انتبه لكثافة المتدربين في ساعات الذروة وللجدار الجانبي عند المد العالي.',
      en: 'Watch crowded school zones at peak hours and the southern wall during spring high tides.',
      fr: 'Vigilance dans les zones d’écoles aux heures de pointe et près du mur sud par grande marée haute.',
    },
  },
  {
    id: 'el-confital',
    island: 'gran-canaria',
    name: 'El Confital',
    municipality: 'Las Palmas de Gran Canaria',
    bottom: 'reef',
    offshoreDeg: 120,
    idealSwellMinM: 1.4,
    idealSwellMaxM: 3.8,
    minSkill: 'advanced',
    description: {
      es: 'Derecha tubular de clase mundial sobre laja volcánica en La Isleta. Exige periodo medio-largo y lectura precisa del pico.',
      ar: 'موجة يمينية أنبوبية عالمية المستوى فوق صخور بركانية في لا إيسليتا؛ تتطلب فترة موجة طويلة وخبرة متقدمة.',
      en: 'World-class slabbing right-hand reef break on La Isleta requiring solid swell period and confident takeoff.',
      fr: 'Droite tubulaire de classe mondiale sur dalle volcanique à La Isleta, exigeant houle établie et niveau confirmé.',
    },
    safetyNote: {
      es: 'Laja muy superficial y corriente fuerte hacia las rocas; acceso solo para surfistas experimentados.',
      ar: 'صخور ضحلة جداً وتيارات قوية باتجاه الشاطئ الصخري؛ مخصص فقط لراكبي الأمواج ذوي الخبرة.',
      en: 'Very shallow lava shelf and strong current toward the rocks; strictly for experienced surfers.',
      fr: 'Dalle volcanique très peu profonde et courant soutenu vers les rochers ; réservé aux surfeurs expérimentés.',
    },
  },
  {
    id: 'famara',
    island: 'lanzarote',
    name: 'Playa de Famara',
    municipality: 'Teguise',
    bottom: 'beach',
    offshoreDeg: 145,
    idealSwellMinM: 0.8,
    idealSwellMaxM: 2.6,
    minSkill: 'beginner',
    description: {
      es: 'Cinco kilómetros de arena bajo el Risco de Famara con múltiples picos para todos los niveles y ambiente auténtico.',
      ar: 'خمسة كيلومترات من الرمال تحت جرف فامارا مع قمم متعددة تناسب كل المستويات وأجواء مفتوحة.',
      en: 'Five kilometers of golden sand beneath the Famara cliffs with shifting peaks suitable from first waves to overhead bowls.',
      fr: 'Cinq kilomètres de plage sous les falaises de Famara offrant des pics variés, de l’initiation aux vagues creuses.',
    },
    safetyNote: {
      es: 'Viento lateral frecuente del noreste y canales móviles entre bancos de arena; no surfees en solitario cerca del acantilado.',
      ar: 'رياح جانبية متكررة وقنوات مائية متحركة بين الضفاف الرملية؛ تجنب السباحة قرب الجرف بمفردك.',
      en: 'Shifting sandbar channels and frequent NE side-shore breeze; avoid drifting near the northern cliffs.',
      fr: 'Baïnes mobiles et vent de travers fréquent ; restez attentif à la dérive vers les falaises.',
    },
  },
  {
    id: 'el-cotillo',
    island: 'fuerteventura',
    name: 'El Cotillo — Piedra Playa',
    municipality: 'La Oliva',
    bottom: 'beach',
    offshoreDeg: 105,
    idealSwellMinM: 0.9,
    idealSwellMaxM: 2.4,
    minSkill: 'beginner',
    description: {
      es: 'Costa oeste totalmente abierta al océano. Olas potentes sobre arena y piedra en verano-otoño; tamaño considerable en invierno.',
      ar: 'ساحل غربي مفتوح بالكامل على المحيط؛ أمواج نشطة على الرمال في الصيف والخريف وضخمة شتاءً.',
      en: 'Wide-open west-coast beach break receiving direct Atlantic energy — playful in summer/autumn, heavy in winter.',
      fr: 'Plage de la côte ouest pleinement exposée à l’Atlantique : ludique en été/automne, puissante en hiver.',
    },
    safetyNote: {
      es: 'Corrientes intensas por encima de 1,8 m y fondo mixto con rocas en los extremos de la bahía.',
      ar: 'تيارات قوية عندما يتجاوز ارتفاع الموج 1.8 متر مع وجود صخور على طرفي الخليج.',
      en: 'Heavy rips above 1.8 m swell and rocky reef edges at both ends of the bay.',
      fr: 'Forts courants au-delà de 1,8 m et zones rocheuses aux extrémités de la baie.',
    },
  },
  {
    id: 'flag-beach',
    island: 'fuerteventura',
    name: 'Corralejo — Rocky Point',
    municipality: 'La Oliva',
    bottom: 'point',
    offshoreDeg: 225,
    idealSwellMinM: 0.8,
    idealSwellMaxM: 2.3,
    minSkill: 'intermediate',
    description: {
      es: 'Punta de roca accesible en Corralejo que limpia swells del norte y noreste frente a la isla de Lobos.',
      ar: 'لسان صخري في كوراليخو يستقبل أمواج الشمال والشمال الشرقي أمام جزيرة لوبوس بنظام وانسيابية.',
      en: 'Accessible volcanic point in Corralejo wrapping N/NE swells cleanly opposite Lobos Island.',
      fr: 'Pointe volcanique accessible à Corralejo enroulant proprement les houles N/NE face à l’îlot de Lobos.',
    },
    safetyNote: {
      es: 'Vigila la marea baja sobre la plataforma volcánica y la convivencia con escuelas y windsurf en verano.',
      ar: 'راقب مستوى الجزر فوق الرصيف الصخري وتجنب الازدحام مع مدارس الرياضات المائية صيفاً.',
      en: 'Watch low-tide lava ledges and shared zones with surf schools and windsurfers in summer.',
      fr: 'Surveillez la marée basse sur la dalle volcanique et le trafic nautique en été.',
    },
  },
  {
    id: 'nogales',
    island: 'la-palma',
    name: 'Playa de Nogales',
    municipality: 'Puntallana',
    bottom: 'beach',
    offshoreDeg: 250,
    idealSwellMinM: 0.9,
    idealSwellMaxM: 2.3,
    minSkill: 'intermediate',
    description: {
      es: 'Playa virgen de arena negra bajo impresionantes acantilados en el noreste de La Palma. Fuerza atlántica pura.',
      ar: 'شاطئ بكر برمال بركانية سوداء تحت جروف خضراء في شمال شرق لا بالما بقوة أطلسية خالصة.',
      en: 'Dramatic black-sand beach beneath sheer green cliffs in northeast La Palma with raw Atlantic peaks.',
      fr: 'Plage sauvage de sable noir sous de hautes falaises au nord-est de La Palma, baignée de houles pures.',
    },
    safetyNote: {
      es: 'Sin socorrismo permanente fuera de temporada alta; resaca fuerte en la orilla con marea llena.',
      ar: 'دون منقذين دائمين خارج ذروة الصيف؛ تيارات ارتداد قوية قرب الشاطئ عند المد المرتفع.',
      en: 'No year-round lifeguard outside peak summer; heavy shorebreak and backwash at high tide.',
      fr: 'Pas de surveillance hors haute saison ; puissant rouleau de bord et courant à marée haute.',
    },
  },
  {
    id: 'valle-gran-rey',
    island: 'la-gomera',
    name: 'Valle Gran Rey — La Puntilla',
    municipality: 'Valle Gran Rey',
    bottom: 'point',
    offshoreDeg: 55,
    idealSwellMinM: 1.0,
    idealSwellMaxM: 2.4,
    minSkill: 'intermediate',
    description: {
      es: 'Punta de cantos rodados y roca volcánica en el suroeste gomero que despierta con marejadas invernales del oeste y norte.',
      ar: 'رأس صخري وحصوي في جنوب غرب لا غوميرا ينشط مع أمواج الشتاء القادمة من الغرب والشمال.',
      en: 'Cobble and lava point on La Gomera’s sunny southwest coast that lights up on winter W/NW swells.',
      fr: 'Pointe de galets et roche volcanique au sud-ouest de La Gomera, active lors des houles hivernales O/NO.',
    },
    safetyNote: {
      es: 'Entrada por zona de callaos resbaladizos; calcula bien la serie antes de saltar.',
      ar: 'الدخول عبر منطقة حصى زلقة؛ راقب سلسلة الأمواج جيداً قبل النزول إلى الماء.',
      en: 'Slippery cobble entry; time the sets carefully before paddling out.',
      fr: 'Mise à l’eau sur galets glissants ; observez bien les séries avant de ramer.',
    },
  },
  {
    id: 'arenas-blancas',
    island: 'el-hierro',
    name: 'Arenas Blancas (El Golfo)',
    municipality: 'La Frontera',
    bottom: 'reef',
    offshoreDeg: 120,
    idealSwellMinM: 1.1,
    idealSwellMaxM: 2.6,
    minSkill: 'advanced',
    description: {
      es: 'Spot remoto de la costa oeste herreña con agua cristalina y fondo mixto sobre la bahía de El Golfo.',
      ar: 'موقع ناءٍ في الساحل الغربي لجزيرة إل هييرو بمياه صافية وقاع مختلط في خليج إل غولفو.',
      en: 'Remote west-coast break on El Hierro featuring crystal-clear Atlantic water and volcanic reef channels.',
      fr: 'Spot isolé de la côte ouest d’El Hierro aux eaux cristallines et fond volcanique.',
    },
    safetyNote: {
      es: 'Ubicación aislada sin servicios ni vigilancia; entra siempre acompañado y revisa el parte marino.',
      ar: 'موقع معزول بدون خدمات إنقاذ؛ لا تدخل الماء بمفردك وتحقق دائماً من النشرة البحرية.',
      en: 'Remote coast with no lifeguard services; never surf alone and verify local swell direction.',
      fr: 'Côte isolée sans surveillance ; ne surfez jamais seul et vérifiez la houle locale.',
    },
  },
  {
    id: 'las-conchas',
    island: 'la-graciosa',
    name: 'Playa de las Conchas',
    municipality: 'Teguise (La Graciosa)',
    bottom: 'beach',
    offshoreDeg: 155,
    idealSwellMinM: 0.8,
    idealSwellMaxM: 2.2,
    minSkill: 'intermediate',
    description: {
      es: 'Playa salvaje frente a Montaña Clara con picos potentes sobre arena clara y vistas volcánicas intactas.',
      ar: 'شاطئ بري أمام جزيرة مونتانا كلارا بقمم قوية على رمال فاتحة وإطلالات بركانية طبيعية.',
      en: 'Untouched beach break facing Montaña Clara islet with crisp sandbar peaks and zero coastal development.',
      fr: 'Plage sauvage face à l’îlot Montaña Clara offrant des pics puissants sur sable clair.',
    },
    safetyNote: {
      es: 'Corriente muy traicionera hacia mar abierto; ten precaución extrema si el swell supera 1,5 m.',
      ar: 'تيارات سحب خطيرة نحو عرض البحر؛ توخَّ أقصى الحذر إذا تجاوز ارتفاع الموج 1.5 متر.',
      en: 'Deceptive outward currents in the channel; stay within depth and avoid swells above 1.5 m unless experienced.',
      fr: 'Courants vers le large parfois trompeurs ; prudence accrue dès que la houle dépasse 1,5 m.',
    },
  },
];

export interface SurfCalculatorStrings {
  title: string;
  subtitle: string;
  liveMode: string;
  simulatorMode: string;
  syncLive: string;
  spotLabel: string;
  islandFilterAll: string;
  islandBadgePrefix: string;
  loading: string;
  error: string;
  retry: string;
  providerLabel: string;
  observedAt: string;
  inputsHeading: string;
  waveHeightLabel: string;
  wavePeriodLabel: string;
  windSpeedLabel: string;
  windQualityInputLabel: string;
  surferWeightLabel: string;
  skillLabel: string;
  boardLabel: string;
  skills: Record<SurfSkillLevel, string>;
  boards: Record<SurfBoardType, string>;
  bottomTypes: Record<SurfBottomType, string>;
  metrics: {
    breakingFace: string;
    wavePower: string;
    primarySwell: string;
    windAlignment: string;
    seaTemp: string;
    recommendedVolume: string;
    wetsuit: string;
    spotRange: string;
  };
  windQualities: {
    offshore: string;
    crossOffshore: string;
    crossShore: string;
    onshore: string;
  };
  powerClasses: {
    gentle: string;
    playable: string;
    solid: string;
    heavy: string;
  };
  verdicts: {
    heading: string;
    ideal: string;
    good: string;
    challenging: string;
    notRecommended: string;
    flatOrSmall: string;
  };
  verdictReasons: {
    tooSmall: string;
    idealMatch: string;
    goodMatch: string;
    tooHeavyForSkill: string;
    windOnshoreChop: string;
    reefCaution: string;
  };
  wetsuits: {
    shorty: string;
    spring32: string;
    full32: string;
    full43: string;
  };
  hourlyHeading: string;
  hourlyNote: string;
  safetyTitle: string;
  formulaNote: string;
}

export const SURF_STRINGS: Record<Language, SurfCalculatorStrings> = {
  es: {
    title: 'Calculador de Olas y Equipo para Surfistas',
    subtitle:
      'Combina datos marinos en directo de Open-Meteo Marine con un simulador de energía de ola (kW/m), altura de cara rompiente, alineación del viento y volumen mínimo de tabla para las 8 islas.',
    liveMode: 'Datos marinos en directo',
    simulatorMode: 'Simulador personalizado',
    syncLive: 'Sincronizar parte real',
    spotLabel: 'Pico / Spot de Canarias',
    islandFilterAll: 'Todas las islas (11 spots)',
    islandBadgePrefix: 'Isla',
    loading: 'Consultando boya virtual Open-Meteo Marine...',
    error: 'No se pudo cargar el parte marino en directo para este spot.',
    retry: 'Reintentar',
    providerLabel: 'Fuente: Open-Meteo Marine + Viento 10m',
    observedAt: 'Última lectura',
    inputsHeading: 'Parámetros del baño y perfil del surfista',
    waveHeightLabel: 'Altura significativa de mar (Hs)',
    wavePeriodLabel: 'Periodo de ola (Tp)',
    windSpeedLabel: 'Velocidad del viento',
    windQualityInputLabel: 'Orientación del viento en el pico',
    surferWeightLabel: 'Peso del surfista',
    skillLabel: 'Nivel técnico',
    boardLabel: 'Tipo de tabla',
    skills: {
      beginner: 'Iniciación',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    },
    boards: {
      longboard: 'Longboard',
      funboard: 'Evolutiva / Mid-length',
      shortboard: 'Shortboard',
    },
    bottomTypes: {
      beach: 'Fondo de arena',
      reef: 'Arrecife volcánico',
      point: 'Punta de roca / canto',
    },
    metrics: {
      breakingFace: 'Cara rompiente estimada',
      wavePower: 'Potencia de ola',
      primarySwell: 'Swell principal',
      windAlignment: 'Calidad del viento',
      seaTemp: 'Temperatura del agua',
      recommendedVolume: 'Volumen recomendado',
      wetsuit: 'Neopreno sugerido',
      spotRange: 'Rango óptimo del spot',
    },
    windQualities: {
      offshore: 'Offshore (terral limpio)',
      crossOffshore: 'Cross-offshore (bueno)',
      crossShore: 'Cruzado (lateral)',
      onshore: 'Onshore (mar revuelto)',
    },
    powerClasses: {
      gentle: 'Suave',
      playable: 'Divertida',
      solid: 'Potente',
      heavy: 'Muy exigente',
    },
    verdicts: {
      heading: 'Veredicto de sesión',
      ideal: 'Sesión ideal para tu perfil',
      good: 'Condiciones surfeables',
      challenging: 'Condiciones exigentes',
      notRecommended: 'No recomendado para este nivel',
      flatOrSmall: 'Mar muy pequeño o casi plato',
    },
    verdictReasons: {
      tooSmall: 'La altura y periodo actuales generan poca energía; prioriza longboard o tabla con alto volumen.',
      idealMatch: 'Tamaño en el rango dulce del pico, energía equilibrada y buena limpieza superficial para tu nivel.',
      goodMatch: 'El baño es aprovechable aunque conviene ajustar la elección de pico secundario o margen de flotación.',
      tooHeavyForSkill: 'La potencia calculada (kW/m) y la cara rompiente superan el margen seguro para el nivel o fondo seleccionado.',
      windOnshoreChop: 'Viento de mar moderado o fuerte que desordena la pared y añade corriente lateral.',
      reefCaution: 'Fondo volcánico somero: extrema la precaución en el take-off y considera escarpines en marea baja.',
    },
    wetsuits: {
      shorty: 'Licra térmica o shorty 2 mm (agua templada y viento flojo)',
      spring32: 'Neopreno corto / 3/2 mm ligero',
      full32: 'Neopreno largo 3/2 mm',
      full43: 'Neopreno 4/3 mm (sensación fresca por viento norte)',
    },
    hourlyHeading: 'Tendencia de ola · próximas 12 horas',
    hourlyNote: 'Altura (m) y periodo (s) hora a hora en horario canario',
    safetyTitle: 'Seguridad local en el agua',
    formulaNote: 'Potencia estimada según flujo energético en aguas profundas P ≈ 0,49 · Hs² · Tp y asomeramiento por periodo y tipo de fondo.',
  },
  ar: {
    title: 'حاسبة الأمواج ومعدات ركوب الأمواج (السيرف)',
    subtitle:
      'تجمع بيانات Open-Meteo البحرية المباشرة مع محاكي طاقة الموجة (kW/m) وارتفاع الوجه المنكسر واتجاه الرياح وحجم اللوح المناسب عبر الجزر الثماني.',
    liveMode: 'بيانات بحرية مباشرة',
    simulatorMode: 'محاكي مخصص',
    syncLive: 'مزامنة القراءة المباشرة',
    spotLabel: 'نقطة السيرف في الكناري',
    islandFilterAll: 'جميع الجزر (11 نقطة)',
    islandBadgePrefix: 'الجزيرة',
    loading: 'جارٍ جلب بيانات الأمواج والرياح المباشرة...',
    error: 'تعذر جلب البيانات البحرية المباشرة لهذه النقطة حالياً.',
    retry: 'إعادة المحاولة',
    providerLabel: 'المصدر: Open-Meteo Marine + رياح 10م',
    observedAt: 'آخر قراءة',
    inputsHeading: 'معطيات الجلسة وملف راكب الأمواج',
    waveHeightLabel: 'ارتفاع الموجة الدلالي (Hs)',
    wavePeriodLabel: 'فترة الموجة (Tp)',
    windSpeedLabel: 'سرعة الرياح',
    windQualityInputLabel: 'وضعية الرياح بالنسبة للشاطئ',
    surferWeightLabel: 'وزن راكب الأمواج',
    skillLabel: 'المستوى المهاري',
    boardLabel: 'نوع اللوح',
    skills: {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
    },
    boards: {
      longboard: 'لونغ بورد',
      funboard: 'فان بورد / وسط',
      shortboard: 'شورت بورد',
    },
    bottomTypes: {
      beach: 'قاع رملي',
      reef: 'شعاب بركانية',
      point: 'رأس صخري',
    },
    metrics: {
      breakingFace: 'ارتفاع الموجة عند الانكسار',
      wavePower: 'طاقة الموجة',
      primarySwell: 'الموج الأساسي (Swell)',
      windAlignment: 'جودة الرياح',
      seaTemp: 'حرارة سطح البحر',
      recommendedVolume: 'حجم اللوح الموصى به',
      wetsuit: 'بدلة الغوص المقترحة',
      spotRange: 'النطاق المثالي للموقع',
    },
    windQualities: {
      offshore: 'أوفشور (من البر · مثالي)',
      crossOffshore: 'مائل من البر (جيد)',
      crossShore: 'رياح جانبية',
      onshore: 'أونشور (من البحر · متقطع)',
    },
    powerClasses: {
      gentle: 'هادئة',
      playable: 'ممتعة',
      solid: 'قوية',
      heavy: 'عالية الخطورة',
    },
    verdicts: {
      heading: 'تقييم الجلسة',
      ideal: 'جلسة مثالية لمستواك',
      good: 'ظروف مناسبة لركوب الأمواج',
      challenging: 'ظروف تتطلب حذراً وخبرة',
      notRecommended: 'غير مناسب لهذا المستوى حالياً',
      flatOrSmall: 'بحر هادئ جداً أو أمواج ضعيفة',
    },
    verdictReasons: {
      tooSmall: 'الارتفاع والفترة الحاليان يولدان طاقة منخفضة؛ يُفضل استخدام لونغ بورد أو لوح بحجم أكبر.',
      idealMatch: 'حجم الموجة ضمن النطاق المثالي للنقطة مع طاقة متوازنة وسطح منظم.',
      goodMatch: 'يمكن الاستفادة من الجلسة مع اختيار لوح مريح وتوخي الانتباه للتيارات.',
      tooHeavyForSkill: 'طاقة الموجة (kW/m) وارتفاع الانكسار يتجاوزان الهامش الآمن للمستوى أو نوع القاع المختار.',
      windOnshoreChop: 'رياح بحرية متوسطة أو قوية تزيد من اضطراب سطح الماء والانجراف الجانبي.',
      reefCaution: 'قاع بركاني ضحل؛ توخَّ الحذر عند النزول والانطلاق مع ارتداء أحذية مائية عند الجزر.',
    },
    wetsuits: {
      shorty: 'قميص حراري أو شورتي 2 مم (ماء معتدل ورياح خفيفة)',
      spring32: 'بدلة قصيرة أو 3/2 مم خفيفة',
      full32: 'بدلة كاملة 3/2 مم',
      full43: 'بدلة 4/3 مم (إحساس أبرد بفعل الرياح الشمالية)',
    },
    hourlyHeading: 'توقع الموج للساعات الـ 12 القادمة',
    hourlyNote: 'الارتفاع (م) والفترة (ث) حسب التوقيت الكناري',
    safetyTitle: 'السلامة البحرية المحلية',
    formulaNote: 'تُحسب الطاقة وفق معادلة تدفق الطاقة البحرية P ≈ 0.49 · Hs² · Tp مع معامل انكسار القاع.',
  },
  en: {
    title: 'Surfer Wave & Gear Calculator',
    subtitle:
      'Combines live Open-Meteo Marine swell telemetry with an interactive physics calculator for wave power (kW/m), breaking face height, wind grooming, board volume, and wetsuit choice across all 8 islands.',
    liveMode: 'Live Marine Data',
    simulatorMode: 'Custom Simulator',
    syncLive: 'Sync live conditions',
    spotLabel: 'Canary Islands Surf Spot',
    islandFilterAll: 'All islands (11 spots)',
    islandBadgePrefix: 'Island',
    loading: 'Fetching live Open-Meteo Marine telemetry...',
    error: 'Could not retrieve live marine conditions for this spot.',
    retry: 'Retry',
    providerLabel: 'Source: Open-Meteo Marine + 10m Wind',
    observedAt: 'Observed',
    inputsHeading: 'Swell parameters & surfer profile',
    waveHeightLabel: 'Significant wave height (Hs)',
    wavePeriodLabel: 'Wave period (Tp)',
    windSpeedLabel: 'Wind speed',
    windQualityInputLabel: 'Wind orientation at break',
    surferWeightLabel: 'Surfer weight',
    skillLabel: 'Skill level',
    boardLabel: 'Board style',
    skills: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    boards: {
      longboard: 'Longboard',
      funboard: 'Funboard / Mid-length',
      shortboard: 'Shortboard',
    },
    bottomTypes: {
      beach: 'Sand beach break',
      reef: 'Volcanic reef',
      point: 'Rock / cobble point',
    },
    metrics: {
      breakingFace: 'Est. breaking face',
      wavePower: 'Wave power',
      primarySwell: 'Primary swell',
      windAlignment: 'Wind alignment',
      seaTemp: 'Sea surface temp',
      recommendedVolume: 'Recommended volume',
      wetsuit: 'Wetsuit suggestion',
      spotRange: 'Spot sweet spot',
    },
    windQualities: {
      offshore: 'Offshore (clean grooming)',
      crossOffshore: 'Cross-offshore (clean)',
      crossShore: 'Cross-shore (side chop)',
      onshore: 'Onshore (bumpy/blown out)',
    },
    powerClasses: {
      gentle: 'Gentle',
      playable: 'Playable',
      solid: 'Solid',
      heavy: 'Heavy',
    },
    verdicts: {
      heading: 'Session Verdict',
      ideal: 'Ideal match for your profile',
      good: 'Surfable conditions',
      challenging: 'Challenging session',
      notRecommended: 'Not recommended at this level',
      flatOrSmall: 'Very small / nearly flat',
    },
    verdictReasons: {
      tooSmall: 'Current height and period produce low wave energy — opt for a high-volume longboard or wait for the next pulse.',
      idealMatch: 'Swell sits right inside the spot’s sweet spot with clean surface conditions for your board and skill level.',
      goodMatch: 'Surfable walls available; consider extra paddle volume or a sheltered corner if the wind picks up.',
      tooHeavyForSkill: 'Computed wave power (kW/m) and breaking face exceed comfortable safety margins for this level or seabed.',
      windOnshoreChop: 'Moderate-to-strong onshore wind adds surface chop and side drift.',
      reefCaution: 'Shallow volcanic reef break: mind the takeoff zone and wear booties around low tide.',
    },
    wetsuits: {
      shorty: 'Rashguard or 2 mm shorty (mild Atlantic water & light wind)',
      spring32: '3/2 mm spring suit or light fullsuit',
      full32: '3/2 mm fullsuit',
      full43: '4/3 mm fullsuit (wind-chill adjusted for north swell sessions)',
    },
    hourlyHeading: '12-hour wave height outlook',
    hourlyNote: 'Hourly height (m) and period (s) in Canary local time',
    safetyTitle: 'Local water safety note',
    formulaNote: 'Deep-water wave energy flux P ≈ 0.49 · Hs² · Tp adjusted for period shoaling and seabed slope.',
  },
  fr: {
    title: 'Calculateur de Vagues & Matériel Surf',
    subtitle:
      'Associe les données marines en direct d’Open-Meteo Marine à un simulateur de puissance (kW/m), hauteur de face déferlante, orientation du vent et volume de planche sur les 8 îles.',
    liveMode: 'Données marines en direct',
    simulatorMode: 'Simulateur personnalisé',
    syncLive: 'Synchroniser le réel',
    spotLabel: 'Spot de surf aux Canaries',
    islandFilterAll: 'Toutes les îles (11 spots)',
    islandBadgePrefix: 'Île',
    loading: 'Chargement des données Open-Meteo Marine...',
    error: 'Impossible de charger les conditions marines pour ce spot.',
    retry: 'Réessayer',
    providerLabel: 'Source : Open-Meteo Marine + Vent 10m',
    observedAt: 'Relevé',
    inputsHeading: 'Paramètres de houle & profil du surfeur',
    waveHeightLabel: 'Hauteur significative (Hs)',
    wavePeriodLabel: 'Période de houle (Tp)',
    windSpeedLabel: 'Vitesse du vent',
    windQualityInputLabel: 'Orientation du vent sur le pic',
    surferWeightLabel: 'Poids du surfeur',
    skillLabel: 'Niveau technique',
    boardLabel: 'Type de planche',
    skills: {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Confirmé',
    },
    boards: {
      longboard: 'Longboard',
      funboard: 'Évolutive / Mid-length',
      shortboard: 'Shortboard',
    },
    bottomTypes: {
      beach: 'Fond de sable',
      reef: 'Récif volcanique',
      point: 'Pointe rocheuse',
    },
    metrics: {
      breakingFace: 'Face déferlante estimée',
      wavePower: 'Puissance de vague',
      primarySwell: 'Houle primaire',
      windAlignment: 'Qualité du vent',
      seaTemp: 'Température de l’eau',
      recommendedVolume: 'Volume recommandé',
      wetsuit: 'Combinaison conseillée',
      spotRange: 'Plage idéale du spot',
    },
    windQualities: {
      offshore: 'Offshore (vent de terre propre)',
      crossOffshore: 'Cross-offshore (propre)',
      crossShore: 'Travers (vent latéral)',
      onshore: 'Onshore (plan d’eau agité)',
    },
    powerClasses: {
      gentle: 'Douce',
      playable: 'Maniable',
      solid: 'Solide',
      heavy: 'Puissante / engagée',
    },
    verdicts: {
      heading: 'Verdict de session',
      ideal: 'Session idéale pour votre profil',
      good: 'Conditions surfables',
      challenging: 'Session exigeante',
      notRecommended: 'Déconseillé pour ce niveau',
      flatOrSmall: 'Mer très petite ou quasi plate',
    },
    verdictReasons: {
      tooSmall: 'La hauteur et la période actuelles produisent peu d’énergie ; privilégiez un longboard volumineux.',
      idealMatch: 'La houle correspond parfaitement à la fenêtre idéale du spot avec un plan d’eau propre.',
      goodMatch: 'Vagues exploitables ; prévoyez un peu plus de volume ou un pic de repli si le vent monte.',
      tooHeavyForSkill: 'La puissance calculée (kW/m) et la face dépassent la marge de sécurité pour ce niveau ou ce fond.',
      windOnshoreChop: 'Vent marin modéré à soutenu générant du clapot et une dérive latérale.',
      reefCaution: 'Dalle volcanique peu profonde : prudence au take-off et chaussons conseillés à marée basse.',
    },
    wetsuits: {
      shorty: 'Lycra thermique ou shorty 2 mm (eau douce et vent faible)',
      spring32: 'Combinaison courte ou 3/2 mm légère',
      full32: 'Combinaison intégrale 3/2 mm',
      full43: 'Combinaison 4/3 mm (ressenti rafraîchi par le vent du nord)',
    },
    hourlyHeading: 'Tendance sur les 12 prochaines heures',
    hourlyNote: 'Hauteur (m) et période (s) heure par heure (Canaries)',
    safetyTitle: 'Sécurité locale à l’eau',
    formulaNote: 'Flux énergétique en eau profonde P ≈ 0,49 · Hs² · Tp ajusté selon le lissage de période et le type de fond.',
  },
};
