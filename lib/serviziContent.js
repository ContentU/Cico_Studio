// Testi delle pagine di servizio (Hotel/Host/B&B). Struttura pensata per
// essere riusata identica sulle 3 pagine, cambiando solo i contenuti: ogni
// pagina (app/hotel/page.js e le prossime app/host/page.js, app/bb/page.js)
// importa il proprio oggetto e lo passa agli stessi componenti in
// components/service/.
//
// Testi di hotelPage presi dal documento del cliente "Fotografia per hotel
// CICO.docx" (verificato punto per punto con il cliente). I 4 step della
// sezione "Un servizio costruito intorno alla struttura" sono segnalati dal
// cliente come da accorciare in revisione — vedi commento sotto.

export const hotelPage = {
  hero: {
    h1: "Fotografia per hotel in Sicilia",
    subtitle:
      "Immagini pensate per valorizzare gli spazi, raccontare le esperienze e funzionare sui diversi canali del tuo hotel.",
  },
  intro: [
    "CICO progetta e produce servizi fotografici per boutique hotel, resort, masserie, dimore storiche e strutture indipendenti in tutta la Sicilia.",
    "Dalle immagini per OTA e portali di prenotazione alla fotografia di brand per sito e comunicazione, ogni shooting viene costruito partendo dalla struttura, dalla sua identità e dalla destinazione finale delle immagini.",
  ],
  eyebrow: "Parliamo della tua struttura",
  sectionTitle: "Fotografie diverse per obiettivi diversi",
  sectionIntro:
    "Le immagini per OTA e quelle per il brand hanno obiettivi diversi. Per questo ogni servizio viene progettato in base a ciò che deve comunicare e al canale in cui verrà utilizzato.",
  accordionObiettivi: [
    {
      title: "Fotografia per OTA e portali di prenotazione",
      blocks: [
        {
          type: "p",
          text: "Sulle OTA ogni struttura compete visivamente con molte alternative. Le immagini devono quindi attirare lo sguardo, trasmettere fiducia e rendere immediatamente leggibili spazi, servizi e caratteristiche distintive.",
        },
        {
          type: "p",
          text: "Camere, suite, bagni, aree comuni, terrazze, piscine, spa e altri ambienti vengono fotografati con un approccio vicino alla fotografia di interior e architettura, lavorando su luce, composizione e prospettiva per valorizzarli senza alterarne la percezione.",
        },
        { type: "p", text: "L'obiettivo è costruire una galleria:" },
        {
          type: "ul",
          items: [
            "immediata e leggibile",
            "professionale e coerente",
            "riconoscibile rispetto alla concorrenza",
            "realistica nelle proporzioni",
            "capace di aumentare la percezione del valore della struttura",
          ],
        },
        {
          type: "p",
          text: "All'interno dello stesso shooting possono nascere anche immagini di architettura più ricercate e di forte impatto, utili non soltanto sulle OTA ma anche sul sito e negli altri materiali di comunicazione.",
        },
      ],
    },
    {
      title: "Fotografia di brand per hotel",
      blocks: [
        {
          type: "p",
          text: "La fotografia di brand parte da una domanda diversa: cosa rende questa struttura riconoscibile e desiderabile? Gli spazi rimangono importanti, ma diventano parte di un racconto più ampio.",
        },
        {
          type: "p",
          text: "La produzione può raccontare architettura, territorio, persone, accoglienza, ristorazione, staff, dettagli, storia ed esperienze offerte agli ospiti. Può comprendere:",
        },
        {
          type: "ul",
          items: [
            "immagini di architettura e interior più editoriali",
            "scene lifestyle con modelli",
            "staff e momenti di servizio",
            "ristorazione",
            "territorio e paesaggio",
            "dettagli capaci di raccontare il carattere del luogo",
          ],
        },
        {
          type: "p",
          text: "Styling, luce, scelta dei momenti della giornata e direzione delle scene vengono utilizzati per creare immagini coerenti con l'identità reale dell'hotel.",
        },
        {
          type: "p",
          text: "Il risultato è una libreria fotografica capace di comunicare non soltanto come è fatta la struttura, ma anche che tipo di esperienza e atmosfera propone.",
        },
      ],
    },
  ],
  steps: {
    title: "Un servizio costruito intorno alla struttura",
    // NOTA: testi da accorciare in revisione (segnalato dal cliente nel
    // documento originale) — al momento riportati per intero.
    items: [
      {
        title: "Brief e piano di shooting",
        body: "Ogni progetto parte da un confronto sugli obiettivi, sugli ambienti da raccontare e sui canali a cui saranno destinate le immagini. Da qui viene costruito il piano di shooting, tenendo conto di luce, orientamento, disponibilità degli spazi e operatività dell'hotel.",
      },
      {
        title: "Preparazione e styling",
        body: "La preparazione degli ambienti è parte integrante del lavoro. Negli shooting più semplici può essere gestita insieme allo staff; nelle produzioni di brand più complete, styling e set design vengono curati dal team CICO. Ogni allestimento viene costruito in funzione dell'immagine e del punto di ripresa.",
      },
      {
        title: "Produzione",
        body: "Lo shooting viene organizzato seguendo luce, disponibilità degli ambienti e operatività della struttura. Quando necessario, la produzione può essere distribuita su più fasce orarie o più giornate per lavorare nelle condizioni migliori e raccontare momenti specifici.",
      },
      {
        title: "Postproduzione e consegna",
        body: "La galleria viene consegnata già selezionata, postprodotta e adattata ai formati e agli utilizzi previsti per i diversi canali. La consegna fotografica avviene normalmente entro circa 7 giorni dallo shooting.",
        link: { label: "Approfondisci come lavoriamo", href: "#" },
      },
    ],
  },
  showcase: {
    label: "Progetti fotografici per hotel",
    title: "Una selezione di lavori realizzati",
    intro: "Boutique hotel, dimore e strutture indipendenti in Sicilia.",
    macroarea: "Hotel",
    servizio: "Fotografia",
    ctaHref: "/portfolio",
    ctaLabel: "Scopri tutti i progetti",
  },
  why: {
    label: "Esperienza specifica nell'hospitality",
    intro:
      "Fotografare un hotel richiede più della competenza fotografica: significa conoscere le logiche dell'ospitalità, i diversi canali di comunicazione e il modo in cui un ospite percepisce e sceglie una struttura.",
    items: [
      {
        title: "Dal 2010 nel settore hospitality",
        body: "CICO nasce da un'esperienza nella fotografia per strutture ricettive iniziata nel 2010, con lavori realizzati in tutta la Sicilia, incluse le isole minori.",
      },
      {
        title: "Esperienza diretta con Airbnb e OTA",
        body: "La direzione fotografica è guidata dal fondatore Giovanni Costagliola, fotografo ufficiale Airbnb, relatore in webinar per la piattaforma e docente in corsi dedicati a host e property manager. Giovanni ha inoltre scritto Picture Perfect Properties, un manuale dedicato alla fotografia per strutture ricettive, pubblicato per una scuola internazionale di fotografia online.",
      },
      {
        title: "Un team, non solo un fotografo",
        body: "In funzione del progetto, CICO coinvolge photo editor, set designer e altri professionisti del team nelle diverse fasi della produzione.",
      },
    ],
  },
  faq: [
    {
      q: "Quante fotografie vengono consegnate?",
      a: "Non esiste un numero fisso valido per ogni struttura. La quantità dipende dagli ambienti, dai servizi presenti e dall'utilizzo finale delle immagini. L'obiettivo è consegnare una galleria completa, evitando variazioni inutilmente ridondanti.",
    },
    {
      q: "Quanto dura un servizio fotografico per hotel?",
      a: "Dipende dal tipo di produzione. Un servizio destinato principalmente alle OTA può normalmente essere realizzato in una giornata, salvo strutture particolarmente grandi o esigenze specifiche di luce e operatività. Un servizio fotografico di brand richiede invece spesso due o tre giorni, soprattutto quando vengono coinvolti modelli, staff, ristorazione, esperienze o momenti particolari della giornata.",
    },
    {
      q: "Quanto costa un servizio fotografico per hotel?",
      a: "Il costo dipende dalla struttura e dalla complessità della produzione. Un servizio OTA ha esigenze diverse da una produzione di brand con più giornate, styling, set design, modelli e scene dedicate. Per questo ogni progetto viene valutato dopo un primo confronto sugli obiettivi. La fotografia va comunque considerata come un investimento destinato a durare nel tempo: un hotel può investire molto in architettura, arredi, materiali e servizi, ma se questi elementi vengono comunicati con immagini deboli, una parte del loro valore viene persa prima ancora che l'ospite arrivi.",
    },
    {
      q: "L'hotel deve essere chiuso durante lo shooting?",
      a: "No. Lavorare senza ospiti rappresenta la situazione ideale, ma non è sempre possibile né necessario. Lo shooting può essere organizzato coordinandosi con reception, housekeeping e staff per lavorare negli spazi disponibili interferendo il meno possibile con l'esperienza degli ospiti.",
    },
    {
      q: "CICO può occuparsi della preparazione e dello styling?",
      a: "Sì. Nei servizi più semplici la preparazione può essere gestita insieme allo staff interno; nelle produzioni di brand più complete, il team CICO comprende anche la figura del set designer. L'allestimento viene costruito in funzione delle singole immagini e del racconto.",
    },
    {
      q: "Cosa succede se il meteo non è favorevole?",
      a: "Il meteo viene monitorato fino al giorno dello shooting. Quando le condizioni non permettono di rappresentare correttamente gli esterni, è preferibile modificare la scaletta o riprogrammare quella parte del lavoro.",
    },
    {
      q: "Il drone è compreso nel servizio?",
      a: "Quando le condizioni di volo lo consentono, il drone viene considerato uno strumento fotografico come gli altri. Viene utilizzato quando può valorizzare realmente posizione, architettura, panorama o relazione con il territorio.",
    },
    {
      q: "Le fotografie vengono realizzate anche in formato verticale?",
      a: "Sì. Per le OTA prevalgono normalmente immagini orizzontali; per sito e altri utilizzi possono essere previste anche composizioni verticali e formati specifici. Nel caso di un nuovo sito è utile coordinarsi preventivamente con il web designer.",
    },
    {
      q: "In quanto tempo vengono consegnate le fotografie?",
      a: "Normalmente entro circa 7 giorni dallo shooting. Il lavoro con un team di photo editor permette di mantenere costanti qualità e tempi di consegna anche nei periodi di maggiore produzione.",
    },
    {
      q: "Come funzionano i diritti di utilizzo?",
      a: "Le fotografie vengono attualmente consegnate senza costi aggiuntivi per i normali utilizzi concordati su sito, OTA, social e comunicazione dell'hotel. Eventuali esigenze particolari vengono definite prima della produzione.",
    },
  ],
  blogCategory: "Hotel",
  cta: {
    text: "Se stai aprendo un nuovo hotel, aggiornando immagini non più rappresentative o costruendo una nuova identità fotografica, partiamo dalla struttura e dall'utilizzo reale che dovrai fare delle immagini.",
  },
};
