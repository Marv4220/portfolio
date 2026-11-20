/* =========================================================
   CONTENUTI DEL SITO
   Qui si aggiungono, tolgono e riordinano i progetti.
   Nome, contatti, social, testi della home e showreel
   sono invece in sito.js.

   REGOLE DI SCRITTURA (importanti):
   - i testi vanno tra virgolette "così"
   - ogni riga di un elenco finisce con la virgola ,
   - se un testo contiene le virgolette, usa gli apici inversi `così`

   DUE LINGUE (inglese / italiano):
   - testo uguale in entrambe:   titolo: "Digital Maquettes",
   - testo tradotto:             frase: { en: "Morning light", it: "Luce del mattino" },
   Se una delle due manca, viene mostrata l'altra.

   TIPI DI MEDIA: scrivi solo l'indirizzo, il sito capisce da solo cos'è.
   - immagine:      "img/progetti/nome/vista-01.jpg"
   - video nel sito: "video/nome.mp4"     (clip breve, senza audio, in loop)
   - YouTube:       "https://www.youtube.com/watch?v=CODICE"
   - Vimeo:         "https://vimeo.com/123456789"
   ========================================================= */


/* ----- Categorie (branche di lavoro) -----
   L'ordine qui è l'ordine dei filtri e delle righe "Servizi" in home.
   Il "nome" è il codice da scrivere identico nel campo categoria dei progetti;
   "etichetta" è come appare sul sito nelle due lingue. */
const CATEGORIE = [
  {
    nome: "ArchViz",
    etichetta: "ArchViz",
    frase: { en: "Construction hasn't started yet. The render has.", it: "Il cantiere non è ancora aperto. Il render sì." },
  },
  {
    nome: "Product Visualization",
    etichetta: { en: "Product Visualization", it: "Product Visualization" },
    frase: { en: "No photo shoot, no limits.", it: "Nessun set fotografico, nessun limite." },
  },
  {
    nome: "Modeling",
    etichetta: { en: "Modeling", it: "Modellazione" },
    frase: { en: "Every detail, built to last.", it: "Ogni dettaglio, costruito per durare." },
  },
];


/* ----- Progetti -----
   L'ORDINE in questo elenco è l'ordine sul sito: il primo è il più in alto.
   Per aggiungere un progetto copia un blocco { ... }, dalla graffa aperta
   alla graffa chiusa con la virgola, e cambia i valori.
   I campi lasciati vuoti "" non vengono mostrati. */
const PROGETTI = [

  {
    id: "adidas",
    titolo: { en: "Adidas Hoops", it: "Adidas Hoops" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender, Substance Painter",
    anno: "2026",
    inEvidenza: true,
    copertina: "img/progetti/Adidas/Adidas_01.webp",
    media: [
      ["img/progetti/Adidas/Adidas_02.webp", "img/progetti/Adidas/Adidas_03.webp"],
      "img/progetti/Adidas/Adidas_04.webp",
      "img/progetti/Adidas/Adidas_05.webp",
    ],
  },

  {
    id: "chees",
    titolo: { en: "Chees", it: "Chees" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2022",
    inEvidenza: true,
    copertina: "img/progetti/Chees/Chees_04.webp",
    media: [
      ["img/progetti/Chees/Chees_01.webp","img/progetti/Chees/Chees_02.webp"],
      "img/progetti/Chees/Chees_03.webp",
      ["img/progetti/Chees/Chees_05.webp","img/progetti/Chees/Chees_04.webp"],
      ["img/progetti/Chees/Chees_06.webp","img/progetti/Chees/Chees_07.webp"],
    ],
  },

  {
    id: "biscuits",
    titolo: { en: "Biscuits", it: "Biscuits" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2026",
    inEvidenza: true,
    copertina: "img/progetti/Biscuits/Biscuits_02.webp",
    media: [
      ["img/progetti/Biscuits/Biscuits_01.webp","img/progetti/Biscuits/Biscuits_02.webp"],
      "img/progetti/Biscuits/Biscuits_03.webp",
    ],
  },

  {
    id: "digital-maquettes",               // nome nell'indirizzo della pagina: minuscole, trattini, niente spazi
    titolo: "Digital Maquettes | Architectural Modeling & Geometry",
    categoria: "Modeling",                  // ArchViz | Product | Modeling
    frase: "",
    testo: "",
    cliente: "",
    software: "Blender",
    anno: "2024/2026",
    inEvidenza: true,                      // true = compare anche in home
    copertina: "img/progetti/Building_06.webp",   // immagine o video .mp4 per l'anteprima
    media: [
      "img/progetti/Building_01.webp",                          // una immagine a tutta larghezza
      ["img/progetti/Building_02.webp", "img/progetti/Building_03.webp"],   // due affiancate: tra parentesi quadre
      ["img/progetti/Building_04.webp", "img/progetti/Building_05.webp"],
      "img/progetti/Building_06.webp",
      // "https://www.youtube.com/watch?v=CODICE",           // un video YouTube
    ],
  },

  
];
