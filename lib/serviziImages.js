// Foto e video delle 6 pagine di servizio (file in public/images/servizi/, ottimizzati
// da 06_Foto/Immagini-pagine-servizi).
//
// - cover: hero (desktop 16:9 / mobile quadrata, scelta con <picture>)
// - portrait: ritratto verticale sotto l'hero
// - rows: immagini delle sezioni a fisarmonica (fascia gialla)
// - cards: immagini delle card sovrapposte (formato largo, ritagliate)
// `kind: "video"` = micro video in loop senza audio (pagina Video). `pos` = punto focale
// del ritaglio (object-position).

export const serviziImages = {
  "fotografia-hotel": {
    "cover": {
      "desktop": "/images/servizi/hotel_cover_desktop.webp",
      "mobile": "/images/servizi/hotel_cover_mobile.webp",
      "alt": "Salone con soffitto a travi e grande arco affacciato sul tramonto"
    },
    "portrait": {
      "kind": "img",
      "src": "/images/servizi/hotel_extra1.webp",
      "alt": "Momento di relax a bordo piscina con cappello di paglia e sdraio"
    },
    "rows": [
      {
        "kind": "img",
        "src": "/images/servizi/hotel_OTA.webp",
        "alt": "Camera con letto matrimoniale, parete verde e luce soffusa"
      },
      {
        "kind": "img",
        "src": "/images/servizi/hotel_brand.webp",
        "alt": "Pergolato a bordo piscina al tramonto"
      }
    ],
    "cards": [
      {
        "kind": "img",
        "src": "/images/servizi/hotel_extra2.webp",
        "alt": "Colazione con cappuccino, dolci e succo d'arancia"
      },
      {
        "kind": "img",
        "src": "/images/servizi/hotel_cover_desktop.webp",
        "alt": "Salone con arco affacciato sul tramonto",
        "pos": "50% 60%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/hotel_OTA.webp",
        "alt": "Camera con letto matrimoniale e parete verde",
        "pos": "50% 70%"
      }
    ]
  },
  "video-hotel": {
    "cover": {
      "desktop": "/images/servizi/video_cover_desktop.webp",
      "mobile": "/images/servizi/video_cover_mobile.webp",
      "alt": "Piscina a sfioro al tramonto con due palme e il mare sullo sfondo"
    },
    "portrait": {
      "kind": "video",
      "src": "/images/servizi/video_1.mp4",
      "poster": "/images/servizi/video_1-poster.webp",
      "pos": "62% 50%"
    },
    "rows": [
      {
        "kind": "video",
        "src": "/images/servizi/video_2.mp4",
        "poster": "/images/servizi/video_2-poster.webp",
        "pos": "68% 50%"
      },
      {
        "kind": "video",
        "src": "/images/servizi/video_3.mp4",
        "poster": "/images/servizi/video_3-poster.webp",
        "pos": "30% 50%"
      }
    ],
    "cards": [
      {
        "kind": "video",
        "src": "/images/servizi/video_4.mp4",
        "poster": "/images/servizi/video_4-poster.webp",
        "pos": "50% 40%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/video_cover_desktop.webp",
        "alt": "Piscina a sfioro al tramonto",
        "pos": "50% 25%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/video_cover_desktop.webp",
        "alt": "Piscina a sfioro al tramonto",
        "pos": "50% 85%"
      }
    ]
  },
  "fotografia-bb": {
    "cover": {
      "desktop": "/images/servizi/bb_cover_desktop.webp",
      "mobile": "/images/servizi/bb_cover_mobile.webp",
      "alt": "Ampio soggiorno con divano, tavolo da pranzo e dipinti alle pareti"
    },
    "portrait": {
      "kind": "img",
      "src": "/images/servizi/bb_4.webp",
      "alt": "Colazione servita con succo d'arancia, croissant e fiori"
    },
    "rows": [
      {
        "kind": "img",
        "src": "/images/servizi/bb_1.webp",
        "alt": "Camera con vasca da bagno freestanding accanto al letto"
      },
      {
        "kind": "img",
        "src": "/images/servizi/bb_2.webp",
        "alt": "Camera scura con vasca freestanding e vetrata"
      }
    ],
    "cards": [
      {
        "kind": "img",
        "src": "/images/servizi/bb_3.webp",
        "alt": "Camera con letto a baldacchino e pareti azzurre"
      },
      {
        "kind": "img",
        "src": "/images/servizi/bb_cover_desktop.webp",
        "alt": "Ampio soggiorno con divano e tavolo da pranzo",
        "pos": "50% 60%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/bb_1.webp",
        "alt": "Camera con vasca da bagno freestanding",
        "pos": "50% 60%"
      }
    ]
  },
  "fotografia-appartamenti-airbnb": {
    "cover": {
      "desktop": "/images/servizi/appartamenti_cover_desktop.webp",
      "mobile": "/images/servizi/appartamenti_cover_mobile.webp",
      "alt": "Sala da pranzo con tavolo in legno, sedie bianche e ceramiche siciliane"
    },
    "portrait": {
      "kind": "img",
      "src": "/images/servizi/appartamenti_5.webp",
      "alt": "Angolo con appendiabiti e bagno sullo sfondo"
    },
    "rows": [
      {
        "kind": "img",
        "src": "/images/servizi/appartamenti_2.webp",
        "alt": "Soggiorno luminoso con colonna scura e vista dalle finestre"
      },
      {
        "kind": "img",
        "src": "/images/servizi/appartamenti_3.webp",
        "alt": "Cucina con dettagli gialli e zona notte"
      }
    ],
    "cards": [
      {
        "kind": "img",
        "src": "/images/servizi/appartamenti_4.webp",
        "alt": "Appartamento con arco, cucina e piante"
      },
      {
        "kind": "img",
        "src": "/images/servizi/appartamenti_cover_desktop.webp",
        "alt": "Sala da pranzo con tavolo in legno",
        "pos": "50% 65%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/appartamenti_2.webp",
        "alt": "Soggiorno luminoso",
        "pos": "50% 60%"
      }
    ]
  },
  "fotografia-ville": {
    "cover": {
      "desktop": "/images/servizi/ville_cover_desktop.webp",
      "mobile": "/images/servizi/ville_cover_mobile.webp",
      "alt": "Villa moderna con rivestimento in legno e giardino fiorito"
    },
    "portrait": {
      "kind": "img",
      "src": "/images/servizi/ville_4.webp",
      "alt": "Tavola apparecchiata a bordo piscina con vista sul mare"
    },
    "rows": [
      {
        "kind": "img",
        "src": "/images/servizi/ville_1.webp",
        "alt": "Piscina tra palme e bougainvillea in fiore"
      },
      {
        "kind": "img",
        "src": "/images/servizi/ville_2.webp",
        "alt": "Portico in mattoni con tavolo apparecchiato"
      }
    ],
    "cards": [
      {
        "kind": "img",
        "src": "/images/servizi/ville_3.webp",
        "alt": "Lettini a bordo piscina con cappello e vassoio",
        "pos": "50% 55%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/ville_5.webp",
        "alt": "Due cocktail con limone a bordo piscina",
        "pos": "50% 50%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/ville_cover_desktop.webp",
        "alt": "Villa moderna con giardino fiorito",
        "pos": "50% 70%"
      }
    ]
  },
  "fotografia-immobili-pregio": {
    "cover": {
      "desktop": "/images/servizi/pregio_cover_desktop.webp",
      "mobile": "/images/servizi/pregio_cover_mobile.webp",
      "alt": "Grande salone storico con soffitto a cassettoni in legno"
    },
    "portrait": {
      "kind": "img",
      "src": "/images/servizi/pregio_4.webp",
      "alt": "Terrazza coperta ad arco con piante e vista sul mare"
    },
    "rows": [
      {
        "kind": "img",
        "src": "/images/servizi/pregio_1.webp",
        "alt": "Interno storico con vetrate decorate e poltrone rosse"
      },
      {
        "kind": "img",
        "src": "/images/servizi/pregio_2.webp",
        "alt": "Camera con portafinestra affacciata sul tramonto"
      }
    ],
    "cards": [
      {
        "kind": "img",
        "src": "/images/servizi/pregio_3.webp",
        "alt": "Soggiorno moderno con divano e mobile rosso",
        "pos": "50% 55%"
      },
      {
        "kind": "img",
        "src": "/images/servizi/pregio_cover_desktop.webp",
        "alt": "Grande salone storico",
        "pos": "50% 70%"
      }
    ]
  }
};
