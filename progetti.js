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
    copertina: "img/progetti/Product/adidas/adidas4.webp",
    media: [
      ["img/progetti/Product/adidas/adidas2.webp", "img/progetti/Product/adidas/adidas1.webp"],
      "img/progetti/Product/adidas/adidas3.webp",
      "img/progetti/Product/adidas/adidas5.webp",
    ],
  },

  {
    id: "dw",
    titolo: { en: "DW", it: "DW" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2020",
    inEvidenza: true,
    copertina: "img/progetti/Product/dw/dw1.webp",
    media: [
      ["img/progetti/Product/dw/dw2.webp","img/progetti/Product/dw/dw3.webp"],
      "img/progetti/Product/dw/dw4.webp",
    ],
  },

  {
    id: "jh",
    titolo: { en: "Iron Cross", it: "Iron Cross" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2021",
    inEvidenza: true,
    copertina: "img/progetti/Product/jhguitar/jhguitar1.webp",
    media: [
      ["img/progetti/Product/jhguitar/jhguitar2.webp","img/progetti/Product/jhguitar/jhguitar4.webp"],
      "img/progetti/Product/jhguitar/jhguitar3.webp",
      ["img/progetti/Product/jhguitar/jhguitar5.webp","img/progetti/Product/jhguitar/jhguitar6.webp"],
    ],
  },

  {
    id: "marshall",
    titolo: { en: "Marshall JCM 800", it: "Marshall JCM 800" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2021",
    inEvidenza: true,
    copertina: "img/progetti/Product/marshall/marshall1.webp",
    media: [
      ["img/progetti/Product/marshall/marshall3.webp","img/progetti/Product/marshall/marshall4.webp"],
      "img/progetti/Product/marshall/marshall2.webp",
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
    copertina: "img/progetti/Product/chees/chees1.webp",
    media: [
      ["img/progetti/Product/chees/chees5.webp","img/progetti/Product/chees/chees4.webp"],
      "img/progetti/Product/chees/chees3.webp",
      ["img/progetti/Product/chees/chees2.webp","img/progetti/Product/chees/chees1.webp"],
      ["img/progetti/Product/chees/chees6.webp","img/progetti/Product/chees/chees7.webp"],
    ],
  },

  {
    id: "beat",
    titolo: { en: "Dr. Beat", it: "Dr. Beat" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2021",
    inEvidenza: true,
    copertina: "img/progetti/Product/dr.beat/dr.beat1.webp",
    media: [
      "img/progetti/Product/dr.beat/dr.beat5.webp",
      ["img/progetti/Product/dr.beat/dr.beat1.webp","img/progetti/Product/dr.beat/dr.beat2.webp"],
      ["img/progetti/Product/dr.beat/dr.beat3.webp","img/progetti/Product/dr.beat/dr.beat4.webp"],
      ["img/progetti/Product/dr.beat/dr.beat6.webp","img/progetti/Product/dr.beat/dr.beat7.webp"],
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
    copertina: "img/progetti/Product/biscuits/biscuits2.webp",
    media: [
      ["img/progetti/Product/biscuits/biscuits1.webp","img/progetti/Product/biscuits/biscuits2.webp"],
      "img/progetti/Product/biscuits/biscuits3.webp",
    ],
  },

  {
    id: "cushion",
    titolo: { en: "Cushion", it: "Cushion" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2024",
    inEvidenza: false,
    copertina: "img/progetti/Product/cushion/cushion1.webp",
    media: [
      ["img/progetti/Product/cushion/cushion1.webp","img/progetti/Product/cushion/cushion2.webp"],
      "img/progetti/Product/cushion/cushion3.webp",
    ],
  },

  {
    id: "montgomery",
    titolo: { en: "Sofa", it: "Sofa" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2024",
    inEvidenza: false,
    copertina: "img/progetti/Product/montgomery/montgomery1.webp",
    media: [
      ["img/progetti/Product/montgomery/montgomery1.webp","img/progetti/Product/montgomery/montgomery2.webp"],
      "img/progetti/Product/montgomery/montgomery3.webp",
    ],
  },

  {
    id: "sedia",
    titolo: { en: "Bamboo", it: "Bamboo" },
    categoria: "Product Visualization",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2020",
    inEvidenza: false,
    copertina: "img/progetti/Product/sediabamboo/sediabamboo1.webp",
    media: [
      ["img/progetti/Product/sediabamboo/sediabamboo1.webp","img/progetti/Product/sediabamboo/sediabamboo2.webp"],
      "img/progetti/Product/sediabamboo/sediabamboo3.webp",
      "img/progetti/Product/sediabamboo/sediabamboo4.webp",
    ],
  },

  {
    id: "torino",
    titolo: { en: "Turin", it: "Torino" },
    categoria: "ArchViz",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "3ds Max",
    anno: "2025",
    inEvidenza: true,
    copertina: "img/progetti/ArchViz/torino/torino3.webp",
    media: [
      ["img/progetti/ArchViz/torino/torino1.webp","img/progetti/ArchViz/torino/torino2.webp"],
      "img/progetti/ArchViz/torino/torino3.webp",
    ],
  },

  {
    id: "lugano",
    titolo: { en: "Lugano", it: "Lugano" },
    categoria: "ArchViz",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "3ds Max",
    anno: "2025",
    inEvidenza: true,
    copertina: "img/progetti/ArchViz/lugano/lugano3.webp",
    media: [
      ["img/progetti/ArchViz/lugano/lugano1.webp","img/progetti/ArchViz/lugano/lugano2.webp"],
      "img/progetti/ArchViz/lugano/lugano3.webp",
    ],
  },

  {
    id: "inter",
    titolo: { en: "Inter", it: "Inter" },
    categoria: "ArchViz",
    frase: { en: "", it: "" },
    testo: "",
    cliente: { en: "", it: "" },
    software: "Blender",
    anno: "2026",
    inEvidenza: true,
    copertina: "img/progetti/ArchViz/inter/inter3.webp",
    media: [
      ["img/progetti/ArchViz/inter/inter1.webp","img/progetti/ArchViz/inter/inter2.webp"],
      "img/progetti/ArchViz/inter/inter3.webp",
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
    copertina: "img/progetti/Modeling/buildings/buildings6.webp",   // immagine o video .mp4 per l'anteprima
    media: [
      "img/progetti/Modeling/buildings/buildings1.webp",                          // una immagine a tutta larghezza
      ["img/progetti/Modeling/buildings/buildings2.webp", "img/progetti/Modeling/buildings/buildings3.webp"],   // due affiancate: tra parentesi quadre
      ["img/progetti/Modeling/buildings/buildings4.webp", "img/progetti/Modeling/buildings/buildings5.webp"],
      "img/progetti/Modeling/buildings/buildings6.webp",
      // "https://www.youtube.com/watch?v=CODICE",           // un video YouTube
    ],
  },

  
];
