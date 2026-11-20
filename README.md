# Portfolio — guida rapida

## Struttura

```
portfolio/
├── index.html          ← home: frase d'apertura, chi sono, servizi, lavori in evidenza, contatti
├── lavori.html         ← tutti i lavori, con filtri per categoria e vista griglia / elenco
├── progetto.html       ← pagina unica che mostra qualsiasi progetto (non va duplicata)
├── sito.js             ← ★ IMPOSTAZIONI: nome, email, social, testi della home, frasi dei contatti, showreel
├── progetti.js         ← ★ PROGETTI: progetti e categorie
├── css/style.css       ← tutto l'aspetto grafico (colori, font, spazi)
├── js/main.js          ← costruisce le pagine da progetti.js (di norma non si tocca)
├── img/progetti/       ← qui vanno i tuoi render (una sottocartella per progetto)
├── video/              ← clip MP4 brevi (da creare quando servono)
└── .nojekyll           ← file vuoto: dice a GitHub di pubblicare i file così come sono
```

## 1. Vedere il sito sul tuo computer

1. Apri la cartella `portfolio` in VS Code (File → Apri cartella).
2. Installa l'estensione **Live Server** (icona Estensioni a sinistra, cerca "Live Server" di Ritwick Dey).
3. Clic destro su `index.html` → **Open with Live Server**. Si apre il browser, e a ogni salvataggio la pagina si aggiorna da sola.

## 2. Pubblicare su GitHub Pages (la prima volta)

1. Installa **GitHub Desktop** (desktop.github.com) e accedi con il tuo account.
2. File → **Add local repository** → scegli la cartella `portfolio`. Se ti propone di "creare un repository", accetta.
3. Scegli il nome del repository:
   - `tuonomeutente.github.io` → il sito sarà `https://tuonomeutente.github.io`
   - qualsiasi altro nome (es. `portfolio`) → il sito sarà `https://tuonomeutente.github.io/portfolio`
4. Clic su **Publish repository**, e **togli la spunta** a "Keep this code private" (con l'account gratuito il repository dev'essere pubblico).
5. Sul sito di GitHub apri il repository → **Settings** → **Pages**:
   - Source: *Deploy from a branch*
   - Branch: `main`, cartella `/ (root)` → **Save**
6. Dopo 1–2 minuti il sito è online all'indirizzo che compare in quella pagina.

## 3. Aggiornare il sito

Modifica i file, poi in GitHub Desktop scrivi una breve descrizione → **Commit to main** → **Push origin**. Il sito si aggiorna in circa un minuto.

## Cambiare nome, contatti e testi

Tutto in **`sito.js`**: nome, ruolo, email, telefono, partita IVA, social, video di sfondo della home, testi della home, frasi della fascia contatti e del piè di pagina. Un testo vuoto `""` nasconde l'elemento; `
` dentro un testo va a capo.

## Due lingue (EN / IT)

Il sito parte in **inglese**; il visitatore cambia lingua con **EN / IT** in alto a destra (la scelta viene ricordata). Nei file `sito.js` e `progetti.js` ogni testo si scrive così:

- uguale nelle due lingue: `titolo: "Digital Maquettes",`
- tradotto: `frase: { en: "Morning light", it: "Luce del mattino" },`

Se manca una traduzione viene mostrata l'altra lingua. Un link diretto a una lingua: aggiungi `?lang=it` all'indirizzo (es. `index.html?lang=it`).

## Aggiungere un progetto

Si fa tutto in **`progetti.js`**: nessuna pagina HTML da copiare.

1. Crea una cartella per il progetto, es. `img/progetti/soggiorno-milano/`, e mettici i render.
2. In `progetti.js` copia un blocco `{ ... },` e cambia i valori:
   - `id`: nome nell'indirizzo, minuscole e trattini (es. `soggiorno-milano`). Dev'essere unico.
   - `categoria`: `ArchViz`, `Prodotto` o `Modellazione` (scritta identica).
   - `inEvidenza: true` per mostrarlo anche in home.
   - `copertina`: l'immagine (o clip `.mp4`) dell'anteprima.
   - `media`: l'elenco di immagini e video della pagina, nell'ordine in cui appaiono. Due elementi tra `[ ]` vengono affiancati.
3. **L'ordine dei blocchi è l'ordine sul sito.** Per spostare un progetto, sposta il suo blocco.
4. Salva: Live Server aggiorna la pagina. Se la pagina resta vuota, quasi sempre manca una virgola o una virgoletta.

Per aggiungere o rinominare una categoria, modifica l'elenco `CATEGORIE` nello stesso file.

## Immagini e video

- **Immagini**: JPG o WebP, lato lungo circa **2000 px**, sotto i 500 KB. Nomi senza spazi né accenti.
- **Clip nel sito (MP4)**: per loop brevi e muti (showreel, turntable). H.264, 1080p, senza audio, possibilmente sotto i 10 MB. Partono da sole, senza pulsanti.
- **YouTube / Vimeo**: per animazioni lunghe o con audio. Incolla il link normale della pagina del video, il sito lo trasforma da solo nel lettore.
- I video YouTube/Vimeo si vedono con Live Server o sul sito pubblicato; aprendo il file direttamente con doppio clic possono non caricarsi.

## Limiti da ricordare

- Sito pubblicato massimo 1 GB, banda circa 100 GB al mese; ogni file sotto i 100 MB.
