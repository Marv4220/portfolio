/* =========================================================
   IMPOSTAZIONI E TESTI DEL SITO
   Tutto ciò che non è un progetto: nome, contatti, social,
   testi della home, frasi dei contatti, piè di pagina.
   (I progetti sono in progetti.js)

   REGOLE DI SCRITTURA (le stesse di progetti.js):
   - i testi vanno tra virgolette "così"
   - ogni riga finisce con la virgola ,
   - \n dentro un testo = vai a capo
   - un testo vuoto "" nasconde quell'elemento
   - *parola*   = parte "corsivo" della scritta (vedi STILI in fondo)
   - **parola** = "seconda riga" della scritta, su una riga sua (vedi STILI in fondo)

   DUE LINGUE (inglese / italiano):
   - testo uguale in entrambe:   titolo: "Digital Maquettes",
   - testo tradotto:             titolo: { en: "Hello", it: "Ciao" },
   Se una delle due manca, viene mostrata l'altra.
   Il sito parte in inglese; il visitatore cambia con EN / IT in alto a destra.
   ========================================================= */

const SITO = {

  /* ----- Chi sei ----- */
  nome: "Manuel Piscioneri",                 // logo in alto, piè di pagina, titolo della scheda del browser
  ruolo: "3D Artist",                   // compare nel titolo della scheda del browser
  descrizione: {                        // il testo che mostra Google
    en: "Product visualization, ArchViz, Modeling.",
    it: "Product visualization, ArchViz, Modellazione.",
  },

  /* ----- Contatti ----- */
  email: "manuel.piscioneri@proton.me",
  telefono: "",         // "" per nasconderlo
  partitaIva: "",            // "" per nasconderla

  /* ----- Social -----
     Aggiungi, togli o riordina le righe. Un link vuoto "" nasconde quella voce. */
  social: [
    { nome: "Instagram", link: "https://www.instagram.com/_mp.3d/" },
    { nome: "Behance",   link: "https://www.behance.net/manuelpiscioneri" },
    { nome: "LinkedIn",  link: "https://www.linkedin.com/in/manuelpiscioneri/" },
  ],

  /* ----- Reel di sfondo della home -----
     Riempie tutto lo schermo dietro ai titoli. Meglio un MP4 nel sito:
     clip di 20-30 s, senza audio, 1080p, circa 5000 Kb/s.
     Va bene anche un link Vimeo; YouTube funziona ma può mostrare
     per un attimo il logo e i pulsanti.
     Attenzione: maiuscole e minuscole devono corrispondere al nome del file. */
  showreel: {
    media: "video/showreel.mp4",
    poster: "",                         // fotogramma JPG mostrato mentre il video carica (facoltativo)
  },

  /* ----- Home ----- */
  home: {
    etichetta: {
      en: "A 3D World — since 2017",
      it: "Un mondo 3D — dal 2017",
    },
    titolo: {
      en: "Make *everything,*\n**from nothing.**",
      it: "Creare *il mondo,*\n**dal nulla.**",
    },
    sottotitolo: {
      en: "ArchViz, Product Visualization, 3D modeling\nand much more...",
      it: "ArchViz, Product Visualization, 3D modeling\ne molto altro...",
    },

    chiSono: {
      en: "I’m a 3D Artist with over 8 years of experience in CGI production, photorealistic visualization, and Real-Time environments.\n\nMy work blends aesthetic sensibility, 3D modeling, and technical problem-solving to bring high-impact visuals and virtual spaces to life. Over the years, I’ve built and led entire 3D production pipelines all the way to developing interactive applications and Real-Time solutions.\n\nMy background in architecture gives me a sharp eye for light, proportions, and detail, while my core focus remains turning complex ideas into engaging, cutting-edge visual experiences.",
      it: "Sono un 3D Artist con oltre 8 anni di esperienza nella produzione CGI, nella visualizzazione fotorealistica e nello sviluppo di ambienti Real-Time.\n\nIl mio lavoro unisce senso estetico, modellazione 3D e problem solving tecnico per dare vita a immagini e spazi virtuali ad alto impatto. Negli anni ho strutturato e coordinato interi flussi di produzione 3D fino ad arrivare allo sviluppo di applicazioni interattive e soluzioni Real-Time.\n\nLa mia formazione da architetto mi dà un occhio particolare per la luce, le proporzioni e i dettagli, ma il mio vero focus è trasformare idee complesse in esperienze visive coinvolgenti e tecnologicamente avanzate.",
    },
    chiSonoBottone: { en: "Let's work together", it: "Lavoriamo insieme" },

    serviziTitolo: { en: "What I can do *for you*", it: "Cosa posso fare *per te*" },
    lavoriTitolo:  { en: "*Recent* projects",       it: "Progetti *recenti*" },

    citazione: {                        // "" per togliere la sezione
      en: "",
      it: "",
    },
    citazioneAutore: {
      en: "",
      it: "",
    },
  },

  /* ----- Pagina Lavori ----- */
  lavori: {
    titolo: { en: "All projects", it: "Tutti i progetti" },
  },

  /* ----- Fascia contatti in fondo a ogni pagina -----
     La frase grande che invita a scriverti, diversa per ogni pagina. */
  cta: {
    home: {
      en: "Got a project *in mind?*\n**Let's show it.**",
      it: "Hai un progetto *in mente?*\n**Facciamolo vedere.**",
    },
    lavori: {
      en: "Is the next project\n**yours?**",
      it: "Il prossimo progetto\n**è il tuo?**",
    },
    progetto: {
      en: "Want something\n**similar?**",
      it: "Vuoi qualcosa\n**di simile?**",
    },
  },

  /* ----- Piè di pagina ----- */
  footer: {
    titolo: { en: "Available for new projects", it: "Disponibile per nuovi progetti" },
    testo: {
      en: "I reply within 24 hours.\nIn Italy and remotely.",
      it: "Rispondo entro 24 ore.\nIn Italia e da remoto.",
    },
  },

  /* ----- STILI: font, colore e peso di ogni scritta -----
     Ogni riga è una scritta del sito. Per ognuna puoi scrivere:
       font:      nome di un font di Google Fonts, es. "Poppins", "Archivo", "Inter",
                  "Playfair Display" (scritto come su fonts.google.com).
                  Il sito lo carica da solo.
       peso:      100 sottile … 400 normale … 700 grassetto … 900 nerissimo
                  (non tutti i font hanno tutti i pesi)
       colore:    un colore della palette: "bianco", "grigio", "rosso", "verde", "nero"
                  oppure un codice come "#FF5A4E"
       corsivo:   true / false
       maiuscolo: true / false
       larghezza: solo per i font che la permettono (es. Archivo):
                  75 stretto … 100 normale … 125 largo
     Quello che non scrivi resta com'è. Togli una riga intera per lasciare lo stile di base.

     Le righe "…Corsivo" e "…Riga2" sono le parti scritte tra *asterischi*
     e tra **doppi asterischi** nei testi qui sopra. */
  stili: {
    testo:          { font: "Poppins", peso: 400, colore: "bianco" },   // tutto il resto del sito
    logo:           { font: "Archivo", peso: 500, colore: "bianco", larghezza: 125, maiuscolo: true },
    menu:           { font: "Poppins", peso: 400, colore: "bianco" },
    etichette:      { font: "Poppins", peso: 500, colore: "grigio", maiuscolo: true },   // le scritte piccole sopra i titoli

    // Hero (prima schermata): "Creare" / "il mondo," / "DAL NULLA." / "ArchViz, Product Visualization..."
    heroTitolo:        { font: "Poppins", peso: 200, colore: "bianco" },
    heroTitoloCorsivo: { font: "Poppins", peso: 700, corsivo: true },
    heroTitoloRiga2:   { font: "Archivo", peso: 900, colore: "rosso", larghezza: 125, maiuscolo: true },
    heroSottotitolo:   { font: "Poppins", peso: 400, colore: "grigio" },

    // Titoli delle sezioni: "Cosa posso fare per te", "Progetti recenti"
    // (i testi sono sopra, in home → serviziTitolo e lavoriTitolo)
    titoliSezione:       { font: "Poppins", peso: 200, colore: "bianco" },
    titoliSezioneCorsivo: { font: "Poppins", peso: 700, corsivo: true },
    titoliSezioneRiga2:   { font: "Archivo", peso: 900, colore: "rosso", larghezza: 125, maiuscolo: true },

    // Servizi: i nomi delle categorie ("ARCHVIZ"...) e la frase accanto
    categorie:      { font: "Archivo", peso: 500, colore: "bianco", larghezza: 125, maiuscolo: true },
    categorieFrase: { font: "Poppins", peso: 400, colore: "bianco" },

    // Card dei progetti
    cardTitolo:     { font: "Poppins", peso: 600, colore: "bianco" },
    cardFrase:      { font: "Poppins", peso: 400, colore: "grigio" },
    cardCategoria:  { font: "Poppins", peso: 400, colore: "verde" },

    // Chi sono
    chiSono:        { font: "Poppins", peso: 200, colore: "bianco" },

    // Fascia contatti in fondo: "Hai un progetto in mente?" / "FACCIAMOLO VEDERE." / l'email
    contattiFrase:        { font: "Poppins", peso: 200, colore: "bianco" },
    contattiFraseCorsivo: { font: "Poppins", peso: 700, corsivo: true },
    contattiFraseRiga2:   { font: "Archivo", peso: 900, colore: "rosso", larghezza: 125, maiuscolo: true },
    contattiEmail:        { font: "Poppins", peso: 300, colore: "bianco", corsivo: true },

    // Pagina progetto
    progettoTitolo:     { font: "Poppins", peso: 400, colore: "bianco" },
    progettoTesto:      { font: "Poppins", peso: 400, colore: "bianco" },
    progettoSuccessivo: { font: "Archivo", peso: 900, colore: "bianco", larghezza: 125, maiuscolo: true },

    // Piè di pagina
    footerTesto:    { font: "Poppins", peso: 400, colore: "bianco" },
    footerNome:     { font: "Archivo", peso: 900, colore: "rosso", larghezza: 125, maiuscolo: true },
  },

};
