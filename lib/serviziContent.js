// Testi delle 6 pagine di servizio, presi dai documenti del cliente
// (cartella 05_Testi). Tutte le pagine usano gli STESSI componenti
// (components/service/*) e la STESSA rotta dinamica app/[servizio]/page.js:
// per aggiungere o modificare una pagina basta intervenire qui.
//
// Campi:
// - meta:       title/description per <head>
// - hero:       titolo (\n = a capo), lead (testo viola grande), body (testo piccolo
//               accanto al ritratto; "cico" davanti è aggiunto dal componente),
//               mediaNote (solo Video: appunto sull'hero con micro video in loop)
// - ctaLabel:   testo dell'eyebrow/CTA sopra la fascia gialla
// - band:       fascia gialla con accordion (rows[].blocks: p | ul)
// - steps:      sezione a due colonne con titolo sticky; link opzionale nello step
// - stepsExtra: (solo Video) seconda lista numerata "Cosa può nascere…"
// - showcase:   progetti correlati da WordPress filtrati per `area` (Macroarea
//               O Tipologia, confronto senza maiuscole) + `servizio`
// - why:        card sovrapposte (2 o 3). `statement` opzionale
// - faq:        domande frequenti (a = array di paragrafi). La prima è aperta
// - blog:       categoria (Macroarea del post) per l'auto-selezione; `fallback`
//               sono i titoli indicati dal cliente, mostrati (non cliccabili)
//               finché in WordPress non esistono articoli per quella categoria
// - cta:        testo del blocco finale e claim del footer

export const servizioPages = {
  "fotografia-hotel": {
    "meta": {
      "title": "Fotografia per hotel in Sicilia — CICO",
      "description": "Immagini pensate per valorizzare gli spazi, raccontare le esperienze e funzionare sui diversi canali del tuo hotel."
    },
    "hero": {
      "title": "Fotografia per hotel\nin Sicilia",
      "lead": "Immagini pensate per valorizzare gli spazi, raccontare le esperienze e funzionare sui diversi canali del tuo hotel.",
      "body": "progetta e produce servizi fotografici per boutique hotel, resort, masserie, dimore storiche e strutture indipendenti in tutta la Sicilia. Dalle immagini per OTA e portali di prenotazione alla fotografia di brand per sito e comunicazione, ogni shooting viene costruito partendo dalla struttura, dalla sua identità e dalla destinazione finale delle immagini.",
      "mediaNote": null
    },
    "ctaLabel": "Parliamo della tua struttura",
    "band": {
      "title": "Fotografie diverse\nper obiettivi diversi",
      "lead": "Fotografia descrittiva ed evocativa rispondono a esigenze diverse, ma possono convivere nello stesso progetto. Le immagini vengono progettate in base a ciò che devono comunicare e al canale in cui verranno utilizzate.",
      "rows": [
        {
          "title": "Fotografia per OTA e portali di prenotazione",
          "blocks": [
            {
              "type": "p",
              "text": "Sulle OTA ogni struttura compete visivamente con molte alternative. Le immagini devono quindi attirare lo sguardo, trasmettere fiducia e rendere immediatamente leggibili spazi, servizi e caratteristiche distintive."
            },
            {
              "type": "p",
              "text": "La fotografia descrittiva ha qui un ruolo fondamentale: camere, suite, bagni, aree comuni, terrazze, piscine, spa e altri ambienti vengono fotografati con un approccio vicino alla fotografia di interior e architettura, lavorando su luce, composizione e prospettiva per valorizzarli senza alterarne la percezione."
            },
            {
              "type": "p",
              "text": "L'obiettivo è costruire una galleria:"
            },
            {
              "type": "ul",
              "items": [
                "immediata e leggibile",
                "professionale e coerente",
                "riconoscibile rispetto alla concorrenza",
                "realistica nelle proporzioni",
                "capace di aumentare la percezione del valore della struttura"
              ]
            },
            {
              "type": "p",
              "text": "All'interno dello stesso shooting possono nascere anche immagini più evocative, ricercate e di forte impatto, utili non soltanto sulle OTA ma anche sul sito e negli altri materiali di comunicazione."
            }
          ]
        },
        {
          "title": "Fotografia di brand per hotel",
          "blocks": [
            {
              "type": "p",
              "text": "La fotografia di brand parte da una domanda diversa: cosa rende questa struttura riconoscibile e desiderabile? Gli spazi rimangono importanti, ma diventano parte di un racconto più ampio, nel quale la fotografia evocativa assume un ruolo centrale."
            },
            {
              "type": "p",
              "text": "La produzione può raccontare architettura, territorio, persone, accoglienza, ristorazione, staff, dettagli, storia ed esperienze offerte agli ospiti. Può comprendere:"
            },
            {
              "type": "ul",
              "items": [
                "immagini di architettura e interior più editoriali",
                "scene lifestyle con modelli",
                "staff e momenti di servizio",
                "ristorazione",
                "territorio e paesaggio",
                "dettagli capaci di raccontare il carattere del luogo"
              ]
            },
            {
              "type": "p",
              "text": "Styling, luce, scelta dei momenti della giornata e direzione delle scene vengono utilizzati per creare immagini coerenti con l'identità reale dell'hotel."
            },
            {
              "type": "p",
              "text": "Il risultato è una libreria fotografica capace di comunicare non soltanto come è fatta la struttura, ma anche che tipo di esperienza e atmosfera propone."
            }
          ]
        }
      ]
    },
    "steps": {
      "title": "Un servizio costruito intorno alla struttura",
      "items": [
        {
          "title": "Brief e piano di shooting",
          "body": "Ogni progetto parte da un confronto sugli obiettivi, sugli ambienti da raccontare e sui canali a cui saranno destinate le immagini. Da qui viene costruito il piano di shooting, tenendo conto di luce, orientamento, disponibilità degli spazi e operatività dell'hotel."
        },
        {
          "title": "Preparazione e styling",
          "body": "La preparazione degli ambienti è parte integrante del lavoro. Negli shooting più semplici può essere gestita insieme allo staff; nelle produzioni di brand più complete, styling e set design vengono curati dal team CICO. Ogni allestimento viene costruito in funzione dell'immagine e del punto di ripresa."
        },
        {
          "title": "Produzione",
          "body": "Lo shooting viene organizzato seguendo luce, disponibilità degli ambienti e operatività della struttura. Quando necessario, la produzione può essere distribuita su più fasce orarie o più giornate per lavorare nelle condizioni migliori e raccontare momenti specifici."
        },
        {
          "title": "Postproduzione e consegna",
          "body": "La galleria viene consegnata già selezionata, postprodotta e adattata ai formati e agli utilizzi previsti per i diversi canali. La consegna fotografica avviene normalmente entro circa 7 giorni dallo shooting.",
          "link": {
            "label": "Approfondisci come lavoriamo durante un servizio fotografico per hotel",
            "href": "/blog"
          }
        }
      ]
    },
    "stepsExtra": null,
    "showcase": {
      "label": "Progetti fotografici per hotel",
      "title": "Una selezione di lavori realizzati",
      "intro": "Una selezione di lavori realizzati per boutique hotel, dimore e strutture indipendenti in Sicilia.",
      "area": "Hotel",
      "servizio": "Fotografia"
    },
    "why": {
      "eyebrow": "Esperienza specifica nell'hospitality",
      "statement": "Fotografare un hotel richiede più della competenza fotografica: significa conoscere le logiche dell'ospitalità, i diversi canali di comunicazione e il modo in cui un ospite percepisce e sceglie una struttura.",
      "cards": [
        {
          "title": "Dal 2010 nel settore hospitality",
          "body": "CICO nasce da un'esperienza nella fotografia per strutture ricettive iniziata nel 2010, con lavori realizzati in tutta la Sicilia, incluse le isole minori."
        },
        {
          "title": "Esperienza diretta con Airbnb e OTA",
          "body": "La direzione fotografica è guidata dal fondatore Giovanni Costagliola, fotografo ufficiale Airbnb, relatore in webinar per la piattaforma e docente in corsi dedicati a host e property manager. Giovanni ha inoltre scritto Picture Perfect Properties, un manuale dedicato alla fotografia per strutture ricettive, pubblicato per una scuola internazionale di fotografia online."
        },
        {
          "title": "Un team, non solo un fotografo",
          "body": "In funzione del progetto, CICO coinvolge photo editor, set designer, videomaker, modelli e altri professionisti del team nelle diverse fasi della produzione."
        }
      ]
    },
    "faq": [
      {
        "q": "Quante fotografie vengono consegnate?",
        "a": [
          "Non esiste un numero fisso valido per ogni struttura. La quantità dipende dagli ambienti, dai servizi presenti e dall'utilizzo finale delle immagini.",
          "L'obiettivo è consegnare una galleria completa, evitando variazioni inutilmente ridondanti."
        ]
      },
      {
        "q": "Quanto dura un servizio fotografico per hotel?",
        "a": [
          "Dipende dal tipo di produzione.",
          "Un servizio destinato principalmente alle OTA può normalmente essere realizzato in una giornata, salvo strutture particolarmente grandi o esigenze specifiche di luce e operatività.",
          "Un servizio fotografico di brand richiede invece spesso due o tre giorni, soprattutto quando vengono coinvolti modelli, staff, ristorazione, esperienze o momenti particolari della giornata."
        ]
      },
      {
        "q": "Quanto costa un servizio fotografico per hotel?",
        "a": [
          "Il costo dipende dalla struttura e dalla complessità della produzione. Un servizio OTA ha esigenze diverse da una produzione di brand con più giornate, styling, set design, modelli e scene dedicate. Per questo ogni progetto viene valutato dopo un primo confronto sugli obiettivi.",
          "La fotografia va comunque considerata come un investimento destinato a durare nel tempo: un hotel può investire molto in architettura, arredi, materiali e servizi, ma se questi elementi vengono comunicati con immagini deboli, una parte del loro valore viene persa prima ancora che l'ospite arrivi."
        ]
      },
      {
        "q": "L'hotel deve essere chiuso durante lo shooting?",
        "a": [
          "No. Lavorare senza ospiti rappresenta la situazione ideale, ma non è sempre possibile né necessario.",
          "Lo shooting può essere organizzato coordinandosi con reception, housekeeping e staff per lavorare negli spazi disponibili interferendo il meno possibile con l'esperienza degli ospiti."
        ]
      },
      {
        "q": "CICO può occuparsi della preparazione e dello styling?",
        "a": [
          "Sì. Nei servizi più semplici la preparazione può essere gestita insieme allo staff interno; nelle produzioni di brand più complete, il team CICO comprende anche la figura del set designer.",
          "L'allestimento viene costruito in funzione delle singole immagini e del racconto."
        ]
      },
      {
        "q": "Cosa succede se il meteo non è favorevole?",
        "a": [
          "Il meteo viene monitorato fino al giorno dello shooting.",
          "Quando le condizioni non permettono di rappresentare correttamente gli esterni, è preferibile modificare la scaletta o riprogrammare quella parte del lavoro."
        ]
      },
      {
        "q": "Il drone è compreso nel servizio?",
        "a": [
          "Quando le condizioni di volo lo consentono, il drone viene considerato uno strumento fotografico come gli altri.",
          "Viene utilizzato quando può valorizzare realmente posizione, architettura, panorama o relazione con il territorio."
        ]
      },
      {
        "q": "Le fotografie vengono realizzate anche in formato verticale?",
        "a": [
          "Sì. Per le OTA prevalgono normalmente immagini orizzontali; per sito e altri utilizzi possono essere previste anche composizioni verticali e formati specifici.",
          "Nel caso di un nuovo sito è utile coordinarsi preventivamente con il web designer."
        ]
      },
      {
        "q": "In quanto tempo vengono consegnate le fotografie?",
        "a": [
          "Normalmente entro circa 7 giorni dallo shooting.",
          "Il lavoro con un team di photo editor permette di mantenere costanti qualità e tempi di consegna anche nei periodi di maggiore produzione."
        ]
      },
      {
        "q": "Come funzionano i diritti di utilizzo?",
        "a": [
          "Le fotografie vengono attualmente consegnate senza costi aggiuntivi per i normali utilizzi concordati su sito, OTA, social e comunicazione dell'hotel.",
          "Eventuali esigenze particolari vengono definite prima della produzione."
        ]
      }
    ],
    "blog": {
      "category": "Hotel",
      "fallback": [
        {
          "title": "Come funziona un servizio fotografico per hotel, dal brief alla consegna",
          "excerpt": "Pianificazione, luce, coordinamento con lo staff e gestione della produzione."
        },
        {
          "title": "Styling e set design nella fotografia per hotel",
          "excerpt": "Come viene costruito un allestimento in funzione dell'immagine e del punto di ripresa."
        },
        {
          "title": "Fotografia descrittiva ed evocativa per hotel: OTA e sito hanno bisogno delle stesse immagini?",
          "excerpt": "Come cambiano composizione, priorità e racconto in funzione del canale, e perché i due linguaggi possono completarsi."
        }
      ]
    },
    "cta": {
      "text": "Se stai aprendo un nuovo hotel, aggiornando immagini non più rappresentative o costruendo una nuova identità fotografica, partiamo dalla struttura e dall'utilizzo reale che dovrai fare delle immagini.",
      "claimPre": "Parliamo della",
      "claimHl": "tua struttura"
    }
  },
  "video-hotel": {
    "meta": {
      "title": "Video per hotel in Sicilia — CICO",
      "description": "Il video non deve mostrare tutto. Deve far immaginare."
    },
    "hero": {
      "title": "Video per hotel\nin Sicilia",
      "lead": "Il video non deve mostrare tutto. Deve far immaginare.",
      "body": "realizza produzioni video per boutique hotel, resort, masserie, dimore storiche e strutture indipendenti in tutta la Sicilia. Brand film, Reel e video dedicati ai servizi vengono progettati per raccontare esperienze, atmosfere e identità, partendo da ciò che rende unica la struttura e da come i contenuti verranno utilizzati.",
      "mediaNote": "Hero: immagine fissa + micro video di 3-5 secondi in loop, di dimensioni ridotte, per evidenziare le varie sezioni"
    },
    "ctaLabel": "Parliamo della tua struttura",
    "band": {
      "title": "Video che raccontano,\nvideo che spiegano",
      "lead": "Il video può fare qualcosa di diverso dalla fotografia: non deve necessariamente descrivere ogni spazio, ma può concentrarsi su ciò che rende un luogo riconoscibile e desiderabile. Un gesto, la luce, il paesaggio, un servizio, un suono o il ritmo di una giornata possono essere sufficienti per suggerire un'esperienza.",
      "rows": [
        {
          "title": "Brand film e video emozionali",
          "blocks": [
            {
              "type": "p",
              "text": "Un brand film racconta soprattutto come ci si può sentire in un luogo."
            },
            {
              "type": "p",
              "text": "Architettura e spazi rimangono parte del racconto, ma vengono affiancati da persone, esperienze, territorio, accoglienza e momenti della giornata."
            },
            {
              "type": "p",
              "text": "Musica, suono, ritmo e montaggio danno forma al carattere del video."
            },
            {
              "type": "p",
              "text": "Quando sono presenti modelli o membri dello staff, il loro ruolo è aiutare chi guarda a immedesimarsi nell'esperienza, non diventare protagonisti della comunicazione."
            }
          ]
        },
        {
          "title": "Video per servizi e comunicazione",
          "blocks": [
            {
              "type": "p",
              "text": "Il video può anche avere una funzione più descrittiva."
            },
            {
              "type": "p",
              "text": "Una spa, una palestra, una suite, un ristorante o un'esperienza possono essere raccontati attraverso contenuti dedicati, capaci di mostrare meglio movimento, atmosfera e modalità di fruizione."
            },
            {
              "type": "p",
              "text": "La forma viene scelta in base a ciò che serve realmente alla struttura: dal Reel verticale a un video più lungo dedicato a uno specifico servizio."
            }
          ]
        }
      ]
    },
    "steps": {
      "title": "Come nasce una produzione video",
      "items": [
        {
          "title": "Concept e piano di ripresa",
          "body": "Partiamo dalla struttura, dal pubblico a cui si rivolge e da ciò che la rende diversa. Da qui costruiamo concept, storyboard e shooting list, lasciando spazio anche alle opportunità creative che emergono durante le riprese."
        },
        {
          "title": "Styling e set design",
          "body": "Nelle produzioni complete, styling e set design fanno parte del lavoro del team CICO. Oggetti, materiali e dettagli vengono curati in funzione dell'inquadratura, del movimento e della continuità tra le scene."
        },
        {
          "title": "Produzione",
          "body": "Le riprese vengono pianificate in base a luce, operatività della struttura e momenti da raccontare, scegliendo di volta in volta tra camera fissa, gimbal, drone e audio in base a quello che aggiungono al racconto."
        },
        {
          "title": "Montaggio e musica",
          "body": "Musica, montaggio, sound design e color grading contribuiscono a definire ritmo, atmosfera e stile del video."
        }
      ]
    },
    "stepsExtra": {
      "title": "Cosa può nascere da una produzione",
      "intro": "Una stessa produzione può generare, in funzione del progetto:",
      "items": [
        "Un brand film principale",
        "Versioni da 60 e 30 secondi",
        "Reel e contenuti verticali",
        "Video più lunghi dedicati a servizi specifici",
        "Una libreria di clip selezionate e pronte all'uso per il team marketing o social"
      ]
    },
    "showcase": {
      "label": "Progetti video per hotel",
      "title": "Una selezione di lavori realizzati",
      "intro": "Una selezione di produzioni realizzate per strutture hospitality in Sicilia.",
      "area": "Hotel",
      "servizio": "Video"
    },
    "why": {
      "eyebrow": "Esperienza video nell'hospitality",
      "statement": "",
      "cards": [
        {
          "title": "Dal 2010 nell'hospitality",
          "body": "La direzione creativa è seguita da Giovanni Costagliola, che lavora nella fotografia hospitality dal 2010 e porta nel video la stessa conoscenza di strutture, ospiti e comunicazione del settore."
        },
        {
          "title": "Fotografia e video nella stessa competenza",
          "body": "CICO integra fotografia e video all'interno dello stesso progetto visuale, permettendo di costruire contenuti complementari invece di produzioni separate e scollegate."
        },
        {
          "title": "Un team piccolo e agile",
          "body": "Le produzioni vengono generalmente gestite da team di 2-3 professionisti, dimensionati sul progetto. Questo permette di mantenere qualità produttiva e, allo stesso tempo, lavorare con maggiore agilità all'interno di strutture operative."
        }
      ]
    },
    "faq": [
      {
        "q": "Quanto dura una produzione video per hotel?",
        "a": [
          "Una produzione completa richiede normalmente due o tre giorni di riprese.",
          "La durata può aumentare quando sono coinvolti modelli, staff, numerose esperienze o quando bisogna lavorare in momenti diversi della giornata."
        ]
      },
      {
        "q": "È necessario utilizzare modelli?",
        "a": [
          "No.",
          "I modelli sono utili quando vogliamo raccontare esperienze e permettere a chi guarda di immedesimarsi, ma il video può essere costruito anche attraverso atmosfere, dettagli, architettura, territorio e luce."
        ]
      },
      {
        "q": "Potete coinvolgere lo staff dell'hotel?",
        "a": [
          "Sì.",
          "Le persone che lavorano realmente nella struttura possono rendere il racconto più credibile, soprattutto quando vengono riprese nel proprio ruolo naturale."
        ]
      },
      {
        "q": "Vi occupate anche dello styling?",
        "a": [
          "Sì.",
          "Nelle produzioni più strutturate il set designer fa parte del team CICO e lavora sulla continuità visiva delle scene, sugli oggetti e sugli allestimenti."
        ]
      },
      {
        "q": "Realizzate anche contenuti verticali?",
        "a": [
          "Sì.",
          "Le riprese possono essere progettate direttamente per il formato verticale, senza limitarsi a ritagliare successivamente un video orizzontale."
        ]
      },
      {
        "q": "Consegnate anche le singole clip?",
        "a": [
          "Sì.",
          "Quando previsto dal progetto, può essere consegnata una libreria organizzata di clip selezionate e pulite, pronta per nuovi montaggi e contenuti social."
        ]
      },
      {
        "q": "Vi occupate anche della gestione dei social?",
        "a": [
          "CICO si occupa principalmente della produzione dei contenuti visuali.",
          "Durante la progettazione possiamo però individuare temi, esperienze e possibili rubriche utili alla comunicazione della struttura.",
          "L'eventuale gestione continuativa dei canali social può essere affidata a partner con cui collaboriamo, e viene valutata separatamente."
        ]
      },
      {
        "q": "Quanto costa una produzione video?",
        "a": [
          "Non esiste un prezzo fisso: la produzione video ha troppe variabili per poter essere stimata a priori, tra presenza di attori o comparse, riprese interne ed esterne, registrazione audio dedicata e quantità di contenuti richiesti (durata, formati, numero di esperienze da raccontare).",
          "Per questo ogni progetto viene valutato dopo un primo confronto sugli obiettivi."
        ]
      },
      {
        "q": "L'hotel deve restare aperto durante le riprese?",
        "a": [
          "Per il video la situazione è più delicata rispetto alla fotografia: la condizione ideale è lavorare a struttura chiusa.",
          "Quando questo non è possibile, gli ospiti presenti vanno informati in anticipo delle riprese e degli orari coinvolti, va richiesta una liberatoria firmata a chi potrebbe comparire anche solo casualmente nelle inquadrature, e le aree interessate dalle riprese vengono temporaneamente chiuse al pubblico per il tempo necessario."
        ]
      },
      {
        "q": "Potete registrare interviste, voce e suoni ambientali?",
        "a": [
          "Sì.",
          "Quando il progetto lo richiede possiamo integrare registrazione professionale di voce, interviste, dialoghi e suoni ambientali."
        ]
      },
      {
        "q": "Come vengono gestite musica e revisioni?",
        "a": [
          "La musica viene scelta e condivisa nelle prime fasi perché influenza direttamente ritmo e montaggio.",
          "Una buona definizione iniziale di concept, musica e struttura permette normalmente di concentrare le revisioni finali su modifiche mirate."
        ]
      },
      {
        "q": "Come funzionano i diritti di utilizzo?",
        "a": [
          "I video vengono consegnati senza limitazioni aggiuntive per i normali utilizzi concordati su sito, social e comunicazione della struttura.",
          "Le musiche utilizzate vengono selezionate con licenze adeguate agli utilizzi previsti."
        ]
      },
      {
        "q": "Posso utilizzare musiche scelte da me nei video?",
        "a": [
          "Nei video prodotti da CICO no: i brani commerciali (streaming, playlist, brani \"famosi\") non hanno quasi mai diritti disponibili per questo tipo di utilizzo, quindi selezioniamo musiche con licenze adeguate al progetto.",
          "Il discorso è diverso per i contenuti che pubblichi tu direttamente sui social, ad esempio storie, caroselli o Reel montati con app come Edits di Instagram: in quel caso puoi scegliere la musica direttamente dalla libreria della piattaforma, che include già le licenze necessarie per quell'uso."
        ]
      }
    ],
    "blog": {
      "category": "Hotel",
      "fallback": [
        {
          "title": "Come nasce un video per hotel: dal concept alle riprese",
          "excerpt": "Dalla lettura della struttura alla costruzione di situazioni, atmosfera e piano di ripresa."
        },
        {
          "title": "Brand film, Reel o libreria di clip: quale video serve davvero a un hotel?",
          "excerpt": "Formati diversi rispondono a obiettivi diversi: come scegliere cosa produrre e dove utilizzarlo."
        }
      ]
    },
    "cta": {
      "text": "Partiamo dalla struttura, da ciò che vuoi raccontare e da come utilizzerai i contenuti.",
      "claimPre": "Parliamo del",
      "claimHl": "tuo progetto video"
    }
  },
  "fotografia-bb": {
    "meta": {
      "title": "Fotografia per B&B in Sicilia — CICO",
      "description": "Immagini professionali per valorizzare camere, comfort e carattere della struttura sui portali di prenotazione."
    },
    "hero": {
      "title": "Fotografia per B&B\nin Sicilia",
      "lead": "Immagini professionali per valorizzare camere, comfort e carattere della struttura sui portali di prenotazione.",
      "body": "realizza servizi fotografici per B&B, affittacamere, dimore e piccole strutture ricettive in tutta la Sicilia. Il punto di partenza è costruire una galleria completa e professionale per Booking e gli altri portali di prenotazione. Quando la struttura ha un'identità più forte, lo shooting può comprendere anche contenuti dedicati a sito e comunicazione.",
      "mediaNote": null
    },
    "ctaLabel": "Parliamo della tua struttura",
    "band": {
      "title": "Una buona galleria deve rispondere alle domande dell'ospite",
      "lead": "Prima di prenotare, un ospite vuole capire dove si trova la struttura, come sono le camere, quanto saranno confortevoli e cosa troverà realmente al suo arrivo.",
      "rows": [
        {
          "title": "Fotografia per Booking e portali di prenotazione",
          "blocks": [
            {
              "type": "p",
              "text": "Per questo fotografiamo non soltanto camere e bagni, ma anche ingresso, spazi comuni, colazione e tutti gli elementi che possono influire sulla scelta. Quando sono presenti camere o categorie diverse, la copertura viene organizzata in modo che ogni tipologia sia rappresentata con chiarezza, evitando ripetizioni inutili."
            },
            {
              "type": "p",
              "text": "Luce, composizione e prospettiva vengono utilizzate per valorizzare gli ambienti mantenendone una rappresentazione realistica."
            },
            {
              "type": "p",
              "text": "La galleria viene progettata considerando quantità, varietà e sequenza delle immagini, evitando fotografie ridondanti e assicurandosi che non manchino informazioni importanti per chi sta valutando la prenotazione."
            },
            {
              "type": "p",
              "text": "L'obiettivo è presentare la struttura in modo chiaro, curato e coerente con ciò che l'ospite troverà realmente."
            }
          ]
        },
        {
          "title": "Quando il B&B ha qualcosa in più da raccontare",
          "blocks": [
            {
              "type": "p",
              "text": "Non tutti i B&B hanno bisogno di una vera produzione di brand."
            },
            {
              "type": "p",
              "text": "Quando però la struttura ha un'identità riconoscibile per design, posizione, panorama, servizi o atmosfera, lo shooting può essere ampliato con immagini più narrative destinate anche a sito e social."
            },
            {
              "type": "p",
              "text": "L'obiettivo rimane valorizzare ciò che rende il B&B diverso, senza costruire aspettative lontane dalla realtà."
            }
          ]
        }
      ]
    },
    "steps": {
      "title": "Un servizio proporzionato alla struttura",
      "items": [
        {
          "title": "Preparazione",
          "body": "Camere, bagni e spazi comuni vengono preparati con attenzione a letti, tessili, ordine degli oggetti e dettagli. Quando la colazione fa parte dell'offerta, viene preparata anche per lo shooting."
        },
        {
          "title": "Shooting",
          "body": "Un servizio fotografico per B&B richiede generalmente da alcune ore a una giornata, in funzione del numero di camere, delle diverse tipologie e degli spazi comuni da raccontare."
        },
        {
          "title": "Styling quando serve",
          "body": "Per molte strutture è sufficiente una preparazione accurata e qualche piccolo intervento durante lo shooting. Quando invece sono presenti terrazze, piscina, spa o altri spazi da vivere, può essere utile coinvolgere una stylist per costruire immagini più curate e rappresentative dell'esperienza."
        },
        {
          "title": "Postproduzione e consegna",
          "body": "La galleria viene consegnata già selezionata e postprodotta, pronta per essere utilizzata sui portali e sugli altri canali previsti dal progetto."
        }
      ]
    },
    "stepsExtra": null,
    "showcase": {
      "label": "Progetti fotografici per B&B",
      "title": "Una selezione di lavori realizzati",
      "intro": "Una selezione di servizi realizzati per B&B e piccole strutture ricettive in Sicilia.",
      "area": "B&B",
      "servizio": "Fotografia"
    },
    "why": {
      "eyebrow": "Esperienza specifica nell'hospitality",
      "statement": "",
      "cards": [
        {
          "title": "Dal 2010 nel settore hospitality",
          "body": "CICO nasce da un'esperienza nella fotografia per strutture ricettive iniziata nel 2010, con lavori realizzati in tutta la Sicilia, dalle piccole strutture indipendenti a produzioni hospitality più articolate."
        },
        {
          "title": "Esperienza con portali e OTA",
          "body": "La direzione fotografica è seguita da Giovanni Costagliola, con esperienza diretta nella fotografia per strutture vendute attraverso portali e piattaforme di prenotazione. Questa conoscenza permette di progettare le gallerie considerando non soltanto la qualità delle singole fotografie, ma anche completezza, leggibilità e modo in cui l'ospite esplora la struttura prima di prenotare."
        }
      ]
    },
    "faq": [
      {
        "q": "Quanto dura un servizio fotografico per B&B?",
        "a": [
          "Generalmente da alcune ore a una giornata.",
          "La durata dipende dal numero di camere, dalle diverse tipologie, dagli spazi comuni e dagli eventuali contenuti aggiuntivi da realizzare."
        ]
      },
      {
        "q": "Quali ambienti devono essere fotografati?",
        "a": [
          "Oltre alle camere è importante mostrare bagni, ingresso, spazi comuni, colazione ed eventuali servizi caratterizzanti.",
          "La copertura viene definita in base alla struttura e alle informazioni utili per chi sta valutando il soggiorno."
        ]
      },
      {
        "q": "Come vengono gestite camere o categorie diverse?",
        "a": [
          "Quando le camere presentano caratteristiche, dimensioni o dotazioni differenti, ogni tipologia viene fotografata separatamente.",
          "L'obiettivo è permettere all'ospite di capire chiaramente cosa sta scegliendo e quali differenze esistono tra una categoria e l'altra."
        ]
      },
      {
        "q": "Perché è importante fotografare bene anche i bagni?",
        "a": [
          "Il bagno contribuisce in modo importante alla percezione di pulizia, comfort e qualità della camera.",
          "Per questo non dovrebbe essere trattato come un ambiente secondario o mostrato con immagini poco rappresentative."
        ]
      },
      {
        "q": "Quante fotografie vengono consegnate?",
        "a": [
          "Non esiste un numero fisso valido per ogni B&B.",
          "La quantità dipende dal numero di camere, dagli spazi presenti e dalla necessità di costruire una galleria completa senza riempirla di immagini troppo simili."
        ]
      },
      {
        "q": "Possiamo realizzare anche fotografie per sito e social?",
        "a": [
          "Sì.",
          "Quando il progetto lo richiede possiamo affiancare alla galleria principale immagini più narrative, dettagli, formati verticali, territorio o altri contenuti destinati alla comunicazione."
        ]
      },
      {
        "q": "È necessario uno stylist?",
        "a": [
          "Non sempre.",
          "Per molti B&B è sufficiente preparare accuratamente gli ambienti e gestire durante lo shooting piccoli interventi di styling.",
          "Per strutture con spa, piscina, terrazze o importanti aree comuni, l'intervento di una stylist può contribuire in modo significativo al risultato."
        ]
      },
      {
        "q": "Bisogna preparare la colazione per lo shooting?",
        "a": [
          "Quando la colazione è parte dell'offerta, sì.",
          "Non serve necessariamente fotografare ogni singolo prodotto, ma è importante rappresentarla in modo coerente con ciò che l'ospite troverà realmente durante il soggiorno."
        ]
      },
      {
        "q": "È possibile mostrare anche la posizione e il contesto?",
        "a": [
          "Sì.",
          "Quando posizione, vista, quartiere o territorio rappresentano un elemento importante della scelta, possono diventare parte del servizio fotografico."
        ]
      },
      {
        "q": "Realizzate anche riprese con drone?",
        "a": [
          "Quando sono realmente utili e le condizioni lo permettono, sì.",
          "Il drone può aiutare a mostrare posizione, panorama e relazione della struttura con il contesto."
        ]
      },
      {
        "q": "Cosa succede se il meteo non è favorevole?",
        "a": [
          "Quando il servizio comprende terrazze, esterni, panorama o drone, il meteo viene monitorato fino al giorno dello shooting.",
          "Se le condizioni non permettono di rappresentare correttamente gli esterni, quella parte della produzione può essere modificata o riprogrammata."
        ]
      },
      {
        "q": "In quanto tempo vengono consegnate le fotografie?",
        "a": [
          "Normalmente entro circa 7 giorni dallo shooting."
        ]
      },
      {
        "q": "Come funzionano i diritti di utilizzo?",
        "a": [
          "Le fotografie vengono consegnate senza costi aggiuntivi per i normali utilizzi concordati su Booking, altri portali, sito, social e comunicazione della struttura.",
          "Eventuali esigenze particolari vengono definite prima dello shooting."
        ]
      },
      {
        "q": "Quanto costa un servizio fotografico per B&B?",
        "a": [
          "Il costo dipende dal numero di camere, dagli spazi da fotografare e dalla complessità del progetto.",
          "Una galleria essenziale per i portali richiede una produzione diversa da uno shooting che comprende anche styling, esterni e contenuti aggiuntivi.",
          "Per questo ogni servizio viene valutato dopo un primo confronto sulla struttura."
        ]
      }
    ],
    "blog": {
      "category": "B&B",
      "fallback": [
        {
          "title": "Come costruire una galleria fotografica efficace per Booking",
          "excerpt": "Quali immagini mostrare, in quale ordine e quali errori evitare quando si presenta una struttura sui portali."
        },
        {
          "title": "Cosa vuole vedere davvero un ospite prima di prenotare un B&B",
          "excerpt": "Camere, bagni, colazione, posizione e servizi: quali elementi aiutano a comprendere realmente una struttura."
        }
      ]
    },
    "cta": {
      "text": "Partiamo dalla struttura, dalle camere da raccontare e dai canali su cui verranno utilizzate le immagini.",
      "claimPre": "Parliamo del",
      "claimHl": "tuo B&B"
    }
  },
  "fotografia-appartamenti-airbnb": {
    "meta": {
      "title": "Fotografia per appartamenti Airbnb in Sicilia — CICO",
      "description": "Immagini pensate per rendere l'annuncio più chiaro, desiderabile e professionale."
    },
    "hero": {
      "title": "Fotografia per appartamenti\nAirbnb in Sicilia",
      "lead": "Immagini pensate per rendere l'annuncio più chiaro, desiderabile e professionale.",
      "body": "realizza servizi fotografici per appartamenti turistici e case vacanza gestiti da host e property manager in tutta la Sicilia. La galleria viene progettata principalmente per Airbnb e i portali di prenotazione, mostrando in modo chiaro spazi, comfort, dotazioni e caratteristiche dell'alloggio.",
      "mediaNote": null
    },
    "ctaLabel": "Parliamo del tuo appartamento",
    "band": {
      "title": "Un buon annuncio deve far capire e desiderare la casa",
      "lead": "Chi cerca un alloggio su Airbnb deve poter capire rapidamente come sono distribuiti gli spazi, cosa troverà durante il soggiorno e quali caratteristiche distinguono l'appartamento. Non servono decine di fotografie simili: servono le immagini giuste, nell'ordine giusto, capaci di creare fiducia, desiderio e una percezione professionale dell'annuncio.",
      "rows": [
        {
          "title": "Fotografia pensata per Airbnb",
          "blocks": [
            {
              "type": "p",
              "text": "La galleria viene costruita seguendo le logiche del tour fotografico di Airbnb, integrate con l'esperienza maturata sul campo."
            },
            {
              "type": "p",
              "text": "Particolare attenzione viene dedicata alla foto di copertina, alla sequenza delle immagini e alla completezza delle informazioni, selezionando le inquadrature che valorizzano meglio ogni appartamento."
            },
            {
              "type": "p",
              "text": "L'obiettivo è creare un annuncio chiaro, riconoscibile e piacevole da esplorare, senza fotografie mancanti o inutilmente ripetitive."
            }
          ]
        },
        {
          "title": "La qualità della fotografia di interni",
          "blocks": [
            {
              "type": "p",
              "text": "Anche un appartamento semplice può essere raccontato attraverso immagini curate, con la pulizia compositiva e l'equilibrio visivo della fotografia di interior design."
            },
            {
              "type": "p",
              "text": "Luce naturale, prospettive corrette e attenzione a colori, arredi e proporzioni permettono di valorizzare gli ambienti senza alterarne la percezione."
            },
            {
              "type": "p",
              "text": "Una fotografia deve essere piacevole da guardare e, allo stesso tempo, fedele a ciò che l'ospite troverà al suo arrivo."
            }
          ]
        }
      ]
    },
    "steps": {
      "title": "Come viene realizzato lo shooting",
      "items": [
        {
          "title": "Preparazione",
          "body": "Prima del servizio viene inviata una guida per preparare l'appartamento. Sul posto interveniamo quando necessario su disposizione degli oggetti, tessili e piccoli dettagli per migliorare ordine e composizione."
        },
        {
          "title": "Shooting",
          "body": "Un appartamento richiede normalmente da una a tre ore di lavoro. Gli interni vengono fotografati privilegiando la luce naturale e mantenendo colori, materiali e proporzioni credibili. Quando terrazza o vista sono elementi importanti dell'annuncio, lo shooting può essere programmato nel momento della giornata più adatto."
        },
        {
          "title": "Postproduzione e consegna",
          "body": "Le fotografie vengono selezionate e postprodotte e la galleria viene consegnata pronta per essere utilizzata su Airbnb e sugli altri portali di prenotazione."
        }
      ]
    },
    "stepsExtra": null,
    "showcase": {
      "label": "Progetti fotografici per appartamenti",
      "title": "Una selezione di lavori realizzati",
      "intro": "Una selezione di servizi realizzati per appartamenti turistici e case vacanza in Sicilia.",
      "area": "Appartamenti",
      "servizio": "Fotografia"
    },
    "why": {
      "eyebrow": "Per host e property manager",
      "statement": "Per un host, immagini professionali contribuiscono a presentare l'alloggio con maggiore cura, chiarezza e affidabilità.",
      "cards": [
        {
          "title": "Più immobili, criteri coerenti",
          "body": "Per chi gestisce più immobili, il servizio può essere organizzato su più appartamenti mantenendo criteri coerenti di preparazione, copertura fotografica e qualità delle gallerie. Quando gli immobili e gli accessi lo permettono, più shooting possono essere coordinati nella stessa giornata o nello stesso periodo. Una qualità fotografica coerente rende inoltre più professionale il portfolio del property manager, anche verso i proprietari."
        },
        {
          "title": "Conoscere la piattaforma, non soltanto fotografare gli spazi",
          "body": "La direzione fotografica è seguita da Giovanni Costagliola, con esperienza diretta nella fotografia per Airbnb e strutture destinate agli affitti brevi. Le indicazioni della piattaforma sono un punto di partenza utile, ma applicate nello stesso modo a ogni immobile rischiano di produrre annunci troppo simili: ogni galleria viene adattata alle caratteristiche reali dell'appartamento."
        },
        {
          "title": "Dal 2010 nell'hospitality",
          "body": "L'esperienza nella fotografia per strutture ricettive permette di leggere l'immobile anche dal punto di vista di chi sta valutando il soggiorno e delle informazioni di cui ha bisogno prima di prenotare."
        }
      ]
    },
    "faq": [
      {
        "q": "Quanto dura un servizio fotografico per appartamento?",
        "a": [
          "Generalmente da una a tre ore.",
          "La durata dipende dalle dimensioni, dal numero degli ambienti e dalla presenza di terrazze, viste o altri elementi che richiedono condizioni particolari."
        ]
      },
      {
        "q": "Quante fotografie vengono consegnate?",
        "a": [
          "Non esiste un numero fisso.",
          "La galleria viene costruita per rappresentare in maniera completa l'appartamento, evitando sia carenze informative sia fotografie inutilmente ripetitive."
        ]
      },
      {
        "q": "Le fotografie sono ottimizzate per Airbnb e posso utilizzarle anche su altri portali?",
        "a": [
          "Sì.",
          "La copertura viene progettata considerando il tour fotografico, la foto di copertina e la costruzione complessiva della galleria Airbnb.",
          "Le stesse fotografie possono essere utilizzate anche su Booking e sugli altri portali di prenotazione, eventualmente selezionando un numero più ridotto di immagini quando il canale richiede una presentazione più essenziale."
        ]
      },
      {
        "q": "Il proprietario deve essere presente durante lo shooting?",
        "a": [
          "No.",
          "Se abbiamo ricevuto tutte le informazioni necessarie e l'accesso è organizzato tramite chiavi, self check-in o una persona di riferimento, il servizio può essere realizzato in autonomia.",
          "Per immobili occupati o gestiti su più prenotazioni concordiamo la fascia oraria in base alla disponibilità dell'alloggio."
        ]
      },
      {
        "q": "È possibile organizzare servizi per più appartamenti?",
        "a": [
          "Sì.",
          "Per property manager, co-host e società di gestione possiamo pianificare più immobili coordinando date, accessi e spostamenti.",
          "Quando posizione e disponibilità lo consentono, più appartamenti possono essere fotografati nella stessa giornata mantenendo lo stesso livello qualitativo e criteri coerenti tra gli annunci."
        ]
      },
      {
        "q": "Come devo preparare l'appartamento?",
        "a": [
          "Prima dello shooting viene fornita una guida con le indicazioni principali.",
          "Possiamo inoltre confrontarci preventivamente su esigenze specifiche.",
          "Se l'immobile necessita di interventi più importanti sulla preparazione o sull'arredo, può essere valutata separatamente una consulenza di Home Staging."
        ]
      },
      {
        "q": "Serve uno stylist?",
        "a": [
          "Per un normale servizio destinato ad Airbnb, generalmente no.",
          "Una buona preparazione dell'appartamento e piccoli interventi durante lo shooting sono sufficienti nella maggior parte dei casi."
        ]
      },
      {
        "q": "Se il cielo è nuvoloso bisogna rimandare?",
        "a": [
          "Non necessariamente.",
          "Per gli interni una giornata nuvolosa può produrre una luce morbida e uniforme, spesso molto piacevole.",
          "Se terrazza, panorama o vista rappresentano elementi fondamentali dell'annuncio, è invece preferibile scegliere condizioni meteorologiche adeguate."
        ]
      },
      {
        "q": "Fotografate anche dotazioni e accessori?",
        "a": [
          "Sì, quando rappresentano informazioni utili per l'ospite.",
          "Lavatrice, lavastoviglie, postazione di lavoro, cucina attrezzata, accessibilità e altre dotazioni possono essere mostrate quando contribuiscono a comprendere meglio l'offerta."
        ]
      },
      {
        "q": "Quanto costa un servizio fotografico per appartamento?",
        "a": [
          "Il costo dipende principalmente dalle dimensioni dell'immobile, dalla posizione, dal numero di appartamenti da fotografare e dalle esigenze dello shooting.",
          "Il servizio viene definito dopo aver visto l'immobile e compreso il lavoro necessario per costruire una galleria completa."
        ]
      },
      {
        "q": "In quanto tempo vengono consegnate le fotografie?",
        "a": [
          "Normalmente entro circa 7 giorni dallo shooting."
        ]
      },
      {
        "q": "Come funzionano i diritti di utilizzo?",
        "a": [
          "Le fotografie vengono consegnate senza costi aggiuntivi per i normali utilizzi concordati su Airbnb, altri portali, sito e comunicazione dell'immobile o del property manager."
        ]
      }
    ],
    "blog": {
      "category": "Host",
      "fallback": [
        {
          "title": "Come costruire una galleria fotografica efficace per Airbnb",
          "excerpt": "Foto di copertina, tour fotografico, sequenza e quantità di immagini: come costruire un annuncio completo senza renderlo uguale a tutti gli altri."
        },
        {
          "title": "Come preparare un appartamento prima del servizio fotografico",
          "excerpt": "Ordine, tessili, superfici, dotazioni e piccoli dettagli che possono cambiare il risultato dello shooting."
        }
      ]
    },
    "cta": {
      "text": "Partiamo dall'immobile e dalle informazioni che il tuo annuncio deve riuscire a comunicare.",
      "claimPre": "Parliamo del",
      "claimHl": "tuo appartamento"
    }
  },
  "fotografia-ville": {
    "meta": {
      "title": "Fotografia per ville Airbnb in Sicilia — CICO",
      "description": "Immagini pensate per valorizzare spazi esterni, esperienze e caratteristiche della proprietà."
    },
    "hero": {
      "title": "Fotografia per ville\nAirbnb in Sicilia",
      "lead": "Immagini pensate per valorizzare spazi esterni, esperienze e caratteristiche della proprietà.",
      "body": "realizza servizi fotografici per ville, case vacanza e proprietà destinate agli affitti brevi in tutta la Sicilia. La galleria viene progettata principalmente per Airbnb e i portali di prenotazione, con particolare attenzione a esterni, piscina, panorama, spazi da vivere e relazione tra la casa e il contesto.",
      "mediaNote": null
    },
    "ctaLabel": "Parliamo della tua villa",
    "band": {
      "title": "Una villa non si racconta soltanto attraverso gli interni",
      "lead": "Una villa viene scelta anche per come permetterà agli ospiti di vivere il soggiorno. Piscina, terrazze, giardino e panorama devono essere mostrati non soltanto come ambienti, ma come luoghi da utilizzare. Per questo, rispetto a uno shooting di un appartamento, assumono maggiore importanza luce, orario, preparazione degli esterni e relazione tra interno e fuori.",
      "rows": [
        {
          "title": "Fotografia pensata per Airbnb",
          "blocks": [
            {
              "type": "p",
              "text": "La galleria viene costruita considerando le logiche di Airbnb, con particolare attenzione a foto di copertina, prime immagini e sequenza dell'annuncio. Interni e camere devono rimanere completi e facilmente leggibili, ma la copertura valorizza anche:"
            },
            {
              "type": "ul",
              "items": [
                "piscina e aree relax",
                "terrazze e zone pranzo",
                "giardino e spazi esterni",
                "panorama e viste",
                "accessi e contesto",
                "dotazioni ed eventuali servizi particolari"
              ]
            },
            {
              "type": "p",
              "text": "Particolare attenzione viene data alla continuità tra interni ed esterni: aperture verso la piscina, viste dalle camere, accesso alla terrazza o relazione tra living e outdoor aiutano l'ospite a capire come la proprietà viene realmente vissuta."
            },
            {
              "type": "p",
              "text": "L'obiettivo è mostrare non soltanto come è fatta la villa, ma anche che tipo di soggiorno può offrire."
            }
          ]
        },
        {
          "title": "Raccontare l'esperienza senza creare una scena artificiale",
          "blocks": [
            {
              "type": "p",
              "text": "Gli spazi esterni vuoti possono risultare corretti ma poco coinvolgenti."
            },
            {
              "type": "p",
              "text": "Per questo lavoriamo con allestimenti semplici e credibili: una tavola preparata, un aperitivo, un libro a bordo piscina o pochi elementi capaci di suggerire l'utilizzo dello spazio. Quando possibile utilizziamo anche piatti, bicchieri e dotazioni realmente presenti nella proprietà, insieme a semplici prodotti freschi o locali."
            },
            {
              "type": "p",
              "text": "Ciò che viene mostrato deve rimanere coerente con ciò che l'ospite troverà durante il soggiorno."
            }
          ]
        }
      ]
    },
    "steps": {
      "title": "Luce e preparazione fanno parte dello shooting",
      "items": [
        {
          "title": "Orario",
          "body": "Prima del servizio vengono valutate posizione, esposizione e immagini esistenti della proprietà per individuare la fascia oraria più adatta, soprattutto per facciata, piscina, vista e principali spazi esterni."
        },
        {
          "title": "Preparazione e styling",
          "body": "Nelle ville la preparazione degli esterni è parte integrante del servizio. Quando serve, una stylist cura allestimenti semplici e coerenti con l'uso reale degli spazi, utilizzando dotazioni della casa, oggetti del nostro set e piccoli elementi freschi."
        },
        {
          "title": "Shooting",
          "body": "Interni ed esterni vengono fotografati seguendo luce e caratteristiche della proprietà. Quando il progetto lo richiede possono essere previste anche golden hour, tramonto o prime ore del mattino."
        },
        {
          "title": "Drone",
          "body": "Il drone viene utilizzato quando permette di raccontare meglio posizione, panorama, rapporto con il mare, isolamento o relazione con il territorio. Quando è utile al progetto e le condizioni lo consentono, viene integrato nel servizio senza essere trattato come un semplice extra tecnico."
        }
      ]
    },
    "stepsExtra": null,
    "showcase": {
      "label": "Progetti fotografici per ville",
      "title": "Una selezione di lavori realizzati",
      "intro": "Una selezione di servizi realizzati per ville e case vacanza in Sicilia.",
      "area": "Ville",
      "servizio": "Fotografia"
    },
    "why": {
      "eyebrow": "Per host e property manager",
      "statement": "Per un host, una galleria professionale aiuta a mostrare in modo più chiaro ciò che rende la villa diversa: spazi esterni, vista, servizi e modo in cui può essere vissuta.",
      "cards": [
        {
          "title": "Più proprietà, qualità coerente",
          "body": "Per property manager e società di gestione che lavorano con più proprietà, la produzione può essere pianificata coordinando accessi, condizioni di luce e priorità specifiche di ogni villa, mantenendo una qualità visiva coerente tra gli annunci. Quando necessario, il servizio può essere ampliato con contenuti dedicati a sito e social o con una produzione video."
        },
        {
          "title": "Conoscere la piattaforma, senza rendere tutte le proprietà uguali",
          "body": "La direzione fotografica è seguita da Giovanni Costagliola, con esperienza diretta nella fotografia per Airbnb e strutture destinate agli affitti brevi. Le indicazioni della piattaforma aiutano a costruire una galleria completa, ma ogni villa richiede una lettura specifica di spazi esterni, posizione, luce e caratteristiche distintive."
        },
        {
          "title": "Dal 2010 nell'hospitality",
          "body": "CICO porta in ogni progetto un'esperienza nella fotografia hospitality iniziata nel 2010, applicata alle esigenze reali di chi deve scegliere e prenotare una proprietà online."
        }
      ]
    },
    "faq": [
      {
        "q": "Quanto dura un servizio fotografico per una villa?",
        "a": [
          "Dipende dalle dimensioni della proprietà, dal numero degli ambienti e soprattutto dagli spazi esterni.",
          "La produzione viene organizzata in funzione della luce e degli elementi principali da raccontare."
        ]
      },
      {
        "q": "Come scegliete l'orario dello shooting? Sono possibili alba o tramonto?",
        "a": [
          "Valutiamo esposizione, orientamento della facciata, piscina, panorama e caratteristiche degli esterni.",
          "Quando aggiungono realmente valore alla proprietà possono essere previste anche riprese in golden hour, al tramonto o nelle prime ore del mattino."
        ]
      },
      {
        "q": "Utilizzate oggetti di scena?",
        "a": [
          "Sì.",
          "Portiamo una selezione di libri, riviste, cappelli, tessuti e altri piccoli elementi utili a suggerire come possono essere vissuti gli spazi.",
          "Utilizziamo inoltre, quando disponibili, le dotazioni reali della casa e semplici prodotti freschi o locali.",
          "Gli oggetti di scena non servono a inventare qualcosa che non esiste, ma a rendere più leggibile l'esperienza dell'ospite."
        ]
      },
      {
        "q": "Il drone è compreso nel servizio?",
        "a": [
          "Quando è utile al progetto e le condizioni di volo lo consentono, sì.",
          "Viene utilizzato soprattutto per mostrare posizione, panorama e relazione della villa con il contesto."
        ]
      },
      {
        "q": "Cosa succede se il meteo non è favorevole?",
        "a": [
          "Per una villa il meteo ha un peso importante perché una parte significativa del servizio riguarda gli esterni.",
          "Le condizioni vengono monitorate fino allo shooting e, se necessario, la programmazione può essere modificata per rappresentare correttamente piscina, vista e spazi outdoor."
        ]
      },
      {
        "q": "La villa deve essere completamente preparata prima del vostro arrivo?",
        "a": [
          "Sì.",
          "Gli ambienti devono essere puliti, ordinati e con le principali dotazioni disponibili.",
          "Prima dello shooting possiamo fornire indicazioni sulla preparazione; durante il servizio curiamo poi gli allestimenti necessari alle singole fotografie."
        ]
      },
      {
        "q": "Le fotografie sono pensate per Airbnb?",
        "a": [
          "Sì.",
          "La galleria viene costruita considerando completezza, copertina, sequenza iniziale e caratteristiche che influenzano la scelta dell'ospite.",
          "Le immagini possono essere utilizzate anche sugli altri portali di prenotazione."
        ]
      },
      {
        "q": "È possibile organizzare servizi per più ville?",
        "a": [
          "Sì.",
          "Per property manager e società di gestione possiamo pianificare più proprietà coordinando date, accessi, spostamenti e condizioni di luce per ciascuna villa."
        ]
      },
      {
        "q": "Possiamo realizzare anche contenuti per sito e social?",
        "a": [
          "Sì.",
          "Quando la comunicazione della proprietà lo richiede possiamo integrare immagini verticali, dettagli, contesto e altri contenuti dedicati a sito e social.",
          "Per esigenze più articolate può essere valutata anche una produzione video."
        ]
      },
      {
        "q": "Quanto costa un servizio fotografico per una villa?",
        "a": [
          "Il costo dipende da dimensioni, posizione, numero degli spazi, complessità degli esterni e organizzazione dello shooting.",
          "Una produzione realizzata in una singola fascia oraria richiede un'organizzazione diversa da un servizio che comprende più momenti della giornata o contenuti aggiuntivi.",
          "Per questo ogni progetto viene valutato dopo aver visto la proprietà e definito le esigenze della galleria."
        ]
      },
      {
        "q": "In quanto tempo vengono consegnate le fotografie?",
        "a": [
          "Normalmente entro circa 7 giorni dallo shooting."
        ]
      },
      {
        "q": "Come funzionano i diritti di utilizzo?",
        "a": [
          "Le fotografie vengono consegnate senza costi aggiuntivi per i normali utilizzi concordati su Airbnb, altri portali, sito, social e comunicazione della proprietà o del property manager."
        ]
      }
    ],
    "blog": {
      "category": "Host",
      "fallback": [
        {
          "title": "Come fotografare gli spazi esterni di una villa per Airbnb",
          "excerpt": "Piscina, terrazze, panorama e zone relax: perché luce, orario e allestimento cambiano la percezione della proprietà."
        },
        {
          "title": "Alba, tramonto o pieno giorno: quando fotografare una casa vacanza",
          "excerpt": "Come esposizione, orientamento e caratteristiche della proprietà determinano il momento migliore per lo shooting."
        }
      ]
    },
    "cta": {
      "text": "Partiamo dalla proprietà, dai suoi spazi esterni e da ciò che deve emergere nell'annuncio.",
      "claimPre": "Parliamo della",
      "claimHl": "tua villa"
    }
  },
  "fotografia-immobili-pregio": {
    "meta": {
      "title": "Fotografia per immobili di pregio in Sicilia — CICO",
      "description": "Un servizio fotografico costruito intorno al carattere della proprietà, alla luce e ai dettagli che ne definiscono il valore."
    },
    "hero": {
      "title": "Fotografia per immobili\ndi pregio in Sicilia",
      "lead": "Un servizio fotografico costruito intorno al carattere della proprietà, alla luce e ai dettagli che ne definiscono il valore.",
      "body": "Non esiste un'unica idea di pregio. Può essere nell'architettura, nei materiali, nella storia, nel paesaggio, nel design o semplicemente nel modo in cui una casa è stata pensata e vissuta. CICO realizza servizi fotografici per ville, appartamenti e proprietà di particolare carattere in tutta la Sicilia, costruendo ogni progetto a partire dalle caratteristiche reali della proprietà e da come deve essere raccontata.",
      "mediaNote": null
    },
    "ctaLabel": "Parliamo della tua proprietà",
    "band": {
      "title": "Non si tratta di fotografare di più. Si tratta di guardare meglio.",
      "lead": "In una proprietà di pregio il lavoro cambia ritmo. Il tempo viene utilizzato per osservare la proprietà, aspettare la luce giusta, preparare le scene e concentrarsi sui dettagli che ne definiscono il carattere. Questo servizio è indicato quando la proprietà richiede più tempo, attenzione e interpretazione rispetto a una normale galleria per i portali.",
      "rows": [
        {
          "title": "Un progetto costruito insieme",
          "blocks": [
            {
              "type": "p",
              "text": "Il lavoro parte da un briefing con il proprietario o con chi segue la comunicazione, per capire quali caratteristiche della casa devono emergere e come verranno utilizzate le immagini."
            },
            {
              "type": "p",
              "text": "Non applichiamo un'estetica predefinita."
            },
            {
              "type": "p",
              "text": "L'esperienza nella fotografia hospitality viene messa al servizio della proprietà e della visione di chi la conosce meglio."
            }
          ]
        },
        {
          "title": "Oltre la semplice descrizione degli spazi",
          "blocks": [
            {
              "type": "p",
              "text": "La fotografia continua a mostrare ambienti e caratteristiche della proprietà, ma può spingersi oltre la semplice documentazione."
            },
            {
              "type": "p",
              "text": "Materiali, texture, geometrie, opere d'arte, luce, paesaggio e relazione tra interni ed esterni possono diventare parte centrale del racconto."
            },
            {
              "type": "p",
              "text": "Il linguaggio può quindi assumere, a seconda della casa, un carattere più editoriale, minimale, architettonico o atmosferico."
            }
          ]
        }
      ]
    },
    "steps": {
      "title": "Un processo più lento e personalizzato",
      "items": [
        {
          "title": "Briefing",
          "body": "Ogni progetto parte da un confronto su caratteristiche della proprietà, utilizzo delle immagini e aspetti che meritano maggiore attenzione."
        },
        {
          "title": "Luce",
          "body": "La luce diventa parte integrante del progetto. Le prime e ultime ore della giornata sono spesso particolarmente interessanti, ma il momento viene scelto in funzione della casa, dell'orientamento, del paesaggio e delle immagini che vogliamo ottenere."
        },
        {
          "title": "Styling",
          "body": "Gli allestimenti vengono costruiti in modo specifico per la proprietà, scegliendo oggetti, materiali e dettagli coerenti con il carattere della casa."
        },
        {
          "title": "Shooting",
          "body": "Una produzione richiede normalmente una giornata e può estendersi quando luce, spazi o contenuti richiedono più momenti di lavoro. Il ritmo viene adattato alla proprietà, lasciando spazio all'attesa, alla preparazione delle scene e alle condizioni migliori per ogni fotografia."
        }
      ]
    },
    "stepsExtra": null,
    "showcase": {
      "label": "Progetti fotografici per immobili di pregio",
      "title": "Una selezione di lavori realizzati",
      "intro": "Una selezione di proprietà fotografate in Sicilia, diverse tra loro ma accomunate da caratteristiche capaci di renderle riconoscibili.",
      "area": "Immobili di pregio",
      "servizio": "Fotografia"
    },
    "why": {
      "eyebrow": "Esperienza hospitality, approccio su misura",
      "statement": "L'esperienza tecnica e hospitality rimane una base importante, ma il linguaggio viene costruito ogni volta intorno alla proprietà.",
      "cards": [
        {
          "title": "Immagini pensate per più canali",
          "body": "La destinazione delle fotografie viene definita insieme al progetto: portali di prenotazione, sito della struttura, social, press kit e pubblicazioni, materiali di presentazione. La galleria può combinare immagini più informative con fotografie più atmosferiche e distintive."
        },
        {
          "title": "Dal 2010 nell'hospitality",
          "body": "La direzione fotografica è seguita da Giovanni Costagliola, con esperienza nella fotografia per strutture ricettive iniziata nel 2010. In questo tipo di produzione l'esperienza tecnica e hospitality rimane una base importante, ma il linguaggio viene costruito ogni volta intorno alla proprietà."
        }
      ]
    },
    "faq": [
      {
        "q": "Cosa rende un immobile \"di pregio\"?",
        "a": [
          "Può essere il valore architettonico, la qualità del design, una posizione particolare, una storia, un giardino, una vista, una collezione di oggetti o semplicemente un'identità molto forte.",
          "Conta soprattutto che esistano caratteristiche che meritano un livello di attenzione e interpretazione superiore a uno shooting standard."
        ]
      },
      {
        "q": "Qual è la differenza rispetto a un normale servizio per appartamento o villa?",
        "a": [
          "Soprattutto il tempo e il livello di personalizzazione.",
          "Il briefing è più approfondito, lo shooting è più lento e viene lasciato maggiore spazio alla ricerca della luce, alla preparazione delle scene e ai dettagli."
        ]
      },
      {
        "q": "Quanto dura il servizio?",
        "a": [
          "Generalmente una giornata.",
          "La produzione può estendersi quando la proprietà richiede più momenti di lavoro, condizioni di luce specifiche o una preparazione più articolata."
        ]
      },
      {
        "q": "Quante fotografie vengono consegnate?",
        "a": [
          "La quantità viene definita in base alla proprietà e agli utilizzi previsti.",
          "L'obiettivo non è raggiungere un numero prestabilito, ma costruire una galleria completa e coerente, evitando immagini ridondanti."
        ]
      },
      {
        "q": "È possibile fotografare all'alba o al tramonto?",
        "a": [
          "Sì.",
          "Le prime e le ultime ore della giornata vengono considerate quando possono valorizzare luce, atmosfera, architettura o paesaggio."
        ]
      },
      {
        "q": "Utilizzate uno stylist?",
        "a": [
          "Quando il progetto lo richiede, sì.",
          "Styling e oggetti vengono scelti in funzione della proprietà, evitando allestimenti standard o elementi incoerenti con la casa."
        ]
      },
      {
        "q": "Le fotografie possono essere utilizzate anche su Airbnb?",
        "a": [
          "Sì.",
          "Quando Airbnb fa parte della strategia, la produzione può comprendere anche tutte le immagini necessarie a costruire una galleria completa per la piattaforma.",
          "Il progetto non è però limitato alle sole logiche dell'annuncio."
        ]
      },
      {
        "q": "Possiamo utilizzare le immagini anche per sito, social e pubblicazioni?",
        "a": [
          "Sì.",
          "La produzione può essere pensata fin dall'inizio per generare una libreria utilizzabile su sito, social, press kit, pubblicazioni e altri materiali di comunicazione."
        ]
      },
      {
        "q": "È possibile integrare anche video?",
        "a": [
          "Sì.",
          "Quando il progetto lo richiede, fotografia e video possono essere progettati insieme per costruire un racconto più completo della proprietà."
        ]
      },
      {
        "q": "Il drone viene utilizzato?",
        "a": [
          "Quando aggiunge realmente qualcosa alla lettura della proprietà, sì.",
          "Può essere utile per mostrare rapporto con il paesaggio, posizione, architettura e contesto, mantenendo la stessa attenzione compositiva delle immagini realizzate da terra."
        ]
      },
      {
        "q": "Cosa succede se il meteo non è favorevole?",
        "a": [
          "Il meteo viene monitorato fino allo shooting, soprattutto quando esterni, panorama e luce naturale rappresentano elementi importanti del progetto.",
          "Se le condizioni non permettono di ottenere le immagini previste, la programmazione può essere modificata o quella parte del lavoro ripianificata."
        ]
      },
      {
        "q": "Quanto costa un servizio fotografico per immobili di pregio?",
        "a": [
          "Il costo dipende da tempo di produzione, caratteristiche della proprietà, styling, numero di momenti della giornata e utilizzi previsti.",
          "Il progetto viene definito dopo un briefing iniziale e una prima valutazione della proprietà."
        ]
      },
      {
        "q": "In quanto tempo vengono consegnate le fotografie?",
        "a": [
          "Le tempistiche vengono definite in funzione della complessità della produzione e concordate prima dello shooting."
        ]
      },
      {
        "q": "Come funzionano i diritti di utilizzo?",
        "a": [
          "Le fotografie vengono consegnate per i normali utilizzi concordati su portali, sito, social e comunicazione della proprietà.",
          "Eventuali utilizzi particolari vengono definiti prima della produzione."
        ]
      }
    ],
    "blog": {
      "category": "Host",
      "fallback": [
        {
          "title": "Fotografare una proprietà di pregio: perché il tempo cambia il risultato",
          "excerpt": "Luce, attesa, styling e lettura del luogo: cosa cambia quando lo shooting non segue un processo standard."
        },
        {
          "title": "Come costruire un linguaggio visivo per una proprietà unica",
          "excerpt": "Dall'architettura ai materiali, dal paesaggio ai dettagli: come trovare ciò che rende riconoscibile una casa."
        }
      ]
    },
    "cta": {
      "text": "Ogni progetto parte dalla proprietà, da ciò che la rende riconoscibile e da come deve essere raccontata.",
      "claimPre": "Parliamo della",
      "claimHl": "tua proprietà"
    }
  }
};

export const servizioSlugs = Object.keys(servizioPages);
