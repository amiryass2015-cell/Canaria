import {
  IslandId,
  IslandTransportInfo,
  Language,
  TransportLineItem,
} from '../types/canarias';

export const ISLAND_TRANSPORT: Record<IslandId, IslandTransportInfo> = {
  tenerife: {
    island: 'tenerife',
    mainOperator: 'TITSA (Guaguas)',
    secondaryOperator: 'Metrotenerife (Tranvía T1 / T2)',
    cardName: 'Tarjeta Ten+ / Ten+ Móvil',
    airportConnectionSummary: {
      es: 'AeroExpress 20 (Santa Cruz – TFN, 20 min) y líneas 111 / 40 / 711 (TFS – Costa Adeje / Santa Cruz).',
      ar: 'حافلة AeroExpress 20 (سانتا كروز – مطار الشمال) وخطوط 111 و40 إلى مطار الجنوب وكوستا أديخي.',
      en: 'AeroExpress 20 (Santa Cruz – TFN, 20 min) and routes 111 / 40 / 711 (TFS – Costa Adeje / Santa Cruz).',
      fr: 'AeroExpress 20 (Santa Cruz – TFN, 20 min) et lignes 111 / 40 / 711 (TFS – Costa Adeje / Santa Cruz).',
    },
    residentPassRule: {
      es: 'Bono Residente Canario gratuito en Ten+ realizando el mínimo mensual de viajes validados.',
      ar: 'بطاقة المقيم الكناري مجانية عبر Ten+ عند استيفاء الحد الأدنى من الرحلات الشهرية.',
      en: 'Canary Resident Pass rides free on Ten+ when meeting the monthly trip threshold.',
      fr: 'Pass Résident gratuit sur Ten+ sous réserve d’atteindre le seuil mensuel de trajets.',
    },
    touristPayRule: {
      es: 'Pago contactless a bordo en líneas urbanas y AeroExpress, o abonos Ten+ Turístico de 1 o 7 días sin límite de transbordos.',
      ar: 'الدفع اللاتلامسي بالبطاقة البنكية أو عبر تذكرة Ten+ السياحية ليوم أو 7 أيام غير محدودة.',
      en: 'Contactless bank card onboard on key routes, or unlimited 1-day / 7-day Ten+ Tourist passes.',
      fr: 'Paiement sans contact à bord sur les lignes phares ou pass Ten+ Touriste illimité 1 ou 7 jours.',
    },
    bikeAndSurfRule: {
      es: 'Tablas de surf y bicicletas permitidas en maletero inferior de guaguas interurbanas según capacidad; en el tranvía en horas valle.',
      ar: 'تُقبل ألواح السيرف والدراجات في صندوق الأمتعة السفلي للحافلات الإقليمية، وفي الترام خارج أوقات الذروة.',
      en: 'Surfboards and bikes accepted in intercity bus luggage bays subject to space; off-peak hours on the tram.',
      fr: 'Planches de surf et vélos admis en soute sur les bus interurbains selon place ; heures creuses sur le tram.',
    },
    lines: [
      {
        code: '010 / 020',
        route: 'Santa Cruz ↔ Aeropuerto Norte (TFN) ↔ La Laguna',
        kind: 'airport',
        frequency: {
          es: 'Cada 20–30 min',
          ar: 'كل 20–30 دقيقة',
          en: 'Every 20–30 min',
          fr: 'Toutes les 20–30 min',
        },
        durationMin: 22,
        standardFareEur: 2.65,
      },
      {
        code: '110 / 111',
        route: 'Santa Cruz ↔ Aeropuerto Sur (TFS) ↔ Costa Adeje',
        kind: 'airport',
        frequency: {
          es: 'Cada 30 min',
          ar: 'كل 30 دقيقة',
          en: 'Every 30 min',
          fr: 'Toutes les 30 min',
        },
        durationMin: 55,
        standardFareEur: 9.35,
      },
      {
        code: 'T1',
        route: 'Intercambiador Santa Cruz ↔ Trinidad (La Laguna)',
        kind: 'tram',
        frequency: {
          es: 'Cada 5–10 min',
          ar: 'كل 5–10 دقائق',
          en: 'Every 5–10 min',
          fr: 'Toutes les 5–10 min',
        },
        durationMin: 37,
        standardFareEur: 1.35,
      },
      {
        code: '348 / 342',
        route: 'Puerto de la Cruz / Costa Adeje ↔ Parque Nacional del Teide',
        kind: 'rural',
        frequency: {
          es: '1–2 salidas/día',
          ar: 'رحلة إلى رحلتين يومياً',
          en: '1–2 departures/day',
          fr: '1–2 départs/jour',
        },
        durationMin: 75,
        standardFareEur: 6.2,
      },
    ],
    passes: [
      {
        name: {
          es: 'Bono Residente Canario Ten+',
          ar: 'بطاقة المقيم الكناري Ten+',
          en: 'Ten+ Canary Resident Pass',
          fr: 'Pass Résident Ten+',
        },
        audience: 'resident',
        priceNote: {
          es: '0 € (bonificado 100 % con uso mínimo)',
          ar: '0 € (مجانية مع الحد الأدنى الشهري)',
          en: '€0 (100% subsidized with min. rides)',
          fr: '0 € (subventionné à 100 %)',
        },
        detail: {
          es: 'Válido en todas las líneas TITSA y Tranvía T1/T2 presentando empadronamiento en Canarias.',
          ar: 'صالح في جميع حافلات TITSA وخطوط الترام T1/T2 للمسجلين في السجل السكاني.',
          en: 'Valid across all TITSA buses and T1/T2 tram with Canary Islands residency.',
          fr: 'Valable sur tout le réseau TITSA et le tramway T1/T2 sur justificatif de résidence.',
        },
      },
      {
        name: {
          es: 'Ten+ Turístico (1 día / 7 días)',
          ar: 'بطاقة Ten+ السياحية (يوم / 7 أيام)',
          en: 'Ten+ Tourist Pass (1-Day / 7-Day)',
          fr: 'Pass Ten+ Touriste (1 jour / 7 jours)',
        },
        audience: 'tourist',
        priceNote: {
          es: '10 € (24 h) · 50 € (7 días)',
          ar: '10 € (24 ساعة) · 50 € (7 أيام)',
          en: '€10 (24h) · €50 (7 days)',
          fr: '10 € (24 h) · 50 € (7 jours)',
        },
        detail: {
          es: 'Viajes ilimitados en guagua y tranvía por toda la isla sin preocuparse por zonas ni efectivo.',
          ar: 'رحلات غير محدودة بالحافلة والترام في كامل الجزيرة دون حساب المناطق.',
          en: 'Unlimited bus and tram rides island-wide without calculating distance zones.',
          fr: 'Trajets illimités en bus et tram sur toute l’île sans calcul de zones.',
        },
      },
    ],
  },
  'gran-canaria': {
    island: 'gran-canaria',
    mainOperator: 'Guaguas Global (Interurbano)',
    secondaryOperator: 'Guaguas Municipales & Sítycleta (LPGC)',
    cardName: 'Tarjeta Suma / Wawa Joven / Bono',
    airportConnectionSummary: {
      es: 'Línea 60 directa a Las Palmas (25 min) y líneas 66 / 90 hacia Maspalomas y Playa del Inglés.',
      ar: 'الخط 60 المباشر إلى لاس بالماس (25 دقيقة) والخطان 66 و90 نحو ماسبالوماس وبلايا ديل إنغليس.',
      en: 'Express Line 60 to Las Palmas (25 min) plus Lines 66 / 90 direct to Maspalomas and Playa del Inglés.',
      fr: 'Ligne express 60 vers Las Palmas (25 min) et lignes 66 / 90 vers Maspalomas et Playa del Inglés.',
    },
    residentPassRule: {
      es: 'Gratuidad en Global y Guaguas Municipales para titulares de Bono Residente o Wawa Joven con uso mensual activo.',
      ar: 'تنقل مجاني في حافلات Global وGuaguas Municipales لحاملي بطاقة المقيم أو Wawa Joven.',
      en: 'Free travel on Global and Guaguas Municipales with active Canary Resident or Wawa Joven cards.',
      fr: 'Gratuité sur Global et Guaguas Municipales avec le Pass Résident ou Wawa Joven actif.',
    },
    touristPayRule: {
      es: 'Pago con tarjeta contactless en Global y Guaguas Municipales, o tarjeta recargable AB / Bono2 para ahorrar por trayecto.',
      ar: 'دفع بالبطاقة البنكية اللاتلامسية أو بطاقات التعبئة المسبقة للتنقل الحضري.',
      en: 'Tap contactless bank cards onboard Global and city buses, or grab a multi-trip Bono card.',
      fr: 'Paiement sans contact à bord sur Global et bus urbains, ou carte prépayée multi-trajets.',
    },
    bikeAndSurfRule: {
      es: 'Tablas admitidas en bodega de Guaguas Global (ej. línea 30 o 60); bicicleta pública eléctrica Sítycleta disponible en Las Palmas.',
      ar: 'تُقبل الألواح في مخزن حافلات Global؛ وتتوفر دراجات Sítycleta الكهربائية في العاصمة.',
      en: 'Surfboards accepted in Global coach luggage holds; Sítycleta e-bikes cover central Las Palmas.',
      fr: 'Planches acceptées en soute sur Global ; vélos électriques Sítycleta disponibles à Las Palmas.',
    },
    lines: [
      {
        code: '60',
        route: 'San Telmo / Santa Catalina ↔ Aeropuerto Gran Canaria (LPA)',
        kind: 'airport',
        frequency: {
          es: 'Cada 30 min',
          ar: 'كل 30 دقيقة',
          en: 'Every 30 min',
          fr: 'Toutes les 30 min',
        },
        durationMin: 25,
        standardFareEur: 2.95,
      },
      {
        code: '66 / 90',
        route: 'Aeropuerto (LPA) ↔ Playa del Inglés ↔ Faro de Maspalomas',
        kind: 'airport',
        frequency: {
          es: 'Cada 30–60 min',
          ar: 'كل 30–60 دقيقة',
          en: 'Every 30–60 min',
          fr: 'Toutes les 30–60 min',
        },
        durationMin: 40,
        standardFareEur: 4.05,
      },
      {
        code: '30',
        route: 'Las Palmas (Santa Catalina) ↔ Faro de Maspalomas (Directo)',
        kind: 'trunk',
        frequency: {
          es: 'Cada 20 min',
          ar: 'كل 20 دقيقة',
          en: 'Every 20 min',
          fr: 'Toutes les 20 min',
        },
        durationMin: 55,
        standardFareEur: 6.8,
      },
      {
        code: '103 / 303',
        route: 'Las Palmas ↔ Agaete (Puerto de las Nieves) / San Mateo',
        kind: 'rural',
        frequency: {
          es: 'Cada 30–60 min',
          ar: 'كل 30–60 دقيقة',
          en: 'Every 30–60 min',
          fr: 'Toutes les 30–60 min',
        },
        durationMin: 50,
        standardFareEur: 4.35,
      },
    ],
    passes: [
      {
        name: {
          es: 'Bono Residente / Wawa Joven',
          ar: 'بطاقة المقيم / وواوا جوفين',
          en: 'Resident Pass / Wawa Joven',
          fr: 'Pass Résident / Wawa Joven',
        },
        audience: 'resident',
        priceNote: {
          es: '0 € (con mínimo de viajes)',
          ar: '0 € (مع الحد الأدنى الشهري)',
          en: '€0 (with min. monthly trips)',
          fr: '0 € (avec trajets mensuels min.)',
        },
        detail: {
          es: 'Integrado para Global interurbano y Guaguas Municipales de Las Palmas.',
          ar: 'مدمجة للحافلات الحضرية والإقليمية في جميع أنحاء غران كناريا.',
          en: 'Covers both island-wide Global coaches and Las Palmas city buses.',
          fr: 'Intégré pour les cars Global et les bus urbains de Las Palmas.',
        },
      },
      {
        name: {
          es: 'Tarjeta Turística / Tarjeta Global AB',
          ar: 'البطاقة السياحية / بطاقة الرصيد AB',
          en: 'Visitor Multi-Ride / AB Card',
          fr: 'Carte Visiteur / Prépayée AB',
        },
        audience: 'tourist',
        priceNote: {
          es: '20 %–50 % dto. sobre billete sencillo',
          ar: 'خصم 20٪–50٪ على التذكرة المفردة',
          en: '20%–50% off single fares',
          fr: '20 %–50 % de remise sur le trajet',
        },
        detail: {
          es: 'Recargable en estaciones de San Telmo y Santa Catalina o app oficial para trayectos frecuentes al sur.',
          ar: 'تُشحن في محطتي سان تيلمو وسانتا كاتالينا لتخفيض تكلفة التنقل نحو الجنوب.',
          en: 'Top-up at San Telmo or Santa Catalina hubs to cut fares on south-coast trips.',
          fr: 'Rechargeable aux pôles San Telmo et Santa Catalina pour réduire le coût des trajets.',
        },
      },
    ],
  },
  lanzarote: {
    island: 'lanzarote',
    mainOperator: 'IntercityBus Lanzarote',
    secondaryOperator: 'Guaguas Municipales de Arrecife',
    cardName: 'BonoBus Lanzarote / Bono Residente',
    airportConnectionSummary: {
      es: 'Líneas 22 y 23 conectan el aeropuerto (ACE) con Arrecife y Playa Honda; la 161 enlaza con Puerto del Carmen y Playa Blanca.',
      ar: 'الخطان 22 و23 يربطان المطار بأريسيفي وبلايا هوندا، والخط 161 يصل لبويرتو ديل كارمن وبلايا بلانكا.',
      en: 'Lines 22 & 23 link ACE airport with Arrecife; Line 161 connects directly to Puerto del Carmen & Playa Blanca.',
      fr: 'Lignes 22 et 23 vers Arrecife ; ligne 161 directe vers Puerto del Carmen et Playa Blanca.',
    },
    residentPassRule: {
      es: 'Bono Residente Lanzarote con viajes bonificados al 100 % cumpliendo el mínimo mensual de validaciones.',
      ar: 'بطاقة مقيم لانزاروت مدعومة 100٪ عند استيفاء الحد الأدنى من الاستخدام الشهري.',
      en: 'Lanzarote Resident Card rides free once minimum monthly trips are completed.',
      fr: 'Pass Résident Lanzarote gratuit avec le minimum mensuel de validations.',
    },
    touristPayRule: {
      es: 'Compra en efectivo o tarjeta contactless en líneas principales, o BonoBus recargable en estación de Arrecife.',
      ar: 'شراء مباشر على متن الحافلة أو عبر بطاقة BonoBus القابلة للشحن في محطة أريسيفي.',
      en: 'Onboard payment or reloadable BonoBus card from Arrecife bus station for up to 30% savings.',
      fr: 'Paiement à bord ou carte rechargeable BonoBus (jusqu’à 30 % de remise).',
    },
    bikeAndSurfRule: {
      es: 'Línea 20 a Caleta de Famara admite fundas de surf estándar en maletero bajo disponibilidad; carriles bici costeros en Arrecife y Costa Teguise.',
      ar: 'الخط 20 إلى فامارا يقبل ألواح السيرف في صندوق الأمتعة؛ مع مسارات دراجات ساحلية في أريسيفي.',
      en: 'Route 20 to Famara takes surf bags in the lower hold when space allows; coastal bike paths link Arrecife & Costa Teguise.',
      fr: 'La ligne 20 vers Famara accepte les housses de surf en soute ; pistes cyclables côtières à Arrecife.',
    },
    lines: [
      {
        code: '22 / 161',
        route: 'Aeropuerto (ACE) ↔ Arrecife / Puerto del Carmen / Playa Blanca',
        kind: 'airport',
        frequency: {
          es: 'Cada 30–60 min',
          ar: 'كل 30–60 دقيقة',
          en: 'Every 30–60 min',
          fr: 'Toutes les 30–60 min',
        },
        durationMin: 40,
        standardFareEur: 3.3,
      },
      {
        code: '09',
        route: 'Arrecife ↔ Teguise ↔ Órzola (Ferry La Graciosa)',
        kind: 'maritime',
        frequency: {
          es: '4–5 salidas/día',
          ar: '4–5 رحلات يومياً',
          en: '4–5 departures/day',
          fr: '4–5 départs/jour',
        },
        durationMin: 55,
        standardFareEur: 3.6,
      },
      {
        code: '20',
        route: 'Arrecife ↔ San Bartolomé ↔ Caleta de Famara',
        kind: 'trunk',
        frequency: {
          es: 'Cada 60–90 min',
          ar: 'كل 60–90 دقيقة',
          en: 'Every 60–90 min',
          fr: 'Toutes les 60–90 min',
        },
        durationMin: 35,
        standardFareEur: 2.4,
      },
      {
        code: '60',
        route: 'Arrecife ↔ Yaiza ↔ Playa Blanca (Ferry Fuerteventura)',
        kind: 'trunk',
        frequency: {
          es: 'Cada 30–45 min',
          ar: 'كل 30–45 دقيقة',
          en: 'Every 30–45 min',
          fr: 'Toutes les 30–45 min',
        },
        durationMin: 60,
        standardFareEur: 3.3,
      },
    ],
    passes: [
      {
        name: {
          es: 'Bono Residente Lanzarote',
          ar: 'بطاقة مقيم لانزاروت',
          en: 'Lanzarote Resident Pass',
          fr: 'Pass Résident Lanzarote',
        },
        audience: 'resident',
        priceNote: {
          es: '0 € (bonificado 100 %)',
          ar: '0 € (مدعومة بالكامل)',
          en: '€0 (100% subsidized)',
          fr: '0 € (subventionné à 100 %)',
        },
        detail: {
          es: 'Para residentes empadronados en toda la isla en líneas IntercityBus.',
          ar: 'للمقيمين المسجلين على جميع خطوط IntercityBus في الجزيرة.',
          en: 'For registered residents across all IntercityBus Lanzarote routes.',
          fr: 'Pour les résidents inscrits sur toutes les lignes IntercityBus.',
        },
      },
      {
        name: {
          es: 'BonoBus Turístico / Recargable',
          ar: 'بطاقة BonoBus القابلة للشحن',
          en: 'Reloadable BonoBus Card',
          fr: 'Carte Rechargeable BonoBus',
        },
        audience: 'tourist',
        priceNote: {
          es: 'Carga desde 10 € (dto. 10 %–30 %)',
          ar: 'شحن من 10 € (خصم 10٪–30٪)',
          en: 'Top-up from €10 (10%–30% off)',
          fr: 'Recharge dès 10 € (-10 % à -30 %)',
        },
        detail: {
          es: 'Ideal para combinar Arrecife, Órzola, Famara y Playa Blanca sin billetes sueltos.',
          ar: 'مثالية للتنقل بين أريسيفي وأورزولا وفامارا وبلايا بلانكا بتكلفة مخفضة.',
          en: 'Handy for visiting Famara, Órzola ferry port, and Playa Blanca smoothly.',
          fr: 'Pratique pour relier Famara, le port d’Órzola et Playa Blanca à tarif réduit.',
        },
      },
    ],
  },
  fuerteventura: {
    island: 'fuerteventura',
    mainOperator: 'Tiadhe (Transportes Cabildo)',
    cardName: 'Bono Residente / Tarjeta Tiadhe',
    airportConnectionSummary: {
      es: 'Línea 03 conecta el aeropuerto (FUE) con Puerto del Rosario y Caleta de Fuste; línea 10 y 16 hacia Morro Jable y Gran Tarajal.',
      ar: 'الخط 03 يربط المطار ببويرتو ديل روساريو وكاليتا دي فوستي، والخطان 10 و16 نحو مورو خابلي.',
      en: 'Line 03 serves Puerto del Rosario & Caleta de Fuste; Lines 10 & 16 connect FUE directly to Morro Jable.',
      fr: 'Ligne 03 vers Puerto del Rosario et Caleta de Fuste ; lignes 10 et 16 vers Morro Jable.',
    },
    residentPassRule: {
      es: 'Bono Residente gratuito en toda la red Tiadhe validando la tarjeta en cada subida.',
      ar: 'بطاقة المقيم مجانية في كافة خطوط Tiadhe عند التحقق في كل رحلة.',
      en: 'Free Tiadhe island-wide rides for Resident Pass holders.',
      fr: 'Gratuité sur tout le réseau Tiadhe avec le Pass Résident.',
    },
    touristPayRule: {
      es: 'Billete sencillo a bordo o BonoBus recargable de 15 € / 30 € en taquillas de Puerto del Rosario, Corralejo o Morro Jable.',
      ar: 'تذكرة فردية داخل الحافلة أو بطاقة BonoBus مسبقة الدفع في محطات بويرتو أو كوراليخو.',
      en: 'Pay onboard or get a BonoBus card (€15/€30) at Puerto del Rosario, Corralejo, or Morro Jable hubs.',
      fr: 'Ticket à bord ou carte BonoBus (15 €/30 €) aux gares de Puerto, Corralejo ou Morro Jable.',
    },
    bikeAndSurfRule: {
      es: 'Gran capacidad en maletero para tablas de surf y kite en las líneas 06 (Corralejo) y 07 (El Cotillo).',
      ar: 'سعة كبيرة في صندوق الأمتعة لألواح السيرف والكيت سيرف على خطي كوراليخو وإل كوتيو.',
      en: 'Spacious under-floor bays easily fit surf and kite bags on Routes 06 (Corralejo) and 07 (El Cotillo).',
      fr: 'Soutes spacieuses adaptées aux planches de surf et kite sur les lignes 06 (Corralejo) et 07 (El Cotillo).',
    },
    lines: [
      {
        code: '03',
        route: 'Puerto del Rosario ↔ Aeropuerto (FUE) ↔ Caleta de Fuste',
        kind: 'airport',
        frequency: {
          es: 'Cada 30 min',
          ar: 'كل 30 دقيقة',
          en: 'Every 30 min',
          fr: 'Toutes les 30 min',
        },
        durationMin: 20,
        standardFareEur: 1.45,
      },
      {
        code: '06',
        route: 'Puerto del Rosario ↔ Dunas de Corralejo ↔ Puerto Corralejo',
        kind: 'trunk',
        frequency: {
          es: 'Cada 30 min',
          ar: 'كل 30 دقيقة',
          en: 'Every 30 min',
          fr: 'Toutes les 30 min',
        },
        durationMin: 40,
        standardFareEur: 3.4,
      },
      {
        code: '07',
        route: 'Puerto del Rosario ↔ La Oliva ↔ El Cotillo',
        kind: 'rural',
        frequency: {
          es: 'Cada 60 min',
          ar: 'كل 60 دقيقة',
          en: 'Every 60 min',
          fr: 'Toutes les 60 min',
        },
        durationMin: 50,
        standardFareEur: 4.15,
      },
      {
        code: '01 / 10',
        route: 'Puerto del Rosario ↔ Aeropuerto (FUE) ↔ Morro Jable',
        kind: 'trunk',
        frequency: {
          es: 'Cada 60 min',
          ar: 'كل 60 دقيقة',
          en: 'Every 60 min',
          fr: 'Toutes les 60 min',
        },
        durationMin: 95,
        standardFareEur: 9.7,
      },
    ],
    passes: [
      {
        name: {
          es: 'Bono Residente Tiadhe',
          ar: 'بطاقة مقيم فويرتيفنتورا',
          en: 'Tiadhe Resident Pass',
          fr: 'Pass Résident Tiadhe',
        },
        audience: 'resident',
        priceNote: {
          es: '0 € (bonificado 100 %)',
          ar: '0 € (مدعومة بالكامل)',
          en: '€0 (100% subsidized)',
          fr: '0 € (subventionné à 100 %)',
        },
        detail: {
          es: 'Incluye tramos largos norte–sur entre Corralejo, Puerto del Rosario y Jandía.',
          ar: 'يشمل الرحلات الطويلة من الشمال إلى الجنوب بين كوراليخو ومورو خابلي.',
          en: 'Covers full north–south corridors from Corralejo down to Jandía.',
          fr: 'Couvre l’axe complet nord-sud de Corralejo jusqu’à Jandía.',
        },
      },
      {
        name: {
          es: 'Tarjeta BonoBus Tiadhe',
          ar: 'بطاقة BonoBus مسبقة الدفع',
          en: 'Tiadhe BonoBus Card',
          fr: 'Carte BonoBus Tiadhe',
        },
        audience: 'tourist',
        priceNote: {
          es: '30 % descuento por viaje',
          ar: 'خصم 30٪ على كل رحلة',
          en: '30% fare discount',
          fr: '30 % de réduction par trajet',
        },
        detail: {
          es: 'Recomendada para recorridos largos por la isla (aeropuerto a Costa Calma o Morro Jable).',
          ar: 'موفرة للغاية في المسافات الطويلة من المطار إلى كوستا كالما أو مورو خابلي.',
          en: 'Pays off immediately on long south-bound trips from FUE to Costa Calma or Morro Jable.',
          fr: 'Rentable dès le premier trajet long entre l’aéroport et Costa Calma ou Morro Jable.',
        },
      },
    ],
  },
  'la-palma': {
    island: 'la-palma',
    mainOperator: 'TILP (Transportes Insular La Palma)',
    cardName: 'Bono Residente / Tarjeta Monedero TILP',
    airportConnectionSummary: {
      es: 'Línea 500 conecta el aeropuerto (SPC) con Santa Cruz de La Palma y Los Cancajos cada 30 minutos.',
      ar: 'الخط 500 يربط المطار بسانتا كروز دي لا بالما ولوس كانكاخوس كل 30 دقيقة.',
      en: 'Line 500 connects La Palma Airport (SPC) with Santa Cruz and Los Cancajos every 30 minutes.',
      fr: 'Ligne 500 reliant l’aéroport (SPC) à Santa Cruz et Los Cancajos toutes les 30 minutes.',
    },
    residentPassRule: {
      es: 'Viajes bonificados al 100 % con el Bono Residente Canario para desplazamientos diarios entre comarcas.',
      ar: 'تنقل مجاني بين بلديات الجزيرة لحاملي بطاقة المقيم الكناري.',
      en: 'Free island-wide travel on TILP lines for Canary Resident cardholders.',
      fr: 'Trajets gratuits sur le réseau TILP pour les titulaires du Pass Résident.',
    },
    touristPayRule: {
      es: 'Billete sencillo al subir o Tarjeta Monedero TILP (30 % dto.) disponible en oficinas de Santa Cruz y Los Llanos.',
      ar: 'تذكرة مباشرة أو بطاقة TILP مسبقة الدفع بخصم 30٪.',
      en: 'Pay onboard or pick up a TILP Monedero smartcard (30% off) in Santa Cruz or Los Llanos.',
      fr: 'Ticket à bord ou carte Monedero TILP (-30 %) à Santa Cruz ou Los Llanos.',
    },
    bikeAndSurfRule: {
      es: 'Equipaje de senderismo, bastones plegados y tablas compactas en bodega según ocupación.',
      ar: 'تُقبل معدات المشي والأمتعة في مخزن الحافلة السفلي حسب السعة.',
      en: 'Hiking packs, folded poles, and compact surf bags travel in the luggage compartment.',
      fr: 'Sacs de randonnée et housses compactes admis en soute.',
    },
    lines: [
      {
        code: '500',
        route: 'Santa Cruz de La Palma ↔ Los Cancajos ↔ Aeropuerto (SPC)',
        kind: 'airport',
        frequency: {
          es: 'Cada 30 min',
          ar: 'كل 30 دقيقة',
          en: 'Every 30 min',
          fr: 'Toutes les 30 min',
        },
        durationMin: 20,
        standardFareEur: 2.6,
      },
      {
        code: '300',
        route: 'Santa Cruz de La Palma ↔ El Paso ↔ Los Llanos de Aridane',
        kind: 'trunk',
        frequency: {
          es: 'Cada 30–60 min',
          ar: 'كل 30–60 دقيقة',
          en: 'Every 30–60 min',
          fr: 'Toutes les 30–60 min',
        },
        durationMin: 55,
        standardFareEur: 2.6,
      },
      {
        code: '100',
        route: 'Santa Cruz ↔ Puntallana (Nogales) ↔ Barlovento',
        kind: 'rural',
        frequency: {
          es: 'Cada 60–120 min',
          ar: 'كل 60–120 دقيقة',
          en: 'Every 60–120 min',
          fr: 'Toutes les 60–120 min',
        },
        durationMin: 70,
        standardFareEur: 2.6,
      },
      {
        code: '200',
        route: 'Santa Cruz ↔ Fuencaliente (Volcanes) ↔ Los Llanos',
        kind: 'rural',
        frequency: {
          es: 'Cada 60–120 min',
          ar: 'كل 60–120 دقيقة',
          en: 'Every 60–120 min',
          fr: 'Toutes les 60–120 min',
        },
        durationMin: 80,
        standardFareEur: 2.6,
      },
    ],
    passes: [
      {
        name: {
          es: 'Bono Residente La Palma',
          ar: 'بطاقة مقيم لا بالما',
          en: 'La Palma Resident Pass',
          fr: 'Pass Résident La Palma',
        },
        audience: 'resident',
        priceNote: {
          es: '0 € (bonificado 100 %)',
          ar: '0 € (مدعومة بالكامل)',
          en: '€0 (100% subsidized)',
          fr: '0 € (subventionné à 100 %)',
        },
        detail: {
          es: 'Cubre todas las rutas TILP incluyendo enlaces este–oeste por La Cumbre Nueva.',
          ar: 'تغطي جميع خطوط TILP بما في ذلك الربط بين شرق وغرب الجزيرة.',
          en: 'Covers all TILP lines including east–west cross-island mountain corridors.',
          fr: 'Couvre toutes les lignes TILP, y compris les liaisons est-ouest.',
        },
      },
      {
        name: {
          es: 'Tarjeta Monedero TILP',
          ar: 'بطاقة المحفظة الإلكترونية TILP',
          en: 'TILP Stored-Value Card',
          fr: 'Carte Porte-Monnaie TILP',
        },
        audience: 'tourist',
        priceNote: {
          es: 'Desde 1,50 €–1,80 € por trayecto',
          ar: 'ابتداءً من 1.50–1.80 € للرحلة',
          en: 'From €1.50–€1.80 per ride',
          fr: 'Dès 1,50 €–1,80 € par trajet',
        },
        detail: {
          es: 'Tarifa plana económica en gran parte de los saltos comarcales y enlace al puerto.',
          ar: 'تعريفة مخفضة جداً عبر مختلف بلديات الجزيرة وميناء سانتا كروز.',
          en: 'Low flat-zone fares for exploring Los Llanos, Nogales, and Fuencaliente.',
          fr: 'Tarif avantageux pour relier Los Llanos, Nogales et Fuencaliente.',
        },
      },
    ],
  },
  'la-gomera': {
    island: 'la-gomera',
    mainOperator: 'GuaguaGomera (Cabildo)',
    cardName: 'Bono Residente Gomero',
    airportConnectionSummary: {
      es: 'Línea 3 y Línea 7 enlazan el Aeropuerto de La Gomera (GMZ) y Playa de Santiago con San Sebastián y Valle Gran Rey.',
      ar: 'الخطان 3 و7 يربطان مطار لا غوميرا وبلايا دي سانتياغو مع سان سيباستيان وفالي غران ري.',
      en: 'Routes 3 and 7 link La Gomera Airport (GMZ) and Playa de Santiago with San Sebastián and Valle Gran Rey.',
      fr: 'Lignes 3 et 7 reliant l’aéroport (GMZ) et Playa de Santiago à San Sebastián et Valle Gran Rey.',
    },
    residentPassRule: {
      es: 'Gratuidad para residentes con Bono Gomero emitido por el Cabildo Insular.',
      ar: 'تنقل مجاني للمقيمين عبر بطاقة غوميرا الصادرة عن مجلس الجزيرة.',
      en: 'Free travel for residents holding the Cabildo’s Gomera Resident Pass.',
      fr: 'Gratuité pour les résidents titulaires du Pass Gomero du Cabildo.',
    },
    touristPayRule: {
      es: 'Pago directo al conductor con tarifas ajustadas por distancia (2 €–5 € según destino).',
      ar: 'دفع مباشر للسائق بتعريفة تتراوح بين 2 € و5 € حسب المسافة.',
      en: 'Simple pay-onboard fares (€2–€5 depending on cross-island distance).',
      fr: 'Paiement direct au conducteur (2 €–5 € selon la distance).',
    },
    bikeAndSurfRule: {
      es: 'Equipaje de montaña y tablas de surf compactas en maletero; horarios coordinados con la llegada de ferris en San Sebastián.',
      ar: 'تنسيق مواعيد الحافلات مع وصول العبّارات في ميناء سان سيباستيان وقبول الأمتعة في المخزن.',
      en: 'Buses coordinate closely with ferry arrivals in San Sebastián; boards and backpacks fit in luggage bays.',
      fr: 'Horaires coordonnés avec les arrivées de ferry à San Sebastián ; bagages admis en soute.',
    },
    lines: [
      {
        code: 'L1',
        route: 'San Sebastián (Puerto) ↔ Garajonay (Degollada de Peraza) ↔ Valle Gran Rey',
        kind: 'trunk',
        frequency: {
          es: '4–5 salidas/día',
          ar: '4–5 رحلات يومياً',
          en: '4–5 departures/day',
          fr: '4–5 départs/jour',
        },
        durationMin: 75,
        standardFareEur: 5.0,
      },
      {
        code: 'L3',
        route: 'San Sebastián ↔ Alajeró ↔ Aeropuerto (GMZ) ↔ Playa de Santiago',
        kind: 'airport',
        frequency: {
          es: '4 salidas/día',
          ar: '4 رحلات يومياً',
          en: '4 departures/day',
          fr: '4 départs/jour',
        },
        durationMin: 50,
        standardFareEur: 3.5,
      },
      {
        code: 'L2',
        route: 'San Sebastián ↔ Hermigua ↔ Agulo ↔ Vallehermoso',
        kind: 'rural',
        frequency: {
          es: '4–5 salidas/día',
          ar: '4–5 رحلات يومياً',
          en: '4–5 departures/day',
          fr: '4–5 départs/jour',
        },
        durationMin: 60,
        standardFareEur: 4.0,
      },
    ],
    passes: [
      {
        name: {
          es: 'Bono Residente GuaguaGomera',
          ar: 'بطاقة مقيم غواغوا غوميرا',
          en: 'GuaguaGomera Resident Pass',
          fr: 'Pass Résident GuaguaGomera',
        },
        audience: 'resident',
        priceNote: {
          es: '0 € (bonificado 100 %)',
          ar: '0 € (مدعومة بالكامل)',
          en: '€0 (100% subsidized)',
          fr: '0 € (subventionné à 100 %)',
        },
        detail: {
          es: 'Incluye todas las rutas entre valles y conexión con el puerto de San Sebastián.',
          ar: 'تشمل جميع خطوط الأودية والربط مع ميناء سان سيباستيان.',
          en: 'Valid on every valley line and San Sebastián harbor transfers.',
          fr: 'Valable sur toutes les lignes de vallées et le port de San Sebastián.',
        },
      },
      {
        name: {
          es: 'Billete Coordinado Puerto – Valle',
          ar: 'تذكرة الميناء المباشرة',
          en: 'Harbor-Synced Single Fare',
          fr: 'Billet Direct Port – Vallée',
        },
        audience: 'tourist',
        priceNote: {
          es: '2,00 € – 5,00 € por trayecto',
          ar: '2.00 € – 5.00 € للرحلة',
          en: '€2.00 – €5.00 per ride',
          fr: '2,00 € – 5,00 € par trajet',
        },
        detail: {
          es: 'Paradas estratégicas en senderos de Garajonay (Pajarito / Laguna Grande) para rutas lineales.',
          ar: 'توقفات استراتيجية عند مداخل مسارات غاراخوناي للمشي الجبلي.',
          en: 'Stops directly at Garajonay trailheads (Pajarito / Laguna Grande) for one-way hikes.',
          fr: 'Arrêts aux départs de sentiers de Garajonay pour les randonnées en traversée.',
        },
      },
    ],
  },
  'el-hierro': {
    island: 'el-hierro',
    mainOperator: 'TransHierro (Guaguas Insulares)',
    cardName: 'Bono Residente Herreño',
    airportConnectionSummary: {
      es: 'Línea 10 conecta Valverde con el Puerto de La Estaca y el Aeropuerto de Los Cangrejos (VDE) enlazando vuelos y ferris.',
      ar: 'الخط 10 يربط فالفيردي بميناء لا إستاكا ومطار إل هييرو بالتزامن مع الرحلات.',
      en: 'Line 10 connects Valverde with Puerto de La Estaca ferry dock and El Hierro Airport (VDE).',
      fr: 'Ligne 10 reliant Valverde au port de La Estaca et à l’aéroport (VDE) en correspondance.',
    },
    residentPassRule: {
      es: 'Gratuidad para residentes empadronados mediante el Bono Insular de TransHierro.',
      ar: 'مجاني للمقيمين عبر البطاقة الجزرية في TransHierro.',
      en: 'Free island bus rides for registered residents via TransHierro Resident Pass.',
      fr: 'Gratuité pour les résidents inscrits avec le Pass TransHierro.',
    },
    touristPayRule: {
      es: 'Tarifa plana económica (1,35 € por viaje) en toda la red de guaguas regulares.',
      ar: 'تعريفة موحدة اقتصادية (1.35 € للرحلة) في كافة خطوط الحافلات.',
      en: 'Single flat fare of roughly €1.35 per journey across all island routes.',
      fr: 'Tarif unique très accessible (1,35 € par trajet) sur toute l’île.',
    },
    bikeAndSurfRule: {
      es: 'Equipaje de buceo, senderismo y tablas compactas admitidos sin recargo en las guaguas hacia La Restinga y Frontera.',
      ar: 'تُقبل معدات الغوص والمشي دون رسوم إضافية على خطوط لا ريستينغا وفرونتيرا.',
      en: 'Dive gear, packs, and compact surf bags ride at no extra fee toward La Restinga and El Golfo.',
      fr: 'Matériel de plongée et randonnée accepté sans supplément vers La Restinga et Frontera.',
    },
    lines: [
      {
        code: '10',
        route: 'Valverde ↔ Aeropuerto (VDE) ↔ Puerto de La Estaca',
        kind: 'airport',
        frequency: {
          es: 'Según vuelos y ferris',
          ar: 'وفق مواعيد الطيران والعبّارات',
          en: 'Synced to flights & ferries',
          fr: 'Selon vols et ferries',
        },
        durationMin: 18,
        standardFareEur: 1.35,
      },
      {
        code: '03',
        route: 'Valverde ↔ Tigaday (Frontera / El Golfo) ↔ Sabinosa',
        kind: 'trunk',
        frequency: {
          es: 'Cada 60–90 min',
          ar: 'كل 60–90 دقيقة',
          en: 'Every 60–90 min',
          fr: 'Toutes les 60–90 min',
        },
        durationMin: 35,
        standardFareEur: 1.35,
      },
      {
        code: '05',
        route: 'Valverde ↔ El Pinar ↔ La Restinga (Reserva Marina)',
        kind: 'rural',
        frequency: {
          es: '4–5 salidas/día',
          ar: '4–5 رحلات يومياً',
          en: '4–5 departures/day',
          fr: '4–5 départs/jour',
        },
        durationMin: 50,
        standardFareEur: 1.35,
      },
    ],
    passes: [
      {
        name: {
          es: 'Bono Residente TransHierro',
          ar: 'بطاقة مقيم إل هييرو',
          en: 'TransHierro Resident Pass',
          fr: 'Pass Résident TransHierro',
        },
        audience: 'resident',
        priceNote: {
          es: '0 € (bonificado 100 %)',
          ar: '0 € (مدعومة بالكامل)',
          en: '€0 (100% subsidized)',
          fr: '0 € (subventionné à 100 %)',
        },
        detail: {
          es: 'Cubre todos los trayectos entre Valverde, El Golfo y La Restinga.',
          ar: 'تغطي جميع الرحلات بين فالفيردي وإل غولفو ولا ريستينغا.',
          en: 'Covers all regular services linking Valverde, El Golfo, and La Restinga.',
          fr: 'Couvre toutes les liaisons entre Valverde, El Golfo et La Restinga.',
        },
      },
      {
        name: {
          es: 'Billete Sencillo Tarifa Única',
          ar: 'تذكرة موحدة اقتصادية',
          en: 'Island Flat-Rate Ticket',
          fr: 'Billet à Tarif Unique',
        },
        audience: 'tourist',
        priceNote: {
          es: '1,35 € por trayecto',
          ar: '1.35 € للرحلة',
          en: '€1.35 per journey',
          fr: '1,35 € par trajet',
        },
        detail: {
          es: 'La tarifa regular más económica del archipiélago para moverse sin coche.',
          ar: 'أوفر تعريفة نقل عام في جزر الكناري للتجول دون سيارة.',
          en: 'One of the most affordable flat-rate island bus networks in the Canaries.',
          fr: 'L’un des tarifs de bus les plus bas de l’archipel pour voyager sans voiture.',
        },
      },
    ],
  },
  'la-graciosa': {
    island: 'la-graciosa',
    mainOperator: 'Líneas Romero & Biosfera Express',
    secondaryOperator: 'Taxis 4x4 autorizados & Alquiler Bici',
    cardName: 'Descuento Residente 75 % Marítimo',
    airportConnectionSummary: {
      es: 'Sin aeropuerto propio: llegada vía Lanzarote (ACE) + guagua línea 09 o traslado a Órzola y ferry de 25 minutos a Caleta de Sebo.',
      ar: 'لا يوجد مطار في الجزيرة: الوصول عبر مطار لانزاروت ثم التوجه إلى ميناء أورزولا وعبارة 25 دقيقة إلى كاليتا دي سيبو.',
      en: 'No airport on island: fly into Lanzarote (ACE), connect north to Órzola harbor, and ride a 25-min ferry to Caleta de Sebo.',
      fr: 'Sans aéroport : arrivée à Lanzarote (ACE), liaison vers le port d’Órzola puis traversée en ferry de 25 min vers Caleta de Sebo.',
    },
    residentPassRule: {
      es: '75 % de descuento automático en el ferry Órzola ↔ Caleta de Sebo con certificado de residencia o DNI.',
      ar: 'خصم 75٪ تلقائياً على عبّارة أورزولا – كاليتا دي سيبو للمقيمين في الكناري.',
      en: 'Automatic 75% Canary resident subsidy on Órzola ↔ Caleta de Sebo ferries.',
      fr: 'Réduction automatique de 75 % pour les résidents sur les ferries Órzola ↔ Caleta de Sebo.',
    },
    touristPayRule: {
      es: 'Sin líneas de guagua ni carreteras asfaltadas: movilidad a pie, en bicicleta de montaña o taxi 4x4 regulado desde Caleta de Sebo.',
      ar: 'لا توجد حافلات أو طرق معبدة: التنقل سيراً على الأقدام أو بالدراجة الجبلية أو بسيارات الدفع الرباعي المرخصة.',
      en: 'No public buses or paved roads: explore on foot, mountain bike, or regulated 4x4 jeep taxis from Caleta de Sebo.',
      fr: 'Ni bus ni routes goudronnées : déplacements à pied, à VTT ou en taxi 4x4 agréé depuis Caleta de Sebo.',
    },
    bikeAndSurfRule: {
      es: 'Bicicletas y tablas de surf embarcan gratis o con pequeño suplemento en el ferry Órzola–Caleta de Sebo; en la isla solo pista de arena.',
      ar: 'تُنقل الدراجات وألواح السيرف على متن العبّارة من أورزولا، وتُستخدم داخل الجزيرة على مسارات رملية.',
      en: 'Bikes and surfboards board the Órzola–Caleta de Sebo ferry; sandy island tracks suit wide-tire MTBs.',
      fr: 'Vélos et planches embarquent sur le ferry d’Órzola ; pistes sableuses idéales pour les VTT à pneus larges.',
    },
    lines: [
      {
        code: 'FERRY',
        route: 'Órzola (Lanzarote) ↔ Caleta de Sebo (La Graciosa)',
        kind: 'maritime',
        frequency: {
          es: 'Cada 30–60 min',
          ar: 'كل 30–60 دقيقة',
          en: 'Every 30–60 min',
          fr: 'Toutes les 30–60 min',
        },
        durationMin: 25,
        standardFareEur: 15.0,
      },
      {
        code: '4x4',
        route: 'Caleta de Sebo ↔ Playa de las Conchas / Pedro Barba',
        kind: 'rural',
        frequency: {
          es: 'Bajo demanda en puerto',
          ar: 'حسب الطلب في الميناء',
          en: 'On-demand at harbor',
          fr: 'À la demande au port',
        },
        durationMin: 20,
        standardFareEur: 25.0,
      },
    ],
    passes: [
      {
        name: {
          es: 'Tarifa Residente Ferry (Ida y Vuelta)',
          ar: 'تعريفة المقيمين للعبّارة (ذهاب وعودة)',
          en: 'Resident Ferry Return (-75%)',
          fr: 'Tarif Résident Ferry A/R (-75 %)',
        },
        audience: 'resident',
        priceNote: {
          es: '~3,75 € / trayecto (7 €–8 € I/V)',
          ar: 'حوالي 3.75 € للرحلة الواحدة',
          en: '~€3.75 each way (€7–€8 return)',
          fr: '~3,75 € par trajet (7 €–8 € A/R)',
        },
        detail: {
          es: 'Imprescindible presentar DNI/NIE + certificado de viaje SARA en taquilla o web.',
          ar: 'يشترط تقديم الهوية وشهادة الإقامة عند الحجز أو في الميناء.',
          en: 'Bring ID + Canary residency travel certificate at checkout or harbor desk.',
          fr: 'Pièce d’identité et justificatif de résidence requis lors de la réservation.',
        },
      },
      {
        name: {
          es: 'Alquiler Bici MTB + Ferry Diario',
          ar: 'تذكرة العبّارة + استئجار دراجة جبلية',
          en: 'Day Ferry + MTB Rental',
          fr: 'Ferry Journée + Location VTT',
        },
        audience: 'tourist',
        priceNote: {
          es: 'Ferry 28 € I/V + Bici ~12 €–18 €/día',
          ar: 'العبّارة 28 € ذهاباً وإياباً + الدراجة ~12–18 €',
          en: 'Ferry €28 return + MTB ~€12–€18/day',
          fr: 'Ferry 28 € A/R + VTT ~12 €–18 €/jour',
        },
        detail: {
          es: 'La forma sostenible y más ágil de llegar a Playa de las Conchas o Montaña Amarilla.',
          ar: 'الوسيلة الأفضل وصديقة البيئة للوصول إلى شاطئ لاس كونتشاس.',
          en: 'Zero-emission way to reach Playa de las Conchas and Montaña Amarilla across sandy tracks.',
          fr: 'Le moyen le plus fluide et durable pour rejoindre Playa de las Conchas.',
        },
      },
    ],
  },
};

export interface TransportHubStrings {
  sectionKicker: string;
  heading: string;
  subheading: string;
  islandSelectorLabel: string;
  operatorLabel: string;
  cardLabel: string;
  airportHubLabel: string;
  tabLines: string;
  tabPasses: string;
  tabInterIsland: string;
  lineKindLabels: Record<TransportLineItem['kind'], string>;
  minutesUnit: string;
  singleFareLabel: string;
  residentRulesTitle: string;
  touristRulesTitle: string;
  bikeSurfTitle: string;
  estimator: {
    heading: string;
    subtitle: string;
    tripsPerWeekLabel: string;
    airportTransfersLabel: string;
    singleCostLabel: string;
    recommendedOptionLabel: string;
    residentFreeResult: string;
    residentSavingsNote: string;
    touristPassHint: string;
    touristSingleHint: string;
  };
}

export const TRANSPORT_STRINGS: Record<Language, TransportHubStrings> = {
  es: {
    sectionKicker: 'Movilidad Insular e Interinsular · 8 Islas',
    heading: 'Red de Transporte Público, Aeropuertos y Ferris',
    subheading:
      'Consulta operadores de guaguas y tranvía, traslados desde cada aeropuerto, tarjetas de residente y conexiones marítimas o aéreas entre islas.',
    islandSelectorLabel: 'Red insular activa',
    operatorLabel: 'Operador principal',
    cardLabel: 'Tarjeta / Bono',
    airportHubLabel: 'Enlace aeropuerto y puertos',
    tabLines: 'Líneas clave y aeropuerto',
    tabPasses: 'Tarjetas, normas y calculador de abono',
    tabInterIsland: 'Ferris y vuelos entre islas (-75 %)',
    lineKindLabels: {
      airport: 'Aeropuerto',
      trunk: 'Troncal',
      tram: 'Tranvía',
      rural: 'Costa / Cumbre',
      maritime: 'Marítimo',
    },
    minutesUnit: 'min',
    singleFareLabel: 'Billete sencillo ref.',
    residentRulesTitle: 'Ventaja Residente',
    touristRulesTitle: 'Pago y uso para Turistas',
    bikeSurfTitle: 'Bicicletas y tablas de surf',
    estimator: {
      heading: 'Estimador mensual / semanal de abono insular',
      subtitle:
        'Compara el gasto estimado en billete sencillo frente a tarjeta recargable o Bono Residente según tu volumen de desplazamientos.',
      tripsPerWeekLabel: 'Trayectos urbanos o interurbanos (4 semanas / estancia)',
      airportTransfersLabel: 'Idas/vueltas al aeropuerto',
      singleCostLabel: 'Coste estimado sin abono',
      recommendedOptionLabel: 'Opción recomendada',
      residentFreeResult: '0 € con Bono Residente activo (ahorras el 100 %)',
      residentSavingsNote: 'Recuerda validar la tarjeta en cada subida para mantener la gratuidad mensual.',
      touristPassHint: 'Te conviene activar un bono multi-viaje o pase turístico ilimitado de la isla.',
      touristSingleHint: 'Para pocos trayectos te resulta más práctico el pago contactless directo o billete sencillo.',
    },
  },
  ar: {
    sectionKicker: 'النقل العام والتنقل بين الجزر الثماني',
    heading: 'شبكة النقل العام والمطارات والعبّارات',
    subheading:
      'تعرّف على شركات الحافلات والترام في كل جزيرة، خطوط المطار، بطاقات المقيمين، وحاسبة الرحلات بين الجزر بخصم 75٪.',
    islandSelectorLabel: 'شبكة الجزيرة المختارة',
    operatorLabel: 'المشغل الرئيسي',
    cardLabel: 'البطاقة / الاشتراك',
    airportHubLabel: 'الوصول للمطار والموانئ',
    tabLines: 'الخطوط الرئيسية والمطار',
    tabPasses: 'البطاقات والقواعد وحاسبة التوفير',
    tabInterIsland: 'العبّارات والطيران بين الجزر (-75٪)',
    lineKindLabels: {
      airport: 'مطار',
      trunk: 'خط رئيسي',
      tram: 'ترام',
      rural: 'ساحلي / جبلي',
      maritime: 'بحري',
    },
    minutesUnit: 'دقيقة',
    singleFareLabel: 'سعر التذكرة المفردة',
    residentRulesTitle: 'امتيازات المقيم',
    touristRulesTitle: 'الدفع واستخدام السائح',
    bikeSurfTitle: 'الدراجات وألواح السيرف',
    estimator: {
      heading: 'مُقدّر تكلفة التنقل وبطاقات التوفير',
      subtitle:
        'قارن تكلفة التذاكر الفردية مقابل بطاقات الشحن أو بطاقة المقيم حسب عدد رحلاتك.',
      tripsPerWeekLabel: 'عدد الرحلات خلال الفترة',
      airportTransfersLabel: 'رحلات المطار',
      singleCostLabel: 'التكلفة التقديرية دون اشتراك',
      recommendedOptionLabel: 'الخيار الأنسب لك',
      residentFreeResult: '0 € عبر بطاقة المقيم النشطة (توفير كامل)',
      residentSavingsNote: 'احرص على تمرير البطاقة عند كل صعود للحفاظ على مجانية الاشتراك الشهري.',
      touristPassHint: 'يُنصح بالحصول على بطاقة متعددة الرحلات أو بطاقة سياحية للجزيرة.',
      touristSingleHint: 'لعدد قليل من الرحلات يكفي الدفع اللاتلامسي بالبطاقة أو التذكرة المفردة.',
    },
  },
  en: {
    sectionKicker: 'Island & Inter-Island Mobility · 8 Islands',
    heading: 'Public Buses, Tram, Airport Transfers & Ferries',
    subheading:
      'Explore bus and tram networks, airport express lines, resident/tourist travel cards, and the 75% inter-island ferry & flight fare estimator.',
    islandSelectorLabel: 'Active island network',
    operatorLabel: 'Main operator',
    cardLabel: 'Transit card / pass',
    airportHubLabel: 'Airport & harbor links',
    tabLines: 'Key lines & airport links',
    tabPasses: 'Cards, rules & pass estimator',
    tabInterIsland: 'Inter-island ferries & flights (-75%)',
    lineKindLabels: {
      airport: 'Airport',
      trunk: 'Trunk line',
      tram: 'Tram',
      rural: 'Coast / Mountain',
      maritime: 'Maritime',
    },
    minutesUnit: 'min',
    singleFareLabel: 'Ref. single fare',
    residentRulesTitle: 'Resident benefit',
    touristRulesTitle: 'Visitor payment & passes',
    bikeSurfTitle: 'Bikes & surfboards',
    estimator: {
      heading: 'Island Transit Pass Estimator',
      subtitle:
        'Compare pay-as-you-go single fares against stored-value cards or the Canary Resident Pass based on your planned rides.',
      tripsPerWeekLabel: 'Planned bus / tram rides',
      airportTransfersLabel: 'Airport trips',
      singleCostLabel: 'Estimated single-ticket cost',
      recommendedOptionLabel: 'Best value option',
      residentFreeResult: '€0 with active Canary Resident Pass (100% covered)',
      residentSavingsNote: 'Tap your personalized card on every boarding to maintain monthly subsidy eligibility.',
      touristPassHint: 'A multi-ride smartcard or unlimited island tourist pass will save you money here.',
      touristSingleHint: 'For just a few rides, contactless bank-card tap or single tickets keep things simple.',
    },
  },
  fr: {
    sectionKicker: 'Mobilité Insulaire & Inter-Îles · 8 Îles',
    heading: 'Transports Publics, Aéroports & Ferries',
    subheading:
      'Consultez les réseaux de bus et tramway, navettes aéroport, cartes résident ou visiteur et tarifs inter-îles avec remise de 75 %.',
    islandSelectorLabel: 'Réseau insulaire actif',
    operatorLabel: 'Opérateur principal',
    cardLabel: 'Carte / Pass',
    airportHubLabel: 'Liaisons aéroport & ports',
    tabLines: 'Lignes clés & aéroport',
    tabPasses: 'Cartes, règles & estimateur',
    tabInterIsland: 'Ferries & vols inter-îles (-75 %)',
    lineKindLabels: {
      airport: 'Aéroport',
      trunk: 'Ligne majeure',
      tram: 'Tramway',
      rural: 'Côte / Sommet',
      maritime: 'Maritime',
    },
    minutesUnit: 'min',
    singleFareLabel: 'Tarif unitaire réf.',
    residentRulesTitle: 'Avantage Résident',
    touristRulesTitle: 'Paiement & pass Visiteur',
    bikeSurfTitle: 'Vélos & planches de surf',
    estimator: {
      heading: 'Estimateur d’abonnement insulaire',
      subtitle:
        'Comparez le coût des billets unitaires face aux cartes rechargeables ou au Pass Résident selon votre nombre de trajets.',
      tripsPerWeekLabel: 'Nombre de trajets en bus / tram',
      airportTransfersLabel: 'Trajets aéroport',
      singleCostLabel: 'Coût estimé sans abonnement',
      recommendedOptionLabel: 'Option recommandée',
      residentFreeResult: '0 € avec le Pass Résident actif (100 % couvert)',
      residentSavingsNote: 'Validez votre carte à chaque montée pour conserver la gratuité mensuelle.',
      touristPassHint: 'Une carte multi-trajets ou un pass touriste illimité est plus avantageux pour ce volume.',
      touristSingleHint: 'Pour quelques trajets seulement, le paiement sans contact à bord suffit.',
    },
  },
};
