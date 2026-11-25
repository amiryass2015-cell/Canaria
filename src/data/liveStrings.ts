import { Language } from '../types/canarias';

export interface LiveStrings {
  weather: {
    title: string;
    loading: string;
    error: string;
    retry: string;
    refresh: string;
    feelsLike: string;
    humidity: string;
    wind: string;
    range: string;
    uvMax: string;
    station: string;
    sourceLabel: string;
    conditions: {
      clear: string;
      partlyCloudy: string;
      cloudy: string;
      fog: string;
      drizzle: string;
      rain: string;
      storm: string;
    };
  };
  brief: {
    buttonLabel: string;
    loading: string;
    title: string;
    sourcesLabel: string;
    error: string;
  };
  chat: {
    openButton: string;
    title: string;
    subtitle: string;
    roleNoteResident: string;
    roleNoteTourist: string;
    modeSearch: string;
    modeFast: string;
    placeholder: string;
    send: string;
    clear: string;
    close: string;
    thinking: string;
    sourcesLabel: string;
    emptyTitle: string;
    fallbackNote: string;
    retry: string;
    starterPromptsResident: string[];
    starterPromptsTourist: string[];
  };
  pwa: {
    installApp: string;
    installIOS: string;
    iosTitle: string;
    iosStep1: string;
    iosStep2: string;
    close: string;
    offlineBadge: string;
    offlineHint: string;
    cacheReady: string;
  };
}

export const LIVE_STRINGS: Record<Language, LiveStrings> = {
  es: {
    weather: {
      title: 'Clima actual en tiempo real',
      loading: 'Consultando estación meteorológica...',
      error: 'No se pudo obtener el clima actual de la API externa.',
      retry: 'Reintentar',
      refresh: 'Actualizar',
      feelsLike: 'Sensación',
      humidity: 'Humedad',
      wind: 'Viento',
      range: 'Mín / Máx hoy',
      uvMax: 'UV máx.',
      station: 'Estación',
      sourceLabel: 'Datos en directo vía Open-Meteo',
      conditions: {
        clear: 'Cielo despejado',
        partlyCloudy: 'Intervalos nubosos',
        cloudy: 'Nuboso',
        fog: 'Bruma / Niebla',
        drizzle: 'Llovizna ligera',
        rain: 'Lluvia',
        storm: 'Tormenta',
      },
    },
    brief: {
      buttonLabel: 'Consultar actualidad web',
      loading: 'Buscando información actualizada...',
      title: 'Resumen actualizado (Google Search)',
      sourcesLabel: 'Fuentes consultadas',
      error: 'No se pudo obtener el resumen actualizado.',
    },
    chat: {
      openButton: 'Asistente Canarias',
      title: 'Asistente MI CANARIAS',
      subtitle: 'Consultas sobre las 8 islas con búsqueda web actualizada',
      roleNoteResident: 'Modo Residente · Trámites, transporte 75 %, salud y avisos',
      roleNoteTourist: 'Modo Turista · Rutas, permisos, ferris, playas y agenda',
      modeSearch: 'Con Google Search',
      modeFast: 'Respuesta rápida',
      placeholder: 'Pregunta sobre ferris, permisos, trámites o clima...',
      send: 'Enviar',
      clear: 'Limpiar chat',
      close: 'Cerrar',
      thinking: 'Consultando respuesta...',
      sourcesLabel: 'Fuentes web',
      emptyTitle: 'Pregunta cualquier duda práctica sobre la isla seleccionada:',
      fallbackNote: 'Búsqueda web temporalmente limitada por cuota · Respondido en modo rápido.',
      retry: 'Reintentar',
      starterPromptsResident: [
        '¿Qué requisitos necesito para aplicar el 75 % de residente en vuelos?',
        '¿Cómo pedir cita previa en el Servicio Canario de la Salud?',
        '¿Qué avisos o conexiones de transporte público hay hoy en esta isla?',
      ],
      starterPromptsTourist: [
        '¿Cómo solicito el permiso del Pico del Teide o Islote de Lobos?',
        '¿Qué playas tranquilas y senderos recomiendas en esta isla?',
        '¿Qué ferris conectan hoy con las islas vecinas y cuánto tardan?',
      ],
    },
    pwa: {
      installApp: 'Instalar app sin conexión',
      installIOS: 'Añadir a pantalla (iOS)',
      iosTitle: 'Instalar MI CANARIAS en iPhone / iPad',
      iosStep1: 'Pulsa el botón Compartir en la barra de Safari.',
      iosStep2: 'Desliza y selecciona Añadir a pantalla de inicio para consultar rutas, teléfonos 112/012 y guías sin cobertura.',
      close: 'Cerrar',
      offlineBadge: 'Sin conexión · Caché rural activa',
      offlineHint: 'Mostrando información esencial de las islas y última lectura guardada.',
      cacheReady: 'Guía esencial lista para consulta sin conexión',
    },
  },
  ar: {
    weather: {
      title: 'الطقس الحالي مباشرة',
      loading: 'جارٍ جلب بيانات الطقس المباشرة...',
      error: 'تعذر جلب حالة الطقس الحالية من المزود الخارجي.',
      retry: 'إعادة المحاولة',
      refresh: 'تحديث',
      feelsLike: 'الحرارة المحسوسة',
      humidity: 'الرطوبة',
      wind: 'الرياح',
      range: 'الصغرى / العظمى',
      uvMax: 'أقصى UV',
      station: 'المحطة',
      sourceLabel: 'بيانات حية عبر Open-Meteo',
      conditions: {
        clear: 'سماء صافية',
        partlyCloudy: 'غائم جزئياً',
        cloudy: 'غائم',
        fog: 'ضباب خفيف',
        drizzle: 'رذاذ خفيف',
        rain: 'أمطار',
        storm: 'عاصفة رعدية',
      },
    },
    brief: {
      buttonLabel: 'تحديثات الويب المباشرة',
      loading: 'جارٍ البحث عن أحدث المعلومات...',
      title: 'ملخص محدث (بحث Google)',
      sourcesLabel: 'المصادر المرجعية',
      error: 'تعذر جلب الملخص المحدث حالياً.',
    },
    chat: {
      openButton: 'مساعد الكناري',
      title: 'مساعد MI CANARIAS',
      subtitle: 'إجابات متعددة الأدوار حول الجزر الثماني مدعومة ببحث الويب',
      roleNoteResident: 'وضع المقيم · المعاملات، خصم السفر 75٪، الصحة والتنبيهات',
      roleNoteTourist: 'وضع السائح · المسارات، التصاريح، العبّارات والشواطئ',
      modeSearch: 'بحث Google المحدث',
      modeFast: 'استجابة سريعة',
      placeholder: 'اسأل عن العبّارات، التصاريح، الإجراءات أو الطقس...',
      send: 'إرسال',
      clear: 'مسح المحادثة',
      close: 'إغلاق',
      thinking: 'جارٍ إعداد الإجابة...',
      sourcesLabel: 'مصادر الويب',
      emptyTitle: 'اطرح أي سؤال عملي حول الجزيرة المختارة:',
      fallbackNote: 'بحث الويب محدود مؤقتاً بسبب الحصة · تمت الإجابة بالوضع السريع.',
      retry: 'إعادة المحاولة',
      starterPromptsResident: [
        'ما شروط الاستفادة من خصم 75٪ للمقيمين في الرحلات بين الجزر؟',
        'كيف أحجز موعداً طبياً في الخدمة الصحية الكنارية SCS؟',
        'ما خطوط الحافلات أو التنبيهات المحلية المهمة في هذه الجزيرة؟',
      ],
      starterPromptsTourist: [
        'كيف أستخرج تصريح قمة تيد أو جزيرة لوبوس؟',
        'ما أفضل الشواطئ الهادئة والمسارات في هذه الجزيرة؟',
        'ما روابط العبّارات المتاحة نحو الجزر المجاورة ومدتها؟',
      ],
    },
    pwa: {
      installApp: 'تثبيت التطبيق دون إنترنت',
      installIOS: 'إضافة للشاشة (iOS)',
      iosTitle: 'تثبيت MI CANARIAS على iPhone / iPad',
      iosStep1: 'اضغط على زر المشاركة في شريط سفاري.',
      iosStep2: 'مرر واختر إضافة إلى الشاشة الرئيسية لتصفح الجزر وأرقام الطوارئ والنقل في المناطق الريفية.',
      close: 'إغلاق',
      offlineBadge: 'وضع عدم الاتصال · الذاكرة المحلية مفعلة',
      offlineHint: 'عرض المعلومات الأساسية للجزر وآخر قراءة محفوظة.',
      cacheReady: 'البيانات الأساسية محفوظة للاستخدام دون اتصال',
    },
  },
  en: {
    weather: {
      title: 'Live current weather',
      loading: 'Fetching live weather station data...',
      error: 'Unable to retrieve live weather from the external API.',
      retry: 'Retry',
      refresh: 'Refresh',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      range: 'Today Low / High',
      uvMax: 'Max UV',
      station: 'Station',
      sourceLabel: 'Live data via Open-Meteo',
      conditions: {
        clear: 'Clear sky',
        partlyCloudy: 'Partly cloudy',
        cloudy: 'Overcast',
        fog: 'Mist / Fog',
        drizzle: 'Light drizzle',
        rain: 'Rain',
        storm: 'Thunderstorm',
      },
    },
    brief: {
      buttonLabel: 'Check live web briefing',
      loading: 'Searching for current island updates...',
      title: 'Live web briefing (Google Search)',
      sourcesLabel: 'Grounded sources',
      error: 'Could not retrieve the live web briefing.',
    },
    chat: {
      openButton: 'Canarias Assistant',
      title: 'MI CANARIAS Assistant',
      subtitle: 'Multi-turn local guidance across all 8 islands with Search Grounding',
      roleNoteResident: 'Resident Mode · Civic desk, 75% subsidy, SCS health & notices',
      roleNoteTourist: 'Visitor Mode · Trails, permits, ferries, beaches & events',
      modeSearch: 'Google Search',
      modeFast: 'Fast reply',
      placeholder: 'Ask about ferries, permits, local procedures, or weather...',
      send: 'Send',
      clear: 'Clear chat',
      close: 'Close',
      thinking: 'Preparing response...',
      sourcesLabel: 'Web sources',
      emptyTitle: 'Ask a practical question about the selected island:',
      fallbackNote: 'Web search quota temporarily reached · Answered in fast assistant mode.',
      retry: 'Retry',
      starterPromptsResident: [
        'What documents do I need for the 75% Canary resident travel discount?',
        'How do I book an appointment with the Canary Health Service (SCS)?',
        'Which bus passes and local civic alerts apply on this island?',
      ],
      starterPromptsTourist: [
        'How do I book the Mount Teide summit or Lobos Island permit?',
        'Which calm beaches and scenic hikes do you recommend on this island?',
        'What ferries connect this island with nearby islands and how long do they take?',
      ],
    },
    pwa: {
      installApp: 'Install offline app',
      installIOS: 'Install on iOS',
      iosTitle: 'Install MI CANARIAS on iPhone / iPad',
      iosStep1: 'Tap the Share button in the Safari toolbar.',
      iosStep2: 'Scroll down and tap Add to Home Screen for offline access in rural or mountain areas.',
      close: 'Close',
      offlineBadge: 'Offline Mode · Cached island data active',
      offlineHint: 'Showing essential island info, emergency phones, and last saved readings.',
      cacheReady: 'Essential guide cached for offline rural access',
    },
  },
  fr: {
    weather: {
      title: 'Météo actuelle en temps réel',
      loading: 'Consultation de la station météo...',
      error: 'Impossible de récupérer la météo en direct depuis l’API externe.',
      retry: 'Réessayer',
      refresh: 'Actualiser',
      feelsLike: 'Ressenti',
      humidity: 'Humidité',
      wind: 'Vent',
      range: 'Min / Max du jour',
      uvMax: 'UV max',
      station: 'Station',
      sourceLabel: 'Données en direct via Open-Meteo',
      conditions: {
        clear: 'Ciel dégagé',
        partlyCloudy: 'Éclaircies',
        cloudy: 'Couvert',
        fog: 'Brume / Brouillard',
        drizzle: 'Bruine légère',
        rain: 'Pluie',
        storm: 'Orage',
      },
    },
    brief: {
      buttonLabel: 'Actualités web en direct',
      loading: 'Recherche d’informations actuelles...',
      title: 'Synthèse web en direct (Google Search)',
      sourcesLabel: 'Sources consultées',
      error: 'Impossible de charger la synthèse en direct.',
    },
    chat: {
      openButton: 'Assistant Canaries',
      title: 'Assistant MI CANARIAS',
      subtitle: 'Conseils multi-tours sur les 8 îles avec recherche Google intégrée',
      roleNoteResident: 'Mode Résident · Démarches, remise 75 %, santé SCS et avis',
      roleNoteTourist: 'Mode Visiteur · Sentiers, permis, ferries, plages et agenda',
      modeSearch: 'Google Search',
      modeFast: 'Réponse rapide',
      placeholder: 'Posez une question sur les ferries, permis ou démarches...',
      send: 'Envoyer',
      clear: 'Effacer',
      close: 'Fermer',
      thinking: 'Rédaction de la réponse...',
      sourcesLabel: 'Sources web',
      emptyTitle: 'Posez une question pratique sur l’île sélectionnée :',
      fallbackNote: 'Quota de recherche web temporairement atteint · Réponse en mode rapide.',
      retry: 'Réessayer',
      starterPromptsResident: [
        'Quels justificatifs faut-il pour la réduction résident de 75 % ?',
        'Comment prendre rendez-vous auprès du Service Canarien de Santé (SCS) ?',
        'Quels abonnements de bus et avis locaux concernent cette île ?',
      ],
      starterPromptsTourist: [
        'Comment obtenir le permis pour le sommet du Teide ou l’îlot de Lobos ?',
        'Quelles plages calmes et randonnées recommandez-vous sur cette île ?',
        'Quelles liaisons en ferry desservent les îles voisines ?',
      ],
    },
    pwa: {
      installApp: 'Installer hors ligne',
      installIOS: 'Installer sur iOS',
      iosTitle: 'Installer MI CANARIAS sur iPhone / iPad',
      iosStep1: 'Appuyez sur le bouton Partager dans la barre Safari.',
      iosStep2: 'Faites défiler et touchez Sur l’écran d’accueil pour consulter les infos essentielles sans réseau.',
      close: 'Fermer',
      offlineBadge: 'Hors ligne · Cache rural actif',
      offlineHint: 'Affichage des informations essentielles des îles et des dernières mesures enregistrées.',
      cacheReady: 'Guide essentiel mis en cache hors ligne',
    },
  },
};
