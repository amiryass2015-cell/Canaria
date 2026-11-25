import { Language } from '../types/canarias';

export interface UIStrings {
  brand: string;
  nav: {
    islands: string;
    services: string;
    transport: string;
    routes: string;
    agenda: string;
    saved: string;
  };
  languages: Record<Language, { native: string; code: string }>;
  audience: {
    label: string;
    resident: string;
    tourist: string;
    residentDesc: string;
    touristDesc: string;
  };
  hero: {
    kicker: string;
    titleResident: string;
    titleTourist: string;
    subtitleResident: string;
    subtitleTourist: string;
    primaryCta: string;
    imageCaption: string;
  };
  metrics: {
    islandsLabel: string;
    islandsValue: string;
    subsidyLabel: string;
    subsidyValue: string;
    languagesLabel: string;
    languagesValue: string;
    climateLabel: string;
    climateValue: string;
  };
  islandsSection: {
    heading: string;
    subheading: string;
    selectIslandHint: string;
    capital: string;
    population: string;
    area: string;
    peak: string;
    climate: string;
    microclimateTitle: string;
    coastLabel: string;
    summitLabel: string;
    seaLabel: string;
    uvLabel: string;
    residentEssentials: string;
    touristEssentials: string;
    transportConnections: string;
    saveIsland: string;
    savedIsland: string;
    viewRoutesForIsland: string;
  };
  calculator: {
    heading: string;
    subheading: string;
    origin: string;
    destination: string;
    passengerType: string;
    residentDiscountNote: string;
    standardFareNote: string;
    estimatedFare: string;
    durationLabel: string;
    operatorLabel: string;
    sameIslandHint: string;
    minutesUnit: string;
    ferryLabel: string;
    flightLabel: string;
    swapAction: string;
  };
  servicesSection: {
    headingResident: string;
    headingTourist: string;
    subheadingResident: string;
    subheadingTourist: string;
    searchPlaceholder: string;
    allCategories: string;
    categories: {
      mobility: string;
      civic: string;
      health: string;
      nature: string;
      culture: string;
    };
    openDetails: string;
    emptyState: string;
    resetFilters: string;
    utilitiesBannerTitle: string;
    utilitiesBannerDesc: string;
    openPhrasebookBtn: string;
  };
  routesSection: {
    heading: string;
    subheading: string;
    tabRoutes: string;
    tabBeaches: string;
    tabSurf: string;
    allIslands: string;
    allTypes: string;
    types: {
      volcanic: string;
      coastal: string;
      forest: string;
      heritage: string;
    };
    beachKinds: {
      all: string;
      beach: string;
      'natural-pool': string;
      cove: string;
    };
    swellRisk: {
      calm: string;
      moderate: string;
      caution: string;
    };
    busYes: string;
    busNo: string;
    difficulty: {
      easy: string;
      moderate: string;
      challenging: string;
    };
    saveAction: string;
    savedAction: string;
    viewGuide: string;
    emptyState: string;
  };
  agendaSection: {
    heading: string;
    subheading: string;
    filterAll: string;
    filterEvents: string;
    filterNotices: string;
    eventLabel: string;
    noticeLabel: string;
    saveAction: string;
    savedAction: string;
  };
  drawer: {
    close: string;
    requirementsTitle: string;
    validityLabel: string;
    feeLabel: string;
    portalLabel: string;
    highlightsTitle: string;
    beachServicesTitle: string;
    lifeguardLabel: string;
    swellLabel: string;
    transitLabel: string;
    residentTipTitle: string;
    touristTipTitle: string;
    savedTitle: string;
    savedEmpty: string;
    checklistTitle: string;
    checklistPlaceholder: string;
    checklistAdd: string;
    clearAll: string;
    copyItinerary: string;
    copiedFeedback: string;
    removeItem: string;
    typeLabels: {
      island: string;
      service: string;
      route: string;
      beach: string;
      event: string;
    };
    phrasebookTitle: string;
    phrasebookSubtitle: string;
    phonesTitle: string;
    phrasesTitle: string;
    phraseCategories: {
      all: string;
      daily: string;
      transport: string;
      emergency: string;
    };
    copyAction: string;
    listenAction: string;
  };
  newsletter: {
    heading: string;
    subheading: string;
    emailPlaceholder: string;
    islandSelect: string;
    submit: string;
    invalidEmail: string;
    successMessage: string;
  };
  footer: {
    tagline: string;
    emergencyLabel: string;
    emergencyNumber: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<Language, UIStrings> = {
  es: {
    brand: 'MI CANARIAS',
    nav: {
      islands: 'Islas',
      services: 'Servicios',
      transport: 'Transporte',
      routes: 'Rutas y Costas',
      agenda: 'Agenda',
      saved: 'Mi Guía',
    },
    languages: {
      es: { native: 'Español', code: 'ES' },
      ar: { native: 'العربية', code: 'AR' },
      en: { native: 'English', code: 'EN' },
      fr: { native: 'Français', code: 'FR' },
    },
    audience: {
      label: 'Perfil activo',
      resident: 'Residente',
      tourist: 'Turista',
      residentDesc: 'Trámites, transporte con bonificación del 75 % y avisos locales.',
      touristDesc: 'Rutas, playas, permisos naturales, ferris y agenda cultural.',
    },
    hero: {
      kicker: 'Archipiélago Canario · Plataforma Unificada',
      titleResident: 'Tu vida diaria y tus gestiones en las ocho islas',
      titleTourist: 'Descubre las ocho Islas Canarias sin intermediarios',
      subtitleResident:
        'Consulta conexiones interinsulares con descuento de residente, trámites de cabildos, salud, playas y alertas meteorológicas en un solo lugar.',
      subtitleTourist:
        'Planifica travesías en ferry, solicita permisos oficiales para parques nacionales y recorre senderos, playas y charcos con información verificada.',
      primaryCta: 'Explorar las 8 islas',
      imageCaption: 'Acantilados de Los Gigantes y el Teide al atardecer · Tenerife',
    },
    metrics: {
      islandsLabel: 'Islas habitadas',
      islandsValue: '8 Islas',
      subsidyLabel: 'Bonificación transporte residente',
      subsidyValue: '75 %',
      languagesLabel: 'Idiomas en plataforma',
      languagesValue: '4 Idiomas',
      climateLabel: 'Temperatura media costera',
      climateValue: '24 °C',
    },
    islandsSection: {
      heading: 'Explora el archipiélago isla a isla',
      subheading: 'Selecciona una isla en el mapa o en la lista para consultar microclima, datos, conexiones y recomendaciones.',
      selectIslandHint: 'Mapa interactivo del archipiélago',
      capital: 'Capital',
      population: 'Población',
      area: 'Superficie',
      peak: 'Altitud máxima',
      climate: 'Clima medio',
      microclimateTitle: 'Microclima y mar de referencia',
      coastLabel: 'Costa',
      summitLabel: 'Cumbre',
      seaLabel: 'Mar',
      uvLabel: 'Índice UV',
      residentEssentials: 'Claves para residentes',
      touristEssentials: 'Imprescindibles para visitantes',
      transportConnections: 'Puertos y aeropuertos',
      saveIsland: 'Guardar isla',
      savedIsland: 'Isla guardada',
      viewRoutesForIsland: 'Ver rutas y playas',
    },
    calculator: {
      heading: 'Calculador de conexión interinsular',
      subheading: 'Estima tiempos y tarifas entre islas aplicando automáticamente la bonificación del 75 % para residentes.',
      origin: 'Isla de origen',
      destination: 'Isla de destino',
      passengerType: 'Tarifa aplicable',
      residentDiscountNote: 'Bonificación estatal y autonómica del 75 % aplicada',
      standardFareNote: 'Tarifa general para visitantes y no residentes',
      estimatedFare: 'Tarifa estimada (solo ida)',
      durationLabel: 'Duración media',
      operatorLabel: 'Conexión habitual',
      sameIslandHint: 'Selecciona dos islas distintas para calcular la travesía.',
      minutesUnit: 'min',
      ferryLabel: 'Ferry rápido',
      flightLabel: 'Vuelo regional',
      swapAction: 'Invertir trayecto',
    },
    servicesSection: {
      headingResident: 'Servicios y trámites para residentes',
      headingTourist: 'Servicios esenciales para tu viaje',
      subheadingResident: 'Acceso directo a bonos de transporte, sanidad, empleo, cabildos y prevención meteorológica.',
      subheadingTourist: 'Permisos obligatorios, pases culturales, movilidad sostenible y asistencia multilingüe.',
      searchPlaceholder: 'Buscar trámite, permiso o servicio...',
      allCategories: 'Todos',
      categories: {
        mobility: 'Movilidad',
        civic: 'Trámites',
        health: 'Salud y 112',
        nature: 'Naturaleza',
        culture: 'Cultura',
      },
      openDetails: 'Consultar ficha',
      emptyState: 'No hay servicios que coincidan con tu búsqueda actual.',
      resetFilters: 'Restablecer filtros',
      utilitiesBannerTitle: 'Teléfonos útiles de Canarias y guía rápida en 4 idiomas',
      utilitiesBannerDesc: 'Consulta 112, 012, Salvamento Marítimo y frases prácticas en español, árabe, inglés y francés.',
      openPhrasebookBtn: 'Abrir teléfonos y frases',
    },
    routesSection: {
      heading: 'Rutas, playas y charcos naturales',
      subheading: 'Alterna entre senderos oficiales y zonas de baño destacadas en las ocho islas.',
      tabRoutes: 'Senderos y Patrimonio',
      tabBeaches: 'Playas y Charcos',
      tabSurf: 'Calculador Surf',
      allIslands: 'Todas las islas',
      allTypes: 'Todos los paisajes',
      types: {
        volcanic: 'Volcánico',
        coastal: 'Costa',
        forest: 'Laurisilva',
        heritage: 'Patrimonio',
      },
      beachKinds: {
        all: 'Todos los entornos',
        beach: 'Playa',
        'natural-pool': 'Charco natural',
        cove: 'Cala',
      },
      swellRisk: {
        calm: 'Aguas tranquilas',
        moderate: 'Oleaje moderado',
        caution: 'Precaución por mar abierto',
      },
      busYes: 'Acceso en guagua',
      busNo: 'Acceso privado / a pie',
      difficulty: {
        easy: 'Fácil',
        moderate: 'Moderada',
        challenging: 'Exigente',
      },
      saveAction: 'Guardar',
      savedAction: 'Guardada',
      viewGuide: 'Ver detalle',
      emptyState: 'Ningún elemento coincide con los filtros seleccionados.',
    },
    agendaSection: {
      heading: 'Agenda insular y avisos activos',
      subheading: 'Citas culturales, mercados locales y avisos de seguridad o senderos en todo el archipiélago.',
      filterAll: 'Todo',
      filterEvents: 'Eventos',
      filterNotices: 'Avisos',
      eventLabel: 'Agenda cultural',
      noticeLabel: 'Aviso operativo',
      saveAction: 'Guardar fecha',
      savedAction: 'Guardada',
    },
    drawer: {
      close: 'Cerrar',
      requirementsTitle: 'Qué necesitas',
      validityLabel: 'Horario / Validez',
      feeLabel: 'Coste estimado',
      portalLabel: 'Organismo / Canal',
      highlightsTitle: 'Puntos clave del recorrido',
      beachServicesTitle: 'Equipamiento y recomendaciones',
      lifeguardLabel: 'Socorrismo',
      swellLabel: 'Estado habitual del mar',
      transitLabel: 'Acceso en transporte público',
      residentTipTitle: 'Nota para residentes',
      touristTipTitle: 'Recomendación para visitantes',
      savedTitle: 'Mi Guía de Canarias',
      savedEmpty: 'Aún no has guardado islas, rutas, playas, servicios ni eventos. Marca cualquier elemento para crear tu plan.',
      checklistTitle: 'Lista de preparativos y tareas',
      checklistPlaceholder: 'Ej.: Solicitar permiso Teide o llevar DNI...',
      checklistAdd: 'Añadir',
      clearAll: 'Vaciar guía',
      copyItinerary: 'Copiar resumen',
      copiedFeedback: 'Resumen copiado al portapapeles',
      removeItem: 'Quitar',
      typeLabels: {
        island: 'Isla',
        service: 'Servicio',
        route: 'Ruta',
        beach: 'Playa / Charco',
        event: 'Agenda',
      },
      phrasebookTitle: 'Teléfonos útiles y guía de frases (4 idiomas)',
      phrasebookSubtitle: 'Números oficiales del archipiélago y expresiones cotidianas en español, árabe, inglés y francés.',
      phonesTitle: 'Teléfonos de atención y emergencias',
      phrasesTitle: 'Frases útiles multilingües',
      phraseCategories: {
        all: 'Todas',
        daily: 'Día a día',
        transport: 'Transporte',
        emergency: 'Urgencias',
      },
      copyAction: 'Copiar',
      listenAction: 'Escuchar',
    },
    newsletter: {
      heading: 'Boletín de avisos y agenda insular',
      subheading: 'Recibe alertas de calima, apertura de senderos y programación cultural semanal de tu isla.',
      emailPlaceholder: 'tu.correo@ejemplo.com',
      islandSelect: 'Isla principal',
      submit: 'Suscribirme',
      invalidEmail: 'Introduce una dirección de correo electrónico válida.',
      successMessage: 'Suscripción confirmada para recibir avisos semanales de la isla seleccionada.',
    },
    footer: {
      tagline: 'MI CANARIAS · Plataforma ciudadana y turística multilingüe del archipiélago.',
      emergencyLabel: 'Emergencias Canarias (ES / AR / EN / FR)',
      emergencyNumber: '112',
      copyright: '© 2026 MI CANARIAS. Información orientativa y planificación insular.',
    },
  },
  ar: {
    brand: 'MI CANARIAS',
    nav: {
      islands: 'الجزر',
      services: 'الخدمات',
      transport: 'النقل',
      routes: 'المسارات والشواطئ',
      agenda: 'الأجندة',
      saved: 'دليلي',
    },
    languages: {
      es: { native: 'Español', code: 'ES' },
      ar: { native: 'العربية', code: 'AR' },
      en: { native: 'English', code: 'EN' },
      fr: { native: 'Français', code: 'FR' },
    },
    audience: {
      label: 'وضع التصفح',
      resident: 'مقيم',
      tourist: 'سائح',
      residentDesc: 'الإجراءات الإدارية، النقل بخصم 75٪ والتنبيهات المحلية.',
      touristDesc: 'المسارات، الشواطئ، تصاريح المحميات، العبّارات والفعاليات.',
    },
    hero: {
      kicker: 'أرخبيل الكناري · منصة موحدة',
      titleResident: 'حياتك اليومية وخدماتك عبر الجزر الثماني',
      titleTourist: 'اكتشف جزر الكناري الثماني بمعلومات موثوقة',
      subtitleResident:
        'استعرض رحلات التنقل بين الجزر بخصم المقيمين، معاملات المجالس المحلية، المواعيد الصحية، الشواطئ والتنبيهات الجوية.',
      subtitleTourist:
        'خطط لرحلات العبّارة، احصل على تصاريح المنتزهات الوطنية واستكشف المسارات البركانية والشواطئ والبرك الطبيعية.',
      primaryCta: 'استكشف الجزر الثماني',
      imageCaption: 'منحدرات لوس خيغانتيس وقمة تيد عند الغروب · تينيريفي',
    },
    metrics: {
      islandsLabel: 'جزر مأهولة',
      islandsValue: '8 جزر',
      subsidyLabel: 'خصم النقل للمقيمين',
      subsidyValue: '75 ٪',
      languagesLabel: 'لغات المنصة',
      languagesValue: '4 لغات',
      climateLabel: 'متوسط الحرارة الساحلية',
      climateValue: '24 °C',
    },
    islandsSection: {
      heading: 'تصفح الأرخبيل جزيرة بجزيرة',
      subheading: 'اختر جزيرة من الخريطة أو القائمة للاطلاع على المناخ الدقيق وروابط النقل والتوصيات.',
      selectIslandHint: 'خريطة تفاعلية للأرخبيل',
      capital: 'العاصمة',
      population: 'السكان',
      area: 'المساحة',
      peak: 'أعلى قمة',
      climate: 'المناخ المتوسط',
      microclimateTitle: 'المناخ المحلي وحالة البحر',
      coastLabel: 'الساحل',
      summitLabel: 'القمة',
      seaLabel: 'البحر',
      uvLabel: 'الأشعة UV',
      residentEssentials: 'أولويات المقيمين',
      touristEssentials: 'أبرز معالم الزوار',
      transportConnections: 'الموانئ والمطارات',
      saveIsland: 'حفظ الجزيرة',
      savedIsland: 'تم حفظ الجزيرة',
      viewRoutesForIsland: 'عرض مسارات وشواطئ الجزيرة',
    },
    calculator: {
      heading: 'حاسبة التنقل بين الجزر',
      subheading: 'احسب مدة الرحلة والتكلفة التقديرية بين أي جزيرتين مع تطبيق خصم 75٪ للمقيمين تلقائياً.',
      origin: 'جزيرة المغادرة',
      destination: 'جزيرة الوصول',
      passengerType: 'فئة التذكرة',
      residentDiscountNote: 'يشمل دعم المقيمين في جزر الكناري بنسبة 75٪',
      standardFareNote: 'التعرفة العامة للزوار وغير المقيمين',
      estimatedFare: 'التكلفة التقديرية (اتجاه واحد)',
      durationLabel: 'المدة المتوسطة',
      operatorLabel: 'وسيلة الربط المعتادة',
      sameIslandHint: 'يرجى اختيار جزيرتين مختلفتين لحساب المسار.',
      minutesUnit: 'دقيقة',
      ferryLabel: 'عبّارة سريعة',
      flightLabel: 'رحلة جوية إقليمية',
      swapAction: 'عكس المسار',
    },
    servicesSection: {
      headingResident: 'الخدمات والمعاملات للمقيمين',
      headingTourist: 'الخدمات الأساسية لرحلتك',
      subheadingResident: 'وصول مباشر إلى بطاقات النقل، الرعاية الصحية، التوظيف، البلديات وتنبيهات الطقس.',
      subheadingTourist: 'التصاريح الرسمية، التذاكر الثقافية، التنقل المستدام والدعم متعدد اللغات.',
      searchPlaceholder: 'ابحث عن خدمة أو تصريح أو معاملة...',
      allCategories: 'الكل',
      categories: {
        mobility: 'التنقل',
        civic: 'الإجراءات',
        health: 'الصحة والطوارئ',
        nature: 'الطبيعة',
        culture: 'الثقافة',
      },
      openDetails: 'عرض التفاصيل',
      emptyState: 'لا توجد خدمات مطابقة لبحثك الحالي.',
      resetFilters: 'إعادة ضبط الفلاتر',
      utilitiesBannerTitle: 'أرقام الطوارئ والخدمات ودليل العبارات بأربع لغات',
      utilitiesBannerDesc: 'استعرض أرقام 112 و012 والإنقاذ البحري وعبارات يومية بالإسبانية والعربية والإنجليزية والفرنسية.',
      openPhrasebookBtn: 'فتح الأرقام والعبارات',
    },
    routesSection: {
      heading: 'المسارات الطبيعية والشواطئ والبرك البركانية',
      subheading: 'تنقّل بين المسارات الجبلية المعتمدة وأفضل الشواطئ والبرك الطبيعية في الجزر الثماني.',
      tabRoutes: 'المسارات والتراث',
      tabBeaches: 'الشواطئ والبرك الطبيعية',
      tabSurf: 'حاسبة الأمواج والسيرف',
      allIslands: 'جميع الجزر',
      allTypes: 'كل البيئات',
      types: {
        volcanic: 'بركاني',
        coastal: 'ساحلي',
        forest: 'غابات الغار',
        heritage: 'تراثي',
      },
      beachKinds: {
        all: 'كل المواقع',
        beach: 'شاطئ',
        'natural-pool': 'بركة طبيعية',
        cove: 'خليج صغير',
      },
      swellRisk: {
        calm: 'مياه هادئة',
        moderate: 'أمواج متوسطة',
        caution: 'تنبيه بحر مفتوح',
      },
      busYes: 'متصل بالحافلات',
      busNo: 'وصول خاص / مشياً',
      difficulty: {
        easy: 'سهل',
        moderate: 'متوسط',
        challenging: 'متقدم',
      },
      saveAction: 'حفظ',
      savedAction: 'محفوظ',
      viewGuide: 'عرض الدليل',
      emptyState: 'لا توجد نتائج مطابقة للفلاتر المحددة.',
    },
    agendaSection: {
      heading: 'أجندة الجزر والتنبيهات النشطة',
      subheading: 'الفعاليات الثقافية، الأسواق المحلية وتنبيهات السلامة والمسارات عبر الأرخبيل.',
      filterAll: 'الكل',
      filterEvents: 'فعاليات',
      filterNotices: 'تنبيهات',
      eventLabel: 'فعالية ثقافية',
      noticeLabel: 'تنبيه تشغيلي',
      saveAction: 'حفظ الموعد',
      savedAction: 'محفوظ',
    },
    drawer: {
      close: 'إغلاق',
      requirementsTitle: 'المتطلبات الأساسية',
      validityLabel: 'المواعيد / الصلاحية',
      feeLabel: 'الرسوم التقديرية',
      portalLabel: 'الجهة المختصة',
      highlightsTitle: 'أبرز محطات المسار',
      beachServicesTitle: 'الخدمات والتوصيات الميدانية',
      lifeguardLabel: 'الإنقاذ الشاطئي',
      swellLabel: 'حالة البحر المعتادة',
      transitLabel: 'النقل العام',
      residentTipTitle: 'ملاحظة للمقيمين',
      touristTipTitle: 'نصيحة للزوار',
      savedTitle: 'دليلي الشخصي في الكناري',
      savedEmpty: 'لم تقم بحفظ أي جزر أو مسارات أو شواطئ أو خدمات بعد. اضغط على زر الحفظ لبناء خطتك.',
      checklistTitle: 'قائمة المهام والتجهيزات الشخصية',
      checklistPlaceholder: 'مثال: استخراج تصريح تيد أو إحضار الهوية...',
      checklistAdd: 'إضافة',
      clearAll: 'مسح الكل',
      copyItinerary: 'نسخ الملخص',
      copiedFeedback: 'تم نسخ الملخص إلى الحافظة',
      removeItem: 'إزالة',
      typeLabels: {
        island: 'جزيرة',
        service: 'خدمة',
        route: 'مسار',
        beach: 'شاطئ / بركة',
        event: 'فعالية',
      },
      phrasebookTitle: 'الأرقام المهمة ودليل العبارات (4 لغات)',
      phrasebookSubtitle: 'أرقام الطوارئ الرسمية وعبارات أساسية بالإسبانية والعربية والإنجليزية والفرنسية.',
      phonesTitle: 'هواتف المساعدة والطوارئ',
      phrasesTitle: 'عبارات عملية متعددة اللغات',
      phraseCategories: {
        all: 'الكل',
        daily: 'اليومية',
        transport: 'التنقل',
        emergency: 'الطوارئ',
      },
      copyAction: 'نسخ',
      listenAction: 'استماع',
    },
    newsletter: {
      heading: 'نشرة التنبيهات والأجندة الأسبوعية',
      subheading: 'استلم تنبيهات الغبار الجوي، حالة المسارات والأنشطة الثقافية في جزيرتك المفضلة.',
      emailPlaceholder: 'name@example.com',
      islandSelect: 'الجزيرة الأساسية',
      submit: 'اشتراك',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
      successMessage: 'تم تأكيد اشتراكك لاستلام التنبيهات الأسبوعية للجزيرة المختارة.',
    },
    footer: {
      tagline: 'MI CANARIAS · منصة مدنية وسياحية متعددة اللغات لأرخبيل الكناري.',
      emergencyLabel: 'طوارئ جزر الكناري (إسبانية / عربية / إنجليزية / فرنسية)',
      emergencyNumber: '112',
      copyright: '© 2026 MI CANARIAS. دليل إرشادي وتخطيطي لجزر الكناري.',
    },
  },
  en: {
    brand: 'MI CANARIAS',
    nav: {
      islands: 'Islands',
      services: 'Services',
      transport: 'Transport',
      routes: 'Routes & Coasts',
      agenda: 'Agenda',
      saved: 'My Guide',
    },
    languages: {
      es: { native: 'Español', code: 'ES' },
      ar: { native: 'العربية', code: 'AR' },
      en: { native: 'English', code: 'EN' },
      fr: { native: 'Français', code: 'FR' },
    },
    audience: {
      label: 'Active profile',
      resident: 'Resident',
      tourist: 'Visitor',
      residentDesc: 'Civic procedures, 75% transport subsidy, and local notices.',
      touristDesc: 'Nature trails, beaches, park permits, ferries, and culture.',
    },
    hero: {
      kicker: 'Canary Islands · Unified Archipelago Platform',
      titleResident: 'Daily civic services and mobility across all eight islands',
      titleTourist: 'Explore all eight Canary Islands with clarity and ease',
      subtitleResident:
        'Check inter-island connections with the 75% resident subsidy, island council procedures, healthcare bookings, beaches, and weather alerts in one place.',
      subtitleTourist:
        'Plan ferry crossings, book official national park permits, and discover volcanic trails, beaches, and natural rock pools with verified local guidance.',
      primaryCta: 'Explore all 8 islands',
      imageCaption: 'Los Gigantes cliffs and Mount Teide at dusk · Tenerife',
    },
    metrics: {
      islandsLabel: 'Inhabited islands',
      islandsValue: '8 Islands',
      subsidyLabel: 'Resident travel subsidy',
      subsidyValue: '75 %',
      languagesLabel: 'Supported languages',
      languagesValue: '4 Languages',
      climateLabel: 'Average coastal climate',
      climateValue: '24 °C',
    },
    islandsSection: {
      heading: 'Explore the archipelago island by island',
      subheading: 'Select an island on the map or directory to inspect microclimate figures, transport hubs, and tailored essentials.',
      selectIslandHint: 'Interactive archipelago map',
      capital: 'Capital',
      population: 'Population',
      area: 'Area',
      peak: 'Highest peak',
      climate: 'Mean climate',
      microclimateTitle: 'Reference microclimate & ocean',
      coastLabel: 'Coast',
      summitLabel: 'Summit',
      seaLabel: 'Sea',
      uvLabel: 'UV Index',
      residentEssentials: 'Essentials for residents',
      touristEssentials: 'Highlights for visitors',
      transportConnections: 'Ports & airports',
      saveIsland: 'Save island',
      savedIsland: 'Island saved',
      viewRoutesForIsland: 'View trails & beaches',
    },
    calculator: {
      heading: 'Inter-island connection estimator',
      subheading: 'Estimate crossing durations and fares between islands with the 75% Canary Resident subsidy toggle.',
      origin: 'Departure island',
      destination: 'Arrival island',
      passengerType: 'Fare profile',
      residentDiscountNote: 'Includes 75% Canary Islands resident transport subsidy',
      standardFareNote: 'Standard fare for visitors and non-residents',
      estimatedFare: 'Estimated one-way fare',
      durationLabel: 'Average duration',
      operatorLabel: 'Primary connection',
      sameIslandHint: 'Select two different islands to calculate a crossing.',
      minutesUnit: 'min',
      ferryLabel: 'Fast ferry',
      flightLabel: 'Regional flight',
      swapAction: 'Swap route',
    },
    servicesSection: {
      headingResident: 'Resident services and local administration',
      headingTourist: 'Essential visitor services and permits',
      subheadingResident: 'Direct access to regional transit cards, health appointments, employment, councils, and weather alerts.',
      subheadingTourist: 'Mandatory park permits, cultural passes, sustainable mobility, and multilingual emergency support.',
      searchPlaceholder: 'Search service, permit, or procedure...',
      allCategories: 'All',
      categories: {
        mobility: 'Mobility',
        civic: 'Civic',
        health: 'Health & 112',
        nature: 'Nature',
        culture: 'Culture',
      },
      openDetails: 'View guide',
      emptyState: 'No services match your current search.',
      resetFilters: 'Reset filters',
      utilitiesBannerTitle: 'Canary Islands useful numbers & 4-language phrasebook',
      utilitiesBannerDesc: 'Quick access to 112, 012, Maritime Rescue, and essential expressions in Spanish, Arabic, English, and French.',
      openPhrasebookBtn: 'Open phones & phrases',
    },
    routesSection: {
      heading: 'Trails, beaches, and natural rock pools',
      subheading: 'Switch between waymarked hiking routes and top coastal swimming spots across all eight islands.',
      tabRoutes: 'Trails & Heritage',
      tabBeaches: 'Beaches & Rock Pools',
      tabSurf: 'Surf Wave Calculator',
      allIslands: 'All islands',
      allTypes: 'All terrains',
      types: {
        volcanic: 'Volcanic',
        coastal: 'Coastal',
        forest: 'Laurel forest',
        heritage: 'Heritage',
      },
      beachKinds: {
        all: 'All coastal spots',
        beach: 'Beach',
        'natural-pool': 'Natural pool',
        cove: 'Cove',
      },
      swellRisk: {
        calm: 'Calm waters',
        moderate: 'Moderate swell',
        caution: 'Open-Atlantic caution',
      },
      busYes: 'Bus accessible',
      busNo: 'Private / foot access',
      difficulty: {
        easy: 'Easy',
        moderate: 'Moderate',
        challenging: 'Challenging',
      },
      saveAction: 'Save',
      savedAction: 'Saved',
      viewGuide: 'Details',
      emptyState: 'No entries match the selected filters.',
    },
    agendaSection: {
      heading: 'Island agenda and active notices',
      subheading: 'Cultural gatherings, farmers markets, and live trail or coastal safety advisories.',
      filterAll: 'All',
      filterEvents: 'Events',
      filterNotices: 'Notices',
      eventLabel: 'Cultural event',
      noticeLabel: 'Field notice',
      saveAction: 'Save date',
      savedAction: 'Saved',
    },
    drawer: {
      close: 'Close',
      requirementsTitle: 'What you need',
      validityLabel: 'Schedule / Validity',
      feeLabel: 'Estimated fee',
      portalLabel: 'Authority / Channel',
      highlightsTitle: 'Route highlights',
      beachServicesTitle: 'Facilities & field guidance',
      lifeguardLabel: 'Lifeguard coverage',
      swellLabel: 'Typical sea state',
      transitLabel: 'Public transit access',
      residentTipTitle: 'Resident note',
      touristTipTitle: 'Visitor tip',
      savedTitle: 'My Canary Guide',
      savedEmpty: 'No saved islands, routes, beaches, services, or events yet. Bookmark items anywhere to build your personal plan.',
      checklistTitle: 'Personal checklist & notes',
      checklistPlaceholder: 'e.g. Confirm Teide permit or pack SARA ID...',
      checklistAdd: 'Add',
      clearAll: 'Clear all',
      copyItinerary: 'Copy summary',
      copiedFeedback: 'Summary copied to clipboard',
      removeItem: 'Remove',
      typeLabels: {
        island: 'Island',
        service: 'Service',
        route: 'Route',
        beach: 'Beach / Pool',
        event: 'Agenda',
      },
      phrasebookTitle: 'Useful phones & 4-language phrasebook',
      phrasebookSubtitle: 'Official Canary Islands helplines and daily expressions in Spanish, Arabic, English, and French.',
      phonesTitle: 'Helplines & emergency numbers',
      phrasesTitle: 'Multilingual quick phrases',
      phraseCategories: {
        all: 'All',
        daily: 'Everyday',
        transport: 'Transport',
        emergency: 'Emergency',
      },
      copyAction: 'Copy',
      listenAction: 'Listen',
    },
    newsletter: {
      heading: 'Island notices and weekly agenda',
      subheading: 'Receive calima dust alerts, trail status updates, and weekly cultural listings for your island.',
      emailPlaceholder: 'you@example.com',
      islandSelect: 'Primary island',
      submit: 'Subscribe',
      invalidEmail: 'Please enter a valid email address.',
      successMessage: 'Subscription confirmed for weekly updates on your selected island.',
    },
    footer: {
      tagline: 'MI CANARIAS · Multilingual civic and visitor platform for the Canary Islands.',
      emergencyLabel: 'Canary Islands Emergency (ES / AR / EN / FR)',
      emergencyNumber: '112',
      copyright: '© 2026 MI CANARIAS. Archipelago planning and orientation guide.',
    },
  },
  fr: {
    brand: 'MI CANARIAS',
    nav: {
      islands: 'Îles',
      services: 'Services',
      transport: 'Transport',
      routes: 'Itinéraires & Côtes',
      agenda: 'Agenda',
      saved: 'Mon Guide',
    },
    languages: {
      es: { native: 'Español', code: 'ES' },
      ar: { native: 'العربية', code: 'AR' },
      en: { native: 'English', code: 'EN' },
      fr: { native: 'Français', code: 'FR' },
    },
    audience: {
      label: 'Profil actif',
      resident: 'Résident',
      tourist: 'Visiteur',
      residentDesc: 'Démarches, transport subventionné à 75 % et alertes locales.',
      touristDesc: 'Sentiers, plages, permis naturels, ferries et agenda culturel.',
    },
    hero: {
      kicker: 'Îles Canaries · Plateforme Unifiée de l’Archipel',
      titleResident: 'Votre quotidien et vos démarches sur les huit îles',
      titleTourist: 'Découvrez les huit Îles Canaries en toute clarté',
      subtitleResident:
        'Consultez les liaisons inter-îles avec la réduction résident de 75 %, les services des cabildos, la santé, les plages et la météo locale.',
      subtitleTourist:
        'Planifiez vos traversées en ferry, obtenez les permis des parcs nationaux et parcourez sentiers, plages et piscines naturelles.',
      primaryCta: 'Explorer les 8 îles',
      imageCaption: 'Falaises de Los Gigantes et pic du Teide au crépuscule · Tenerife',
    },
    metrics: {
      islandsLabel: 'Îles habitées',
      islandsValue: '8 Îles',
      subsidyLabel: 'Aide transport résident',
      subsidyValue: '75 %',
      languagesLabel: 'Langues disponibles',
      languagesValue: '4 Langues',
      climateLabel: 'Température côtière moyenne',
      climateValue: '24 °C',
    },
    islandsSection: {
      heading: 'Explorez l’archipel île par île',
      subheading: 'Sélectionnez une île sur la carte ou dans la liste pour consulter microclimat, données et recommandations.',
      selectIslandHint: 'Carte interactive de l’archipel',
      capital: 'Capitale',
      population: 'Population',
      area: 'Superficie',
      peak: 'Point culminant',
      climate: 'Climat moyen',
      microclimateTitle: 'Microclimat et océan de référence',
      coastLabel: 'Côte',
      summitLabel: 'Sommet',
      seaLabel: 'Mer',
      uvLabel: 'Indice UV',
      residentEssentials: 'Essentiels pour les résidents',
      touristEssentials: 'Incontournables pour les visiteurs',
      transportConnections: 'Ports et aéroports',
      saveIsland: 'Enregistrer l’île',
      savedIsland: 'Île enregistrée',
      viewRoutesForIsland: 'Voir sentiers et plages',
    },
    calculator: {
      heading: 'Estimateur de liaison inter-îles',
      subheading: 'Estimez la durée et le tarif entre deux îles avec application automatique de la remise résident de 75 %.',
      origin: 'Île de départ',
      destination: 'Île d’arrivée',
      passengerType: 'Tarif applicable',
      residentDiscountNote: 'Inclut la subvention résident des Canaries de 75 %',
      standardFareNote: 'Tarif standard pour visiteurs et non-résidents',
      estimatedFare: 'Tarif estimé (aller simple)',
      durationLabel: 'Durée moyenne',
      operatorLabel: 'Liaison principale',
      sameIslandHint: 'Sélectionnez deux îles distinctes pour estimer la traversée.',
      minutesUnit: 'min',
      ferryLabel: 'Ferry rapide',
      flightLabel: 'Vol régional',
      swapAction: 'Inverser le trajet',
    },
    servicesSection: {
      headingResident: 'Services et démarches pour résidents',
      headingTourist: 'Services essentiels pour votre séjour',
      subheadingResident: 'Accès direct aux titres de transport, rendez-vous médicaux, emploi, conseils insulaires et alertes.',
      subheadingTourist: 'Permis officiels, pass culturels, mobilité durable et assistance multilingue 112.',
      searchPlaceholder: 'Rechercher un service ou un permis...',
      allCategories: 'Tous',
      categories: {
        mobility: 'Mobilité',
        civic: 'Démarches',
        health: 'Santé & 112',
        nature: 'Nature',
        culture: 'Culture',
      },
      openDetails: 'Voir la fiche',
      emptyState: 'Aucun service ne correspond à votre recherche.',
      resetFilters: 'Réinitialiser',
      utilitiesBannerTitle: 'Numéros utiles aux Canaries et guide de phrases en 4 langues',
      utilitiesBannerDesc: 'Accédez au 112, 012, secours en mer et expressions utiles en espagnol, arabe, anglais et français.',
      openPhrasebookBtn: 'Numéros & phrases',
    },
    routesSection: {
      heading: 'Sentiers, plages et piscines naturelles',
      subheading: 'Basculez entre les itinéraires balisés et les sites de baignade des huit îles.',
      tabRoutes: 'Sentiers & Patrimoine',
      tabBeaches: 'Plages & Piscines naturelles',
      tabSurf: 'Calculateur Surf',
      allIslands: 'Toutes les îles',
      allTypes: 'Tous les paysages',
      types: {
        volcanic: 'Volcanique',
        coastal: 'Littoral',
        forest: 'Laurisylve',
        heritage: 'Patrimoine',
      },
      beachKinds: {
        all: 'Tous les sites',
        beach: 'Plage',
        'natural-pool': 'Piscine naturelle',
        cove: 'Crique',
      },
      swellRisk: {
        calm: 'Eaux calmes',
        moderate: 'Houle modérée',
        caution: 'Prudence océan ouvert',
      },
      busYes: 'Desservi par bus',
      busNo: 'Accès privé / à pied',
      difficulty: {
        easy: 'Facile',
        moderate: 'Modérée',
        challenging: 'Exigeante',
      },
      saveAction: 'Enregistrer',
      savedAction: 'Enregistré',
      viewGuide: 'Détails',
      emptyState: 'Aucun résultat ne correspond aux filtres choisis.',
    },
    agendaSection: {
      heading: 'Agenda insulaire et avis actifs',
      subheading: 'Rendez-vous culturels, marchés locaux et avis d’état des sentiers ou du littoral.',
      filterAll: 'Tout',
      filterEvents: 'Événements',
      filterNotices: 'Avis',
      eventLabel: 'Agenda culturel',
      noticeLabel: 'Avis pratique',
      saveAction: 'Enregistrer',
      savedAction: 'Enregistré',
    },
    drawer: {
      close: 'Fermer',
      requirementsTitle: 'Éléments requis',
      validityLabel: 'Horaires / Validité',
      feeLabel: 'Tarif estimé',
      portalLabel: 'Organisme / Canal',
      highlightsTitle: 'Points forts du parcours',
      beachServicesTitle: 'Équipements et conseils',
      lifeguardLabel: 'Surveillance',
      swellLabel: 'État habituel de la mer',
      transitLabel: 'Transports publics',
      residentTipTitle: 'Note aux résidents',
      touristTipTitle: 'Conseil aux visiteurs',
      savedTitle: 'Mon Guide des Canaries',
      savedEmpty: 'Aucun élément enregistré pour le moment. Marquez des îles, sentiers, plages ou services pour créer votre plan.',
      checklistTitle: 'Liste de préparation personnelle',
      checklistPlaceholder: 'Ex. : Réserver permis Teide ou vérifier carte...',
      checklistAdd: 'Ajouter',
      clearAll: 'Tout effacer',
      copyItinerary: 'Copier le résumé',
      copiedFeedback: 'Résumé copié dans le presse-papiers',
      removeItem: 'Retirer',
      typeLabels: {
        island: 'Île',
        service: 'Service',
        route: 'Itinéraire',
        beach: 'Plage / Bassin',
        event: 'Agenda',
      },
      phrasebookTitle: 'Numéros utiles et guide de phrases (4 langues)',
      phrasebookSubtitle: 'Numéros officiels de l’archipel et expressions courantes en espagnol, arabe, anglais et français.',
      phonesTitle: 'Numéros d’assistance et d’urgence',
      phrasesTitle: 'Expressions multilingues utiles',
      phraseCategories: {
        all: 'Toutes',
        daily: 'Quotidien',
        transport: 'Transport',
        emergency: 'Urgences',
      },
      copyAction: 'Copier',
      listenAction: 'Écouter',
    },
    newsletter: {
      heading: 'Bulletin d’alertes et agenda hebdomadaire',
      subheading: 'Recevez les avis de calima, l’ouverture des sentiers et les sorties culturelles de votre île.',
      emailPlaceholder: 'vous@exemple.com',
      islandSelect: 'Île principale',
      submit: 'S’inscrire',
      invalidEmail: 'Veuillez saisir une adresse e-mail valide.',
      successMessage: 'Inscription confirmée pour recevoir les informations hebdomadaires de l’île choisie.',
    },
    footer: {
      tagline: 'MI CANARIAS · Plateforme citoyenne et touristique multilingue des Îles Canaries.',
      emergencyLabel: 'Urgences Canaries (ES / AR / EN / FR)',
      emergencyNumber: '112',
      copyright: '© 2026 MI CANARIAS. Guide d’orientation et de planification insulaire.',
    },
  },
};
